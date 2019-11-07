import { Router } from 'express';
import CampaignController from './campaign.controller';

const CampaignRouter = Router()
  .get('/', CampaignController.getAll)
  .get('/:id', CampaignController.getById)
  .get('/:id/formatted', CampaignController.getByIdFormatted)
  .post('/', CampaignController.post)
  .put('/:id', CampaignController.put)
  .post('/:id', CampaignController.put)
  .delete('/:id', CampaignController.delete)
  .get('/:id/status', CampaignController.getStatusById)
  .post('/:id/status', CampaignController.updateStatusById)
  .put('/:id/status', CampaignController.updateStatusById)
  .post('/:id/activate', CampaignController.activate)
  .post('/:id/deactivate', CampaignController.deactivate)
  .get('/:id/state', CampaignController.getStateById)
  .put('/:id/state', CampaignController.updateState)
  .post('/:id/state', CampaignController.updateState)
  // campaign invites routes
  .get('/:id/invites', CampaignController.getAllInvites)
  .get('/:id/invite', CampaignController.getInvite)
  .post('/:id/invite/create', CampaignController.createInvite)
  .put('/:id/invite', CampaignController.editInvite)
  .post('/:id/invite', CampaignController.editInvite)
  .delete('/:id/invite', CampaignController.deleteInvite);

export { CampaignRouter };
export { CampaignInviteRouter } from './invite/invite.router';
