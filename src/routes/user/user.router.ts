import { Router } from 'express';
import UserController from './user.controller';

const UserRouter = Router()
  .get('/', UserController.getAll);

export { UserRouter };
