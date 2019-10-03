import { Request, Response } from 'express';
import { Competency } from './competency.model';
import { Minigame } from './minigame/minigame.model';
import { AptitudeTest } from './aptitude_test/aptitude_test.model';
import { AptitudeTestData } from './aptitude_test_data/aptitude_test_data.model';

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
      const data = await Competency.create({ ...req.body });
      if (req.body.type === 'Mini Game') {
        const minigame = await Minigame.create({ ...req.body, competencyId: data.id });
      } else {
        const aptitude_test = await AptitudeTest.create({ ...req.body, competencyId: data.id });
        const aptitude_test_data = await AptitudeTestData.create({ ...req.body, aptitudeTestId: aptitude_test.id });
      }
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
      const data = await Competency.update({ ...req.body }, { where: { id: req.params.id } });
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
      const data = await Competency.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async changeState(req: Request, resp: Response) {
    try {
      const data = await Competency.findOneAndUpdate({ id: req.params.id }, { state: req.body.state });
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