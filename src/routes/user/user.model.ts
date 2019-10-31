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
    userType: {
        type: Sequelize.ENUM('admin', 'client', 'applicant', 'guest'),
        defaultValue: 'applicant',
        validate: {
            isIn: {
                args: [['admin', 'client', 'applicant', 'guest']],
                msg: 'Invalid status.'
            }
        }
    },
    status: {
        allowNull: false,
        type: Sequelize.ENUM('pending', 'accepted', 'deactivated'),
        defaultValue: 'pending',
        validate: {
            isIn: {
                args: [['pending', 'accepted', 'deactivated']],
                msg: 'Invalid status.'
            }
        }
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    gender: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    cnic: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    fatherName: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    phone: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    gradingSystem: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    gradingValue: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    university: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    otherUniversity: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    graduationDate: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    qualification: {
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
        type: Sequelize.ENUM('linkedin'),
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
User.hasMany(UserAuth);
UserAuth.belongsTo(User);

// User.sync();
// UserAuth.sync();

export { User, UserAuth };