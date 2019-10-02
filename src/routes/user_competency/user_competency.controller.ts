import { Request, Response } from 'express';
import { UserCompetency } from './user_competency.model';

class UserCompetencyController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await UserCompetency.findAll({});
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const data = await UserCompetency.findOne({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const data = await UserCompetency.create({ ...req.body });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const data = await UserCompetency.update({ ...req.body }, { where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const data = await UserCompetency.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
}

export default new UserCompetencyController();