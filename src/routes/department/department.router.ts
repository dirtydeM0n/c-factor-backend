import { Router } from 'express';
import DepartmentController from './department.controller';

const DepartmentRouter = Router()
  .get('/', DepartmentController.getAll)
  .post('/', DepartmentController.post)
  .get('/:id', DepartmentController.getById)
  .put('/:id', DepartmentController.put)
  .post('/:id', DepartmentController.put)
  .delete('/:id', DepartmentController.delete);

export { DepartmentRouter };
