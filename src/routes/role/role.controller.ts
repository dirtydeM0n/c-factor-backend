import { Request, Response } from 'express';
import { Role } from './role.model';

class RoleController {
  async getAll(req: Request, resp: Response) {
    try {
      const roles = await Role.findAll({});
      resp.status(200).send(roles);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const role = await Role.findOne({ where: { id: req.params.id } });
      resp.status(200).send(role);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const role = await Role.create({ ...req.body });
      resp.status(200).send(role);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const role = await Role.update({ ...req.body }, { where: { id: req.params.id } });
      resp.status(200).send(role);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const role = await Role.destroy({ where: { id: req.params.id } });
      resp.status(200).send(role);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
}

export default new RoleController();