import * as bcrypt from 'bcrypt';
const Sequelize = require('sequelize');
import * as util from 'util';
import { Database } from '../../db';
import { createJWToken } from '../middleware/jwt';
import config = require('../../config');
import { Role } from '../role/role.model';

const User = Database.define('user', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    username: {
        allowNull: false,
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
        type: Sequelize.STRING,
        validate: {
            // notEmpty: true,
            len: [6, 100]
        }
    },
    status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['pending', 'accepted', 'deactivated'],
        defaultValue: 'pending',
        validate: {
            isIn: {
                args: [['pending', 'accepted', 'deactivated']],
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
    if (user.changed('password') && user.password) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
});

User.prototype.generateToken = function generateToken() {
    console.log('JWT:' + config.JWT_SECRET);
    return createJWToken({ email: this.email, id: this.id });
};

User.prototype.authenticate = function authenticate(applicantPassword: string) {
    if (bcrypt.compareSync(applicantPassword, this.password)) {
        return this;
    } else {
        return false;
    }
};
/*
User.prototype.comparePassword = function (applicantPassword: string) {
    const qCompare = (util as any).promisify(bcrypt.compare);
    return qCompare(applicantPassword, this.password);
};
*/

const UserProfile = Database.define('profile', {
    /*email: {
        allowNull: false,
        type: Sequelize.STRING
    },*/
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
    /*avatar: {
        type: Sequelize.STRING,
        defaultValue: ''
    },*/
    phone: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    education: {
        type: Sequelize.STRING
    },
    specialization: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    region: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    address: {
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    dob: {
        type: Sequelize.STRING
    },
    bio: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    /*
    role: {
        type: Sequelize.ENUM,
        values: ['admin', 'applicant', 'client'],
        defaultValue: 'applicant',
        validate: {
            isIn: {
                args: [['admin', 'applicant', 'client']],
                msg: 'Invalid status.'
            }
        }
    }*/
}, {
    /*indexes: [{ unique: true, fields: ['email'] }],*/
    timestamps: true,
    freezeTableName: true,
    tableName: 'users_profile'
});

const UserAuth = Database.define('auth', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    profile_id: {
        type: Sequelize.STRING
    },
    provider: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['linkedin'],
        defaultValue: 'linkedin',
        validate: {
            isIn: {
                args: [['linkedin']],
                msg: 'Invalid status.'
            }
        }
    },
    token: {
        type: Sequelize.TEXT
    }
}, {
    indexes: [{ unique: true, fields: ['token'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'users_auth'
});

User.belongsTo(Role);
UserProfile.belongsTo(User);
User.hasMany(UserAuth);

User.sync();
UserProfile.sync();
UserAuth.sync();

export { User, UserProfile, UserAuth };