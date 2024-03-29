const Sequelize = require('sequelize');
import { Database } from '../../db';
import { Campaign } from '../campaign/campaign.model';

const Competency = Database.define('competency', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    type: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'SJT' // Possible values are: 'SJT', 'Aptitude', 'Minigame', 'Login', 'Registration', 'RESUME_UPLOAD_SCREEN', 'END_SCREEN'
    },
    /*type: {
        type: Sequelize.ENUM(['SJT', 'Aptitude', 'Minigame', 'Login', 'Registration', 'RESUME_UPLOAD_SCREEN', 'END_SCREEN']),
        defaultValue: 'SJT',
        validate: {
            isIn: {
                args: [['SJT', 'Aptitude', 'Minigame', 'Login', 'Registration', 'RESUME_UPLOAD_SCREEN', 'END_SCREEN']],
                msg: 'Invalid competency type.'
            }
        }
    },*/
    title: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    description: {
        type: Sequelize.TEXT
    },
    timer: {
        type: Sequelize.INTEGER
    },
    componentId: {
        type: Sequelize.STRING
    },
    nextComponentId: {
        type: Sequelize.STRING
    },
    icon: {
        type: Sequelize.TEXT
    },
    url: { // e.g., minigame url
        type: Sequelize.STRING
    },
    startupData: { // e.g., data json
        type: Sequelize.TEXT
    },
    dataURL: { // e.g., json data url
        type: Sequelize.TEXT
    },
    assetsURL: { // e.g., assets data url
        type: Sequelize.STRING
    },
    state: {
        allowNull: false,
        type: Sequelize.ENUM(['completed', 'open', 'in_progress']),
        defaultValue: 'open',
        validate: {
            isIn: {
                args: [['completed', 'open', 'in_progress']],
                msg: 'Invalid state.'
            }
        }
    },
    active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true // false => inactive, true => active
    }
}, {
    /*indexes: [{ unique: true, fields: ['title'] }],*/
    timestamps: true,
    freezeTableName: true,
    tableName: 'competencies'
});

// Competency.belongsTo(Campaign);
Campaign.hasMany(Competency);

// Competency.sync();

export { Competency };