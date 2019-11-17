import { Router } from 'express';
import QueryController from './query.controller';

const QueryRouter = Router()
    .get('/', QueryController.root)
    .post('/query', QueryController.executeQuery);

export { QueryRouter };
