import { Request, Response } from 'express';
import { CompetencyData } from './competency_data.model';

class CompetencyDataController {
  async getAll(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.findAll({});
      resp.status(200).send(competencyData);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.findOne({ where: { id: req.params.id } });
      if (!competencyData) {
        return resp.status(404).send({ msg: 'Invalid competencyDataId or No data found!' });
      }
      competencyData.data = JSON.parse(competencyData.data || '{}');
      resp.status(200).send(competencyData.data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.create({ ...req.body });
      resp.status(200).send(competencyData);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.update({ ...req.body }, { where: { id: req.params.id } });
      resp.status(200).send(competencyData);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const competencyData = await CompetencyData.destroy({ where: { id: req.params.id } });
      resp.status(200).send(competencyData);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new CompetencyDataController();