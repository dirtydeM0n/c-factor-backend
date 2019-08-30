import { Router } from 'express';
import RootController from './root.controller';

const RootRouter = Router()
  .get('/', RootController.get)
  .get('/logout', RootController.logout)
  .get('/demo', RootController.demo);

export { RootRouter };
