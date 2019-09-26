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
export { MinigameRouter } from './minigame/minigame.router';
export { AptitudeTestRouter } from './aptitude_test/aptitude_test.router';
export { AptitudeTestDataRouter } from './aptitude_test_data/aptitude_test_data.router';
