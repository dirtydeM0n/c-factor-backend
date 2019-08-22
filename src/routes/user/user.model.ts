import * as bcrypt from 'bcrypt';
const Sequelize = require('sequelize');
import * as util from 'util';
import { Database } from '../../db';
import { createJWToken } from '../middleware/jwt';

const User = Database.define('user', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    firstname: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    lastname: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    phone: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
            len: {
                args: [6, 128],
                msg: 'Email address must be between 6 and 128 characters in length'
            },
            isEmail: {
                msg: 'Email address must be valid'
            }
        }
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [6, 100]
        }
    },
    country: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    address: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    dob: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: ''
    },
    bio: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    role: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['admin', 'candidate', 'client'],
        defaultValue: 'candidate',
        validate: {
            isIn: {
                args: [['admin', 'candidate', 'client']],
                msg: 'Invalid status.'
            }
        }
    },
    status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['pending', 'accepted'],
        defaultValue: 'pending',
        validate: {
            isIn: {
                args: [['pending', 'accepted']],
                msg: 'Invalid status.'
            }
        }
    },
    resetToken: {
        type: Sequelize.STRING
    },
    resetTokenSentAt: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    },
    resetTokenExpireAt: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    },
    activationToken: {
        type: Sequelize.STRING
    },
    activationTokenExpireAt: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    }
}, {
        indexes: [{ unique: true, fields: ['email'] }],
        timestamps: true,
        freezeTableName: true,
        tableName: 'users'
    });

User.beforeSave((user, options) => {
    if (user.changed('password')) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
});

User.prototype.generateToken = function generateToken() {
    console.log('JWT:' + process.env.JWT_SECRET);
    return createJWToken({ email: this.email, id: this.id });
};

User.prototype.authenticate = function authenticate(candidatePassword: string) {
    if (bcrypt.compareSync(candidatePassword, this.password)) {
        return this;
    } else {
        return false;
    }
};

User.prototype.comparePassword = function (candidatePassword: string) {
    const qCompare = (util as any).promisify(bcrypt.compare);
    return qCompare(candidatePassword, this.password);
};


const UserAuth = Database.define('userAuth', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    profile_id: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    source: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['custom', 'linkedin'],
        defaultValue: 'custom',
        validate: {
            isIn: {
                args: [['custom', 'linkedin']],
                msg: 'Invalid status.'
            }
        }
    },
    token: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    token_secret: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    }
}, {
        indexes: [{ unique: true, fields: ['auth_id'] }],
        timestamps: true,
        freezeTableName: true,
        tableName: 'users_auth'
    });


export { User, UserAuth };