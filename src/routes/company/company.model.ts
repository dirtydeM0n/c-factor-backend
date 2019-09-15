const Sequelize = require('sequelize');
import { Database } from '../../db';
import { Department } from '../department/department.model';

const Company = Database.define('company', {
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
    bio: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    website: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    },
    industry_type: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
    }
}, {
    indexes: [{ unique: true, fields: ['name'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'companies'
});

Company.hasMany(Department);

Company.sync();

export { Company };