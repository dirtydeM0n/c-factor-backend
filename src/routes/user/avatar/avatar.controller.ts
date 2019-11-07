import { Request, Response } from 'express';
import { Avatar } from './avatar.model';

class AvatarController {
  async getAll(req: Request, resp: Response) {
    try {
      const avatars = await Avatar.findAll({});
      resp.status(200).send(avatars);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const avatar = await Avatar.create({ ...req.body });
      resp.status(200).send(avatar);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const avatar = await Avatar.findOne({ where: { id: req.params.id } });
      resp.status(200).send(avatar);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      let avatar = await Avatar.update({ ...req.body }, { where: { id: req.params.id } });
      avatar = await Avatar.findOne({ where: { id: req.params.id } });
      resp.status(200).send(avatar);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const avatar = await Avatar.destroy({ where: { id: req.params.id } });
      resp.status(200).send(avatar);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new AvatarController();