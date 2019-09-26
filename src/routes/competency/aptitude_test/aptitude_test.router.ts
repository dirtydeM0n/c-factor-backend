import { Router } from 'express';
import AptitudeTestController from './aptitude_test.controller';

const AptitudeTestRouter = Router()
  // Aptitude Test
  .get('/', AptitudeTestController.getAll)
  .get('/:id', AptitudeTestController.getById)
  .post('/', AptitudeTestController.post)
  .put('/:id', AptitudeTestController.put)
  .delete('/:id', AptitudeTestController.delete);
  // Aptitude Test Data
  // .get('/:id/data', AptitudeTestController.getAllData)
  // .get('/:id/data/:data_id', AptitudeTestController.getData)
  // .post('/:id/data', AptitudeTestController.createData)
  // .put('/:id/data', AptitudeTestController.editData)
  // .delete('/:id/data', AptitudeTestController.deleteData);

export { AptitudeTestRouter };
