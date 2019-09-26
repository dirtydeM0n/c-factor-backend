const Sequelize = require('sequelize');
import { Database } from '../../../db';
import { Competency } from '../competency.model';

const AptitudeTest = Database.define('aptitude_test', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    icon: {
        type: Sequelize.TEXT
    },
    data: { // e.g., SJT data json
        type: Sequelize.JSON
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
    }
}, {
    indexes: [{ unique: true, fields: ['name'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'aptitude_tests'
});

AptitudeTest.belongsTo(Competency);

AptitudeTest.sync();

export { AptitudeTest };