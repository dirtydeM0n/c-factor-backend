import { Router } from 'express';
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';

const AuthRouter = Router();
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);
AuthRouter.get('/activate/:activationToken', AuthController.activate);
export { AuthRouter };

const UserRouter = Router();
UserRouter.get('/', UserController.getAll);
export { UserRouter };

const SwaggerAPIRouter = Router();
export { SwaggerAPIRouter };