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
  .get('/:id/status', CompetencyController.getStatusById)
  .put('/:id/status', CompetencyController.updateStatusById)
  .post('/:id/status', CompetencyController.updateStatusById)
  .post('/:id/activate', CompetencyController.activate)
  .post('/:id/deactivate', CompetencyController.deactivate)
  .get('/:id/state', CompetencyController.getStateById)
  .put('/:id/state', CompetencyController.updateStateById)
  .post('/:id/state', CompetencyController.updateStateById)
  // Competency Data
  .get('/:id/data', CompetencyController.getCompetencyData)
  .post('/:id/data', CompetencyController.createCompetencyData)
  .get('/:id/data/:competencyDataId', CompetencyController.getCompetencyDataById)
  .put('/:id/data/:competencyDataId', CompetencyController.editCompetencyData)
  .post('/:id/data/:competencyDataId', CompetencyController.editCompetencyData)
  .delete('/:id/data/:competencyDataId', CompetencyController.deleteCompetencyData);

export { CompetencyRouter };
export { CompetencyDataRouter } from './competency_data/competency_data.router';
