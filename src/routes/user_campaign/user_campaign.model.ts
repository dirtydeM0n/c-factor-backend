const Sequelize = require('sequelize');
import { Database } from '../../db';
import { Campaign } from '../campaign/campaign.model';
import { User } from '../user/user.model';

const UserCampaign = Database.define('user_campaign', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    }
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'user_campaigns'
});

UserCampaign.belongsTo(User);
UserCampaign.belongsTo(Campaign);

UserCampaign.sync();

export { UserCampaign };