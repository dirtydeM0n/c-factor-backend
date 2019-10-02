import { Router } from 'express';
import UserCampaignController from './user_campaign.controller';

const UserCampaignRouter = Router()
  .get('/', UserCampaignController.getAll)
  .get('/:id', UserCampaignController.getById)
  .post('/', UserCampaignController.post)
  .put('/:id', UserCampaignController.put)
  .delete('/:id', UserCampaignController.delete);

export { UserCampaignRouter };
