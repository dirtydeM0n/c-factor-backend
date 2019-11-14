import { Router } from 'express';
import AvatarController from './avatar.controller';

const AvatarRouter = Router()
    .get('/', AvatarController.getAll)
    .post('/', AvatarController.post)
    .get('/:id', AvatarController.getById)
    .put('/:id', AvatarController.put)
    .post('/:id', AvatarController.put)
    .delete('/:id', AvatarController.delete);

export { AvatarRouter };
