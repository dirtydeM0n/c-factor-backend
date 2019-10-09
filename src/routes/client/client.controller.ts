import { Request, Response } from 'express';
import { Client } from './client.model';
import { User } from '../user/user.model';

class ClientController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await Client.findAll({});
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const data = await Client.findOne({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      let user = await User.findOne({ where: { email: req.body.email } });
      if (!user) { // if user not already exist
        user = await User.create({ ...req.body });
      } else { // user already exist
        return resp.status(404).send({ msg: 'User already exist with same email'});
      }
      let client = await Client.findOne({ where: { email: req.body.email } });
      if (!client) { // if client not already exist
        client = await Client.create({ ...req.body, userId: user.id });
      } else { // client already exist
        return resp.status(404).send({ msg: 'Client already exist with same email'});
      }
      resp.status(200).send({...client, user: user});
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const data = await Client.update({ ...req.body }, { where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const data = await Client.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new ClientController();