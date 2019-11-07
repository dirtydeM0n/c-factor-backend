import { Request, Response } from 'express';
import { Department } from './department.model';

class DepartmentController {
  async getAll(req: Request, resp: Response) {
    try {
      const departments = await Department.findAll({});
      resp.status(200).send(departments);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const department = await Department.findOne({ where: { id: req.params.id } });
      resp.status(200).send(department);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const department = await Department.create({ ...req.body });
      resp.status(200).send(department);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      let department = await Department.update({ ...req.body }, { where: { id: req.params.id } });
      department = await Department.findOne({ where: { id: req.params.id } });
      resp.status(200).send(department);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const department = await Department.destroy({ where: { id: req.params.id } });
      resp.status(200).send(department);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new DepartmentController();