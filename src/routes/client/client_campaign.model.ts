const Sequelize = require('sequelize');
import { Database } from '../../db';
import { Campaign } from '../campaign/campaign.model';
import { Client } from './client.model';

const ClientCampaign = Database.define('client_campaign', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'client_campaigns'
});

Client.belongsToMany(Campaign, { through: ClientCampaign });
Campaign.belongsToMany(Client, { through: ClientCampaign });

// ClientCampaign.sync();

export { ClientCampaign };