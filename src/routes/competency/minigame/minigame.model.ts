const Sequelize = require('sequelize');
import { Database } from '../../../db';
import { Competency } from '../competency.model';

const Minigame = Database.define('minigame', {
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
    url: { // e.g., minigame url
        type: Sequelize.STRING
    },
    score: { // e.g., minigame score
        type: Sequelize.INTEGER
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
    tableName: 'minigames'
});

Minigame.belongsTo(Competency);

Minigame.sync();

export { Minigame };