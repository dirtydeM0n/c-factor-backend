import { Router } from 'express';
import AptitudeTestDataController from './aptitude_test_data.controller';

const AptitudeTestDataRouter = Router()
  .get('/', AptitudeTestDataController.getAll)
  .get('/:id', AptitudeTestDataController.getById)
  .post('/', AptitudeTestDataController.post)
  .put('/:id', AptitudeTestDataController.put)
  .delete('/:id', AptitudeTestDataController.delete);

export { AptitudeTestDataRouter };
