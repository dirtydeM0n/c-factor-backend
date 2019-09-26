const Sequelize = require('sequelize');
import { Database } from '../../../db';
import { AptitudeTest } from '../aptitude_test/aptitude_test.model';

const AptitudeTestData = Database.define('aptitude_test_data', {
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
    indexes: [{ unique: true, fields: ['title'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'aptitude_test_data'
});

AptitudeTestData.belongsTo(AptitudeTest);

AptitudeTestData.sync();

export { AptitudeTestData };