const Sequelize = require('sequelize');
import { Database } from '../../db';
import { Client } from '../client/client.model';

const Campaign = Database.define('campaign', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    startupComponentId: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.TEXT
    },
    description: {
        type: Sequelize.TEXT
    },
    image_url: {
        type: Sequelize.STRING
    },
    state: {
        allowNull: false,
        type: Sequelize.ENUM('completed', 'active', 'in_progress'),
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [['completed', 'active', 'in_progress']],
                msg: 'Invalid state.'
            }
        }
    },
    start_date: {
        type: Sequelize.STRING
    },
    end_date: {
        type: Sequelize.STRING
    },
    active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false // false => inactive, true => active
    },
    allow_direct_applications: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false // false => No, true => Yes
    },
    allow_invites_only: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false // false => No, true => Yes
    },
}, {
    indexes: [{ unique: true, fields: ['name'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'campaigns'
});

Campaign.belongsTo(Client);

Campaign.sync();

export { Campaign };