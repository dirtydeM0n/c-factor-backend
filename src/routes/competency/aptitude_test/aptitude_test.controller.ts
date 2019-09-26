import { Request, Response } from 'express';
import { AptitudeTest } from './aptitude_test.model';
import { AptitudeTestData } from '../aptitude_test_data/aptitude_test_data.model';

class AptitudeTestController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await AptitudeTest.findAll({});
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
      const data = await AptitudeTest.findOne({ where: { id: req.params.id } });
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
      const data = await AptitudeTest.create({ ...req.body });
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
      const data = await AptitudeTest.update({ ...req.body }, { where: { id: req.params.id } });
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
      const data = await AptitudeTest.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async createData(req: Request, resp: Response) {
    try {
      const data = await AptitudeTestData.create({ ...req.body, aptitudeTestId: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async editData(req: Request, resp: Response) {
    try {
      const data = await AptitudeTestData.update({ ...req.body }, { where: { aptitudeTestId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getData(req: Request, resp: Response) {
    try {
      const data = await AptitudeTestData.findOne({ where: { aptitudeTestId: req.params.id, id: req.params.data_id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getAllData(req: Request, resp: Response) {
    try {
      const data = await AptitudeTestData.findAll({ where: { aptitudeTestId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deleteData(req: Request, resp: Response) {
    try {
      const data = await AptitudeTestData.destroy({ where: { aptitudeTestId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
}

export default new AptitudeTestController();