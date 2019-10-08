import { Router } from 'express';
import UserController from './user.controller';

// FYI: Here `:id` is a `:userId`
const UserRouter = Router()
  .get('/', UserController.getAll)
  .get('/:id', UserController.getById)
  .get('/activateAccount/:id', UserController.activateAccount)
  .get('/deactivateAccount/:id', UserController.deactivateAccount)
  .post('/', UserController.post)
  .put('/:id', UserController.put)
  .delete('/:id', UserController.delete)
  // user avatar routes
  .post('/:id/avatar', UserController.createAvatar)
  .put('/:id/avatar', UserController.editAvatar)
  .get('/:id/avatar', UserController.getAvatar)
  .delete('/:id/avatar', UserController.deleteAvatar)
  // User Campaigns
  .get('/:id/campaigns', UserController.getCampaigns)
  .post('/:id/campaigns/:campaignId/select', UserController.selectCampaign)
  .post('/:id/campaigns/:campaignId', UserController.selectCampaign)
  .get('/:id/campaigns/:campaignId', UserController.getCampaignById)
  .put('/:id/campaigns/:campaignId', UserController.editCampaign)
  .delete('/:id/campaigns/:campaignId', UserController.deleteCampaign)
  // User Compentencies
  .get('/:id/campaigns/:campaignId/competencies', UserController.getCompetencies)
  .post('/:id/campaigns/:campaignId/competencies/:competencyId', UserController.selectCompetency)
  .get('/:id/campaigns/:campaignId/competencies/:competencyId', UserController.getCompetencyById)
  .put('/:id/campaigns/:campaignId/competencies/:competencyId', UserController.editCompetency)
  .delete('/:id/campaigns/:campaignId/competencies/:competencyId', UserController.deleteCompetency);

export { UserRouter };
export { AvatarRouter } from './avatar/avatar.router';
