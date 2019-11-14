import { Request, Response } from 'express';
import { Company } from './company.model';

class CompanyController {
  async getAll(req: Request, resp: Response) {
    try {
      const companies = await Company.findAll({});
      resp.status(200).send(companies);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const company = await Company.findOne({ where: { id: req.params.id } });
      resp.status(200).send(company);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const company = await Company.create({ ...req.body });
      resp.status(200).send(company);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      let company = await Company.update({ ...req.body }, { where: { id: req.params.id } });
      company = await Company.findOne({ where: { id: req.params.id } });
      resp.status(200).send(company);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const company = await Company.destroy({ where: { id: req.params.id } });
      resp.status(200).send(company);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new CompanyController();