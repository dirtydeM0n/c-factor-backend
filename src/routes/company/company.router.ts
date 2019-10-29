import { Router } from 'express';
import CompanyController from './company.controller';

const CompanyRouter = Router()
  .get('/', CompanyController.getAll)
  .get('/:id', CompanyController.getById)
  .post('/', CompanyController.post)
  .put('/:id', CompanyController.put)
  .post('/:id', CompanyController.put)
  .delete('/:id', CompanyController.delete);

export { CompanyRouter };
