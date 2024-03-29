import { Request, Response } from 'express';
import { Competency } from './competency.model';
import { CompetencyData } from './competency_data/competency_data.model';
import * as config from '../../config';

class CompetencyController {
  async getAll(req: Request, resp: Response) {
    try {
      let find = {};
      if (req.params.campaignId) {
        find = { where: { campaignId: req.params.campaignId } };
      }
      const competencies = await Competency.findAll({ ...find, order: [['createdAt', 'ASC']] });
      resp.status(200).send(competencies);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const competency = await Competency.findOne({ where: { id: req.params.id } });
      resp.status(200).send(competency);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const assetsUrl = config.ASSETS_FOLDER_URI + req.body.assetsURL;
      let competency = await Competency.create({ ...req.body, assetsURL: assetsUrl });
      if (req.body.data) {
        const competencyData = await CompetencyData.create({ ...req.body, data: req.body.data, competencyId: competency.id });
        const dataURL = req.protocol + '://' + req.get('Host') + `/competencyData/${competencyData.id}`;
        competency.update({ dataURL: dataURL }, { where: { id: competency.id } });
      }
      competency = await Competency.findOne({ where: { id: competency.id } });
      resp.status(200).send(competency);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      let competency = await Competency.update({ ...req.body }, { where: { id: req.params.id } });
      if (req.body.data) {
        const competencyData = await CompetencyData.update({ ...req.body, data: req.body.data }, { where: { competencyId: req.params.id } });
        // const dataURL = req.protocol + '://' + req.get('Host') + `/competencyData/${competencyData.id}`;
        // competency.update({ dataURL: dataURL }, { where: { id: competency.id } });
      }
      competency = await Competency.findOne({ where: { id: req.params.id } });
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

  async getStateById(req: Request, resp: Response) {
    try {
      const competency = await Competency.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ state: competency.state });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async updateStateById(req: Request, resp: Response) {
    try {
      let competency = await Competency.update({ state: req.body.state }, { where: { id: req.params.id } });
      competency = await Competency.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ state: competency.state });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getStatusById(req: Request, resp: Response) {
    try {
      const competency = await Competency.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ active: competency.active });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async updateStatusById(req: Request, resp: Response) {
    try {
      let competency = await Competency.update({ active: req.body.active }, { where: { id: req.params.id } });
      competency = await Competency.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ active: competency.active });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async activate(req: Request, resp: Response) {
    try {
      let competency = await Competency.update({ active: 1 }, { where: { id: req.params.id } });
      competency = await Competency.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ active: competency.active });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deactivate(req: Request, resp: Response) {
    try {
      let competency = await Competency.update({ active: 0 }, { where: { id: req.params.id } });
      competency = await Competency.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ active: competency.active });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCompetencyData(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.find({ where: { competencyId: req.params.competencyId } });
      resp.status(200).send(competencyData);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async createCompetencyData(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.create({ ...req.body, competencyId: req.params.competencyId });
      resp.status(200).send(competencyData);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCompetencyDataById(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.findOne({ where: { id: req.params.id, competencyId: req.params.competencyId } });
      competencyData.data = JSON.parse(competencyData.data || '{}');
      resp.status(200).send(competencyData.data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async editCompetencyData(req: Request, resp: Response) {
    try {
      let competencyData = await CompetencyData.update({ ...req.body }, { where: { id: req.params.id, competencyId: req.params.competencyId } });
      competencyData = await CompetencyData.findOne({ where: { id: req.params.id, competencyId: req.params.competencyId } });
      resp.status(200).send(competencyData);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deleteCompetencyData(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.destroy({ where: { id: req.params.id, competencyId: req.params.competencyId } });
      resp.status(200).send(competencyData);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

}

export default new CompetencyController();