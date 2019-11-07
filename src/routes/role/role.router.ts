import { Router } from 'express';
import RoleController from './role.controller';

const RoleRouter = Router()
  .get('/', RoleController.getAll)
  .post('/', RoleController.post)
  .get('/:id', RoleController.getById)
  .put('/:id', RoleController.put)
  .post('/:id', RoleController.put)
  .delete('/:id', RoleController.delete);

export { RoleRouter };
