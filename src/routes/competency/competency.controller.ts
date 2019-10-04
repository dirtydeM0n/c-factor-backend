import { Request, Response } from 'express';
import { Competency } from './competency.model';
import { CompetencyData } from './competency_data/competency_data.model';
import * as config from '../../config';

class CompetencyController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await Competency.findAll({});
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
      const data = await Competency.findOne({ where: { id: req.params.id } });
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
      let competency = await Competency.create({ ...req.body });
      if (req.body.data) {
        const testData = await CompetencyData.create({ ...req.body, ...req.body.data, competencyId: competency.id });
        const dataURL = testData.id;
        competency = await Competency.update({ dataURL: dataURL }, { where: { id: competency.id } });
      }
      resp.status(200).send(competency);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const competency = await Competency.update({ ...req.body }, { where: { id: req.params.id } });
      if (req.body.data) {
        const testData = await CompetencyData.update({ ...req.body, ...req.body.data }, { where: { id: competency.id } });
      }
      resp.status(200).send(competency);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const competency = await Competency.destroy({ where: { id: req.params.id } });
      await CompetencyData.destroy({ where: { competencyId: req.params.id } });
      resp.status(200).send(competency);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async changeState(req: Request, resp: Response) {
    try {
      const competency = await Competency.findOneAndUpdate({ id: req.params.id }, { state: req.body.state });
      resp.status(200).send(competency);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
}

export default new CompetencyController();