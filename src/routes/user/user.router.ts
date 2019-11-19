import { Router } from 'express';
import UserController from './user.controller';

// FYI: Here `:id` is a `:userId`
const UserRouter = Router()
  .get('/campaigns', UserController.getAllUsersCampaigns)
  .get('/competencies', UserController.getAllUsersCompetencies)
  .get('/gameplay', UserController.getAllUsersGamePlayCount)
  .get('/gameplay/count', UserController.getAllUsersGamePlayCount)
  .get('/count', UserController.getUsersCount)
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
  // User Game plays
  .get('/:userId/gameplay', UserController.getUserGamePlayCountById)
  .get('/:userId/gameplay/count', UserController.getUserGamePlayCountById)
  // User Campaigns
  .get('/:userId/campaigns', UserController.getUserCampaigns)
  .get('/:userId/:campaignId', UserController.getUserCampaignById)
  .put('/:userId/:campaignId', UserController.updateUserCampaign)
  .post('/:userId/:campaignId', UserController.updateUserCampaign)
  .delete('/:userId/:campaignId', UserController.deleteUserCampaign)
  .post('/:userId/:campaignId/assign', UserController.updateUserCampaign)
  .get('/:userId/:campaignId/score', UserController.getUserCampaignScore)
  .put('/:userId/:campaignId/score', UserController.updateUserCampaignScore)
  .post('/:userId/:campaignId/score', UserController.updateUserCampaignScore)
  .get('/:userId/:campaignId/status', UserController.getUserCampaignStatus)
  .put('/:userId/:campaignId/status', UserController.updateUserCampaignStatus)
  .post('/:userId/:campaignId/status', UserController.updateUserCampaignStatus)
  // User Compentencies
  .get('/:userId/:campaignId/:competencyId', UserController.getUserCompetencyById)
  .put('/:userId/:campaignId/:competencyId', UserController.saveUserCompetency)
  .post('/:userId/:campaignId/:competencyId', UserController.saveUserCompetency)
  .get('/:userId/:campaignId/:competencyId/score', UserController.getUserCompetencyScore)
  .put('/:userId/:campaignId/:competencyId/score', UserController.saveUserCompetencyScore)
  .post('/:userId/:campaignId/:competencyId/score', UserController.saveUserCompetencyScore)
  .get('/:userId/:campaignId/:competencyId/status', UserController.getUserCompetencyStatus)
  .put('/:userId/:campaignId/:competencyId/status', UserController.saveUserCompetencyStatus)
  .post('/:userId/:campaignId/:competencyId/status', UserController.saveUserCompetencyStatus);

export { UserRouter };
export { AvatarRouter } from './avatar/avatar.router';
