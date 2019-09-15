const Sequelize = require('sequelize');
import { Database } from '../../db';
import { Company } from '../company/company.model';
import { Department } from '../department/department.model';
import { User } from '../user/user.model';

const Client = Database.define('client', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
    bio: {
        type: Sequelize.TEXT
    }
}, {
    indexes: [{ unique: true, fields: ['name'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'clients'
});

Client.belongsTo(User);
Client.belongsTo(Company);
Client.belongsTo(Department);

Client.sync();

export { Client };