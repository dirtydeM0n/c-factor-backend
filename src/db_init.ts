import { User, UserProfile, UserAuth } from './routes/user/user.model';
import { Role } from './routes/role/role.model';
import { Company } from './routes/company/company.model';
import { Avatar } from './routes/user/avatar/avatar.model';
import { Department } from './routes/department/department.model';
import { Competency } from './routes/competency/competency.model';
import { Campaign } from './routes/campaign/campaign.model';
import { Client } from './routes/client/client.model';
import { CampaignInvite } from './routes/campaign/invite/invite.model';
import { UserCompetency } from './routes/user/user_competency.model';
import { UserCampaign } from './routes/user/user_campaign.model';
import { CompetencyData } from './routes/competency/competency_data/competency_data.model';
import { ClientCompetency } from './routes/client/client_competeny.model';
import { ClientCampaign } from './routes/client/client_campaign.model';
import config = require('./config');
import { Database } from './db';

Role.sync();
User.sync();
UserProfile.sync();
UserAuth.sync();
Avatar.sync();
Company.sync();
Department.sync();
Client.sync();
Campaign.sync();
CampaignInvite.sync();
Competency.sync();
CompetencyData.sync();
ClientCompetency.sync();
ClientCampaign.sync();
UserCompetency.sync();
UserCampaign.sync();

if (config.NODE_ENV === 'development') {
    Database.sync(/*{ alter: true }*/).then(() => {
        console.log('Database sync!!');
    }, (err) => {
        console.log('An error occurred while creating the table:', err);
    });
}