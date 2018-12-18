import { Router } from 'express';
import AuthController from './auth.controller';

const AuthRouter = Router()
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  .get('/activate/:activationToken', AuthController.activate);

export { AuthRouter };
