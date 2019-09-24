import { Router } from 'express';
import CompetencyController from './competency.controller';

const CompetencyRouter = Router()
  .get('/', CompetencyController.getAll)
  .get('/:id', CompetencyController.getById)
  .post('/', CompetencyController.post)
  .put('/:id', CompetencyController.put)
  .delete('/:id', CompetencyController.delete);

export { CompetencyRouter };
