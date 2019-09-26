import { Router } from 'express';
import MinigameController from './minigame.controller';

const MinigameRouter = Router()
  .get('/', MinigameController.getAll)
  .get('/:id', MinigameController.getById)
  .post('/', MinigameController.post)
  .put('/:id', MinigameController.put)
  .delete('/:id', MinigameController.delete);

export { MinigameRouter };
