const Sequelize = require('sequelize');
import { Database } from '../../db';

const Role = Database.define('role', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    value: {
        type: Sequelize.STRING
    }
}, {
    indexes: [{ unique: true, fields: ['name'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'roles'
});

// Role.sync();

export { Role };