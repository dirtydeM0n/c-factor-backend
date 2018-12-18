import { Router } from 'express';

const SwaggerAPIRouter = Router();
export { SwaggerAPIRouter };

export { RootRouter } from './root.router';
export { AuthRouter } from './auth/auth.router';
export { UserRouter } from './user/user.router';
