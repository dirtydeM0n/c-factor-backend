import { Router } from 'express';
import CampaignController from './campaign.controller';

const CampaignRouter = Router()
  .get('/', CampaignController.getAll)
  .get('/:id', CampaignController.getById)
  .post('/', CampaignController.post)
  .put('/:id', CampaignController.put)
  .delete('/:id', CampaignController.delete);

export { CampaignRouter };
