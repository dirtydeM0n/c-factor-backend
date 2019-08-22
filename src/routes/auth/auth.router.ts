import { Router } from 'express';
import AuthController from './auth.controller';

const AuthRouter = Router()
  .post('/register', AuthController.register)
  .get('/activate/:activationToken', AuthController.activate)
  .post('/login', AuthController.login)
  .post('/resetPassword', AuthController.resetPassword)
  .post('/changePassword', AuthController.changePassword);

export { AuthRouter };
