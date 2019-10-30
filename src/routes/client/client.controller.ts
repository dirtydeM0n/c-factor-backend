import { Request, Response } from 'express';
import { Client } from './client.model';
import { User } from '../user/user.model';
import { Role } from '../role/role.model';
import { Company } from '../company/company.model';
import { Department } from '../department/department.model';
import { Campaign } from '../campaign/campaign.model';

class ClientController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await Client.findAll({ include: [{ all: true }] });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const data = await Client.findOne({
        where: { id: req.params.id },
        include: [{ all: true }]
      });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      if (req.body.companyId) {
        const company = await Company.findOne({ where: { id: req.body.companyId } });
        if (!company) {
          return resp.status(404).send({ msg: `Invalid companyId provided.` });
        }
      }
      if (req.body.departmentId) {
        const department = await Department.findOne({ where: { id: req.body.departmentId } });
        if (!department) {
          return resp.status(404).send({ msg: `Invalid departmentId provided.` });
        }
      }
      let user;
      if (req.body.userId) {
        user = await User.findOne({
          where: { id: req.body.userId },
          include: [{ all: true }]
        });
        if (!user) {
          return resp.status(404).send({ msg: `Invalid userId provided.` });
        }
        if (user.email !== req.body.email) {
          return resp.status(404).send({ msg: `Different email provided. It should be ${user.email}` });
        }
      } else {
        user = await User.findOne({
          where: { email: req.body.email },
          include: [{ all: true }]
        });
        if (!user) { // if user not already exist
          const role = await Role.findOne({ where: { value: 'client' } });
          user = await User.create({ ...req.body, userType: 'client', roleId: role ? role.id : null });
        } else { // user already exist
          return resp.status(404).send({ msg: 'User already exist with same email' });
        }
      }
      let client = await Client.findOne({ where: { email: req.body.email } });
      if (!client) { // if client not already exist
        client = await Client.create({ ...user, ...req.body, userId: user.id });
      } else { // client already exist
        return resp.status(404).send({ msg: 'Client already exist with same email' });
      }
      resp.status(200).send({ ...client, user: user });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const data = await Client.update({ ...req.body }, { where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const data = await Client.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCampaigns(req: Request, resp: Response) {
    try {
      const client = await Client.findOne({ where: { id: req.params.id } });
      if (!client) {
        return resp.status(404).send({ msg: 'Invalid client id or No client found!' });
      }
      const campaigns = await Campaign.findAll({ where: { clientId: client.id } });
      console.log('client campaigns:', campaigns);
      resp.status(200).send({ ...client, campaigns: campaigns });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async createCampaign(req: Request, resp: Response) {
    try {
      const client = await Client.findOne({ where: { id: req.params.id } });
      if (!client) {
        return resp.status(404).send({ msg: 'Invalid client id or No client found!' });
      }
      const campaign = await Campaign.create({ ...req.body, clientId: client.id });
      console.log('client campaign:', campaign);
      resp.status(200).send(campaign);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCampaignById(req: Request, resp: Response) {
    try {
      const client = await Client.findOne({ where: { id: req.params.id } });
      if (!client) {
        return resp.status(404).send({ msg: 'Invalid client id or No client found!' });
      }
      const campaign = await Campaign.findOne({ where: { id: req.params.campaignId, clientId: req.params.id } });
      console.log('get client campaign by Id:', campaign);
      resp.status(200).send(campaign);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new ClientController();