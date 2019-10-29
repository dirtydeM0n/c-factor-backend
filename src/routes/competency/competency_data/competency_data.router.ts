import { Router } from 'express';
import CompetencyDataController from './competency_data.controller';

const CompetencyDataRouter = Router()
  .get('/', CompetencyDataController.getAll)
  .get('/:id', CompetencyDataController.getById)
  .post('/', CompetencyDataController.post)
  .put('/:id', CompetencyDataController.put)
  .post('/:id', CompetencyDataController.put)
  .delete('/:id', CompetencyDataController.delete);

export { CompetencyDataRouter };
