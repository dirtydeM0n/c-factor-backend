import { Router } from 'express';
import UserCompetencyController from './user_competency.controller';

const UserCompetencyRouter = Router()
  .get('/', UserCompetencyController.getAll)
  .get('/:id', UserCompetencyController.getById)
  .post('/', UserCompetencyController.post)
  .put('/:id', UserCompetencyController.put)
  .delete('/:id', UserCompetencyController.delete);

export { UserCompetencyRouter };
