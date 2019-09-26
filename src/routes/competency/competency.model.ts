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
        type: Sequelize.ENUM,
        values: ['SJT', 'Aptitude Test', 'Mini Game'],
        defaultValue: 'SJT',
        validate: {
            isIn: {
                args: [['SJT', 'Aptitude Test', 'Mini Game']],
                msg: 'Invalid competency type.'
            }
        }
    },
    title: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    description: {
        type: Sequelize.TEXT
    },
    timer: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    state: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['completed', 'open', 'in_progress'],
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
    },
    /*
    start_date: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    },
    end_date: {
        type: Sequelize.DATE,
        validate: {
            isDate: true
        }
    }
    */
}, {
    indexes: [{ unique: true, fields: ['title'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'competencies'
});

Competency.belongsTo(Campaign);

Competency.sync();

export { Competency };