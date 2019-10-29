import { Router } from 'express';
import CompetencyController from './competency.controller';

const CompetencyRouter = Router()
  .get('/', CompetencyController.getAll)
  .get('/:campaignId/all', CompetencyController.getAll)
  .get('/:id', CompetencyController.getById)
  .post('/', CompetencyController.post)
  .put('/:id', CompetencyController.put)
  .post('/:id', CompetencyController.put)
  .delete('/:id', CompetencyController.delete)
  .put('/:id/changeState', CompetencyController.changeState)
  .post('/:id/changeState', CompetencyController.changeState)
  // Competency Data
  .get('/:id/data', CompetencyController.getCompetencyData)
  .post('/:id/data', CompetencyController.createCompetencyData)
  .get('/:id/data/:competencyDataId', CompetencyController.getCompetencyDataById)
  .put('/:id/data/:competencyDataId', CompetencyController.editCompetencyData)
  .post('/:id/data/:competencyDataId', CompetencyController.editCompetencyData)
  .delete('/:id/data/:competencyDataId', CompetencyController.deleteCompetencyData);

export { CompetencyRouter };
export { CompetencyDataRouter } from './competency_data/competency_data.router';
