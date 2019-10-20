import { Router } from 'express';
import ClientController from './client.controller';

const ClientRouter = Router()
  .get('/', ClientController.getAll)
  .get('/:id', ClientController.getById)
  .post('/', ClientController.post)
  .put('/:id', ClientController.put)
  .delete('/:id', ClientController.delete)
  // Client Campaigns
  .get('/:id/campaigns', ClientController.getCampaigns)
  .post('/:id/campaigns', ClientController.createCampaign)
  .get('/:id/campaigns/:campaignId', ClientController.getCampaignById);

export { ClientRouter };
