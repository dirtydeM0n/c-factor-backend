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
  .get('/:userId/campaigns', UserController.getUserCampaigns)
  .get('/:userId/campaigns/:campaignId', UserController.getUserCampaignById)
  .delete('/:userId/campaigns/:campaignId', UserController.deleteUserCampaign)
  .get('/:userId/campaigns/:campaignId/score', UserController.getUserCampaignScoreById)
  .put('/:userId/campaigns/:campaignId/score', UserController.updateUserCampaign)
  .post('/:userId/campaigns/:campaignId/score', UserController.updateUserCampaign)
  .get('/:userId/campaigns/:campaignId/status', UserController.getUserCampaignStatusById)
  .put('/:userId/campaigns/:campaignId/status', UserController.updateUserCampaign)
  .post('/:userId/campaigns/:campaignId/status', UserController.updateUserCampaign)
  .post('/:userId/campaigns/:campaignId/assign', UserController.updateUserCampaign)
  // User Competencies
  .get('/:userId/campaigns/:campaignId/competencies', UserController.getUserCampaignById)
  .get('/:userId/campaigns/:campaignId/competencies/:competencyId', UserController.getUserCompetency)
  .put('/:userId/campaigns/:campaignId/competencies/:competencyId', UserController.saveUserCompetency)
  .post('/:userId/campaigns/:campaignId/competencies/:competencyId', UserController.saveUserCompetency)
  .delete('/:userId/campaigns/:campaignId/competencies/:competencyId', UserController.deleteUserCompetency)
  .get('/:userId/campaigns/:campaignId/competencies/:competencyId/score', UserController.getUserCompetencyScore)
  .put('/:userId/campaigns/:campaignId/competencies/:competencyId/score', UserController.saveUserCompetencyScore)
  .post('/:userId/campaigns/:campaignId/competencies/:competencyId/score', UserController.saveUserCompetencyScore)
  .get('/:userId/campaigns/:campaignId/competencies/:competencyId/score', UserController.getUserCompetencyStatus)
  .put('/:userId/campaigns/:campaignId/competencies/:competencyId/score', UserController.saveUserCompetencyStatus)
  .post('/:userId/campaigns/:campaignId/competencies/:competencyId/score', UserController.saveUserCompetencyStatus);

export { UserRouter };
export { AvatarRouter } from './avatar/avatar.router';
