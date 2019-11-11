import { Router } from 'express';
import UserController from './user.controller';

// FYI: Here `:id` is a `:userId`
const UserRouter = Router()
  .get('/', UserController.getAll)
  .post('/', UserController.post)
  .get('/:id', UserController.getById)
  .put('/:id', UserController.put)
  .post('/:id', UserController.put)
  .delete('/:id', UserController.delete)
  .get('/:id/activate', UserController.activate)
  .get('/:id/deactivate', UserController.deactivate)
  // user avatar routes
  .get('/:userId/avatar', UserController.getAvatars)
  .post('/:userId/avatar', UserController.createAvatar)
  .get('/:userId/avatar/:id', UserController.getAvatar)
  .put('/:userId/avatar/:id', UserController.editAvatar)
  .post('/:userId/avatar/:id', UserController.editAvatar)
  .delete('/:userId/avatar/:id', UserController.deleteAvatar)
  // User Campaigns
  // .get('/:id/campaigns', UserController.getUserCampaigns)
  // .post('/:id/campaigns/:campaignId/select', UserController.selectCampaign)
  // .post('/:id/campaigns/:campaignId', UserController.selectCampaign)
  // .get('/:id/campaigns/:campaignId', UserController.getCampaignById)
  // .put('/:id/campaigns/:campaignId', UserController.editCampaign)
  // .post('/:id/campaigns/:campaignId', UserController.editCampaign)
  // .delete('/:id/campaigns/:campaignId', UserController.deleteUserCampaign)
  // User Compentencies
  .get('/:id/campaigns/:campaignId/competencies', UserController.getCompetencies)
  .post('/:id/campaigns/:campaignId/competencies/:competencyId/select', UserController.selectCompetency)
  .get('/:id/campaigns/:campaignId/competencies/:competencyId', UserController.getCompetencyById)
  .put('/:id/campaigns/:campaignId/competencies/:competencyId', UserController.editCompetency)
  .post('/:id/campaigns/:campaignId/competencies/:competencyId', UserController.editCompetency)
  .delete('/:id/campaigns/:campaignId/competencies/:competencyId', UserController.deleteCompetency)
  // Campaigns
  .get('/:userId/campaigns', UserController.getUserCampaigns)
  .get('/:userId/:campaignId', UserController.getUserCampaignById)
  .put('/:userId/:campaignId', UserController.updateUserCampaign)
  .post('/:userId/:campaignId', UserController.updateUserCampaign)
  .delete('/:userId/:campaignId', UserController.deleteUserCampaign)
  .get('/:userId/:campaignId/score', UserController.getUserCampaignById)
  .put('/:userId/:campaignId/score', UserController.updateUserCampaign)
  .post('/:userId/:campaignId/score', UserController.updateUserCampaign)
  .post('/:userId/:campaignId/status', UserController.updateUserCampaign)
  .post('/:userId/:campaignId/assign', UserController.updateUserCampaign)
  // Competencies
  .put('/:userId/:campaignId/:competencyId', UserController.saveUserCompetency)
  .post('/:userId/:campaignId/:competencyId', UserController.saveUserCompetency)
  .put('/:userId/:campaignId/:competencyId/score', UserController.saveUserCompetency)
  .post('/:userId/:campaignId/:competencyId/score', UserController.saveUserCompetency);

export { UserRouter };
export { AvatarRouter } from './avatar/avatar.router';
