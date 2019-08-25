import { Router } from 'express';
import RoleController from './role.controller';

const RoleRouter = Router()
  .get('/', RoleController.getAll)
  .get('/:id', RoleController.getById)
  .post('/', RoleController.post)
  .put('/:id', RoleController.put)
  .delete('/:id', RoleController.delete);

export { RoleRouter };
