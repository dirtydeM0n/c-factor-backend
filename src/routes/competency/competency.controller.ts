import { Request, Response } from 'express';
import { Competency } from './competency.model';
import { CompetencyData } from './competency_data/competency_data.model';

class CompetencyController {
  async getAll(req: Request, resp: Response) {
    try {
      let find = {};
      if (req.params.campaignId) {
        find = { where: { campaignId: req.params.campaignId } };
      }
      const data = await Competency.findAll(find);
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const data = await Competency.findOne({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const competency = await Competency.create({ ...req.body });
      if (req.body.data) {
        const competencyData = await CompetencyData.create({ ...req.body, ...req.body.data, competencyId: competency.id });
        const dataURL = req.originalUrl + `/${competency.id}/data/${competencyData.id}`;
        competency.update({ dataURL: dataURL }, { where: { id: competency.id } });
      }
      resp.status(200).send(competency);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const competency = await Competency.update({ ...req.body }, { where: { id: req.params.id } });
      if (req.body.data) {
        const competencyData = await CompetencyData.update({ ...req.body, ...req.body.data }, { where: { competencyId: competency.id } });
        // const dataURL = req.originalUrl + `/${competency.id}/data/${competencyData.id}`;
        // competency.update({ dataURL: dataURL }, { where: { id: competency.id } });
      }
      resp.status(200).send(competency);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const competency = await Competency.destroy({ where: { id: req.params.id } });
      await CompetencyData.destroy({ where: { competencyId: req.params.id } });
      resp.status(200).send(competency);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async changeState(req: Request, resp: Response) {
    try {
      const competency = await Competency.update({ state: req.body.state }, { where: { id: req.params.id } });
      resp.status(200).send(competency);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCompetencyData(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.find({ where: { competencyId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCompetencyDataById(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.findOne({ where: { id: req.params.competencyDataId, competencyId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async createCompetencyData(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.create({ ...req.body, competencyId: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async editCompetencyData(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.update({ ...req.body }, { where: { id: req.params.competencyDataId, competencyId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deleteCompetencyData(req: Request, resp: Response) {
    try {
      const data = await CompetencyData.destroy({ where: { id: req.params.competencyDataId, competencyId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

}

export default new CompetencyController();