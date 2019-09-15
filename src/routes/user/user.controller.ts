import { Request, Response } from 'express';
import { default as UserService } from './user.service';
import { UserProfile } from './user.model';
import { Avatar } from './../avatar/avatar.model';

class UserController {
  async getAll(req: Request, resp: Response) {
    try {
      const users = await UserService.findAll();
      resp.status(200).send(users);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const user = await UserService.findOne({ id: req.params.id });
      resp.status(200).send(user);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const user = await UserService.create({ ...req.body });
      // await UserProfile.create({ ...req.body, userId: user.id });
      resp.status(200).send(user);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const user = await UserService.findOneAndUpdate({ id: req.params.id }, { ...req.body });
      resp.status(200).send(user);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const user = await UserService.deleteById(req.params.id);
      resp.status(200).send(user);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async activateAccount(req: Request, resp: Response) {
    try {
      const user = await UserService.findOneAndUpdate({ id: req.params.id }, { status: 'accepted' });
      resp.status(200).send(user);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async createAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.create({ ...req.body, userId: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async editAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.update({ ...req.body }, { where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.findOne({ where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deleteAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.destroy({ where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
}

export default new UserController();