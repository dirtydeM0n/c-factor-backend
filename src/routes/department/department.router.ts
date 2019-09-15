import { Router } from 'express';
import DepartmentController from './department.controller';

const DepartmentRouter = Router()
  .get('/', DepartmentController.getAll)
  .get('/:id', DepartmentController.getById)
  .post('/', DepartmentController.post)
  .put('/:id', DepartmentController.put)
  .delete('/:id', DepartmentController.delete);

export { DepartmentRouter };
