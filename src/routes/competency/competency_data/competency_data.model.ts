const Sequelize = require('sequelize');
import { Database } from '../../../db';
import { Competency } from '../competency.model';

const CompetencyData = Database.define('competency_data', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    imageBg: { // image url
        type: Sequelize.STRING
    },
    imageHorizontal: { // image url
        type: Sequelize.STRING
    },
    timer: {
        type: Sequelize.INTEGER
    },
    nextButton: {
        type: Sequelize.JSON
    },
    thoughtBubble: {
        type: Sequelize.JSON
    },
    bottomPanel: { // e.g., either of type `message` or `options`
        type: Sequelize.JSON
    }
}, {
    /*indexes: [{ unique: true, fields: ['title'] }],*/
    timestamps: true,
    freezeTableName: true,
    tableName: 'competency_data'
});

CompetencyData.belongsTo(Competency);

// CompetencyData.sync();

export { CompetencyData };