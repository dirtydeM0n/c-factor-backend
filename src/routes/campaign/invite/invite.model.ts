const Sequelize = require('sequelize');
import { Database } from '../../../db';
import { Campaign } from '../campaign.model';

const CampaignInvite = Database.define('campaign_invite', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.TEXT
    },
    expired_at: {
        type: Sequelize.TEXT
    }
}, {
    indexes: [{ unique: true, fields: ['token'] }],
    timestamps: true,
    freezeTableName: true,
    tableName: 'campaign_invites'
});

CampaignInvite.belongsTo(Campaign);

// CampaignInvite.sync();

export { CampaignInvite };