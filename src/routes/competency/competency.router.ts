import { Router } from 'express';
import CompetencyController from './competency.controller';

const CompetencyRouter = Router()
  .get('/', CompetencyController.getAll)
  .get('/:id', CompetencyController.getById)
  .post('/', CompetencyController.post)
  .put('/:id', CompetencyController.put)
  .delete('/:id', CompetencyController.delete)
  .put('/:id/changeState', CompetencyController.changeState);

export { CompetencyRouter };
export { CompetencyDataRouter } from './competency_data/competency_data.router';
