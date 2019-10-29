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
  .post('/:id/activate', CampaignController.activate)
  .post('/:id/deactivate', CampaignController.deactivate)
  .put('/:id/changeState', CampaignController.changeState)
  .post('/:id/changeState', CampaignController.changeState)
  // campaign invites routes
  .get('/:id/invites', CampaignController.getAllInvites)
  .get('/:id/invite', CampaignController.getInvite)
  .post('/:id/invite/create', CampaignController.createInvite)
  .put('/:id/invite', CampaignController.editInvite)
  .post('/:id/invite', CampaignController.editInvite)
  .delete('/:id/invite', CampaignController.deleteInvite);

export { CampaignRouter };
export { CampaignInviteRouter } from './invite/invite.router';
