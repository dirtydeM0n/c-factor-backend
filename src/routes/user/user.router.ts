import { Router } from 'express';
import UserController from './user.controller';

const UserRouter = Router()
  .get('/', UserController.getAll)
  .get('/:id', UserController.getById)
  .get('/activateAccount/:id', UserController.activateAccount)
  .post('/', UserController.post)
  .put('/:id', UserController.put)
  .delete('/:id', UserController.delete);

export { UserRouter };
