const Sequelize = require('sequelize');
import { Database } from '../../db';
import { Campaign } from '../campaign/campaign.model';
import { User } from './user.model';

const UserCampaign = Database.define('user_campaign', {
    activeComponentId: {
        type: Sequelize.STRING
    },
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    strikeable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    status: {
        allowNull: false,
        type: Sequelize.ENUM('completed', 'active', 'in_progress'),
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [['completed', 'active', 'in_progress']],
                msg: 'Invalid state.'
            }
        }
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'user_campaigns'
});

User.campaignAssociation = User.belongsToMany(Campaign, { through: UserCampaign });
Campaign.userAssociation = Campaign.belongsToMany(User, { through: UserCampaign });

// UserCampaign.sync();

export { UserCampaign };