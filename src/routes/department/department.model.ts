const Sequelize = require('sequelize');
import { Database } from '../../db';

const Department = Database.define('department', {
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
    }
}, {
    indexes: [{ unique: true, fields: ['name'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'departments'
});

Department.sync();

export { Department };