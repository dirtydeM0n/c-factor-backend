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
        const competencyData = await CompetencyData.create({ ...req.body, ...req.body.data, competencyId: competency.id });
        const dataURL = req.originalUrl + `competencies/{competency.id}/data/{competencyData.id}`;
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
      let competency = await Competency.update({ ...req.body }, { where: { id: req.params.id } });
      if (req.body.data) {
        const competencyData = await CompetencyData.update({ ...req.body, ...req.body.data }, { where: { competencyId: competency.id } });
        const dataURL = req.originalUrl + `competencies/{competency.id}/data/{competencyData.id}`;
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

  async getCompetencyData(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.find({ where: { competencyId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getCompetencyDataById(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.findOne({ where: { id: req.params.competencyDataId, competencyId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async createCompetencyData(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.create({ ...req.body, competencyId: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async editCompetencyData(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.update({ ...req.body }, { where: { id: req.params.competencyDataId, competencyId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deleteCompetencyData(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.destroy({ where: { id: req.params.competencyDataId, competencyId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

}

export default new CompetencyController();