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
  .get('/:competencyId/data', CompetencyController.getCompetencyData)
  .post('/:competencyId/data', CompetencyController.createCompetencyData)
  .get('/:competencyId/data/:id', CompetencyController.getCompetencyDataById)
  .put('/:competencyId/data/:id', CompetencyController.editCompetencyData)
  .post('/:competencyId/data/:id', CompetencyController.editCompetencyData)
  .delete('/:competencyId/data/:id', CompetencyController.deleteCompetencyData);

export { CompetencyRouter };
export { CompetencyDataRouter } from './competency_data/competency_data.router';
