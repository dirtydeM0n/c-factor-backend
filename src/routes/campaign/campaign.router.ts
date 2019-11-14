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
  .get('/:campaignId/invites', CampaignController.getAllInvites)
  .post('/:campaignId/invites', CampaignController.createInvite)
  .get('/:campaignId/invites/:id', CampaignController.getInvite)
  .put('/:campaignId/invites/:id', CampaignController.editInvite)
  .post('/:campaignId/invites/:id', CampaignController.editInvite)
  .delete('/:campaignId/invites/:id', CampaignController.deleteInvite);

export { CampaignRouter };
export { CampaignInviteRouter } from './invite/invite.router';
