import { Router } from 'express';
import UserController from './user.controller';

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
  .delete('/:id/avatar', UserController.deleteAvatar);

export { UserRouter };
export { AvatarRouter } from './avatar/avatar.router';
