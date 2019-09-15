import { Router } from 'express';
import AvatarController from './avatar.controller';

const AvatarRouter = Router()
    .get('/', AvatarController.getAll)
    .get('/:id', AvatarController.getById)
    .post('/', AvatarController.post)
    .put('/:id', AvatarController.put)
    .delete('/:id', AvatarController.delete);

export { AvatarRouter };
