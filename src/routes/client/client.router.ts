import { Router } from 'express';
import ClientController from './client.controller';

const ClientRouter = Router()
  .get('/', ClientController.getAll)
  .get('/:id', ClientController.getById)
  .post('/', ClientController.post)
  .put('/:id', ClientController.put)
  .delete('/:id', ClientController.delete);

export { ClientRouter };
