import { Router } from 'express';
import CampaignInviteController from './invite.controller';

const CampaignInviteRouter = Router()
    .get('/', CampaignInviteController.getAll)
    .get('/:id', CampaignInviteController.getById)
    .post('/', CampaignInviteController.post)
    .put('/:id', CampaignInviteController.put)
    .delete('/:id', CampaignInviteController.delete);

export { CampaignInviteRouter };
