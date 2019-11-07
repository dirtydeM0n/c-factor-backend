import { Request, Response } from 'express';
import { Campaign } from './campaign.model';
import { CampaignInvite } from './invite/invite.model';
import { Competency } from '../competency/competency.model';
import { Client } from '../client/client.model';

class CampaignController {
  async getAll(req: Request, resp: Response) {
    try {
      const campaigns = await Campaign.findAll({});
      resp.status(200).send(campaigns);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const campaign = await Campaign.findOne({ where: { id: req.params.id } });
      resp.status(200).send(campaign);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getByIdFormatted(req: Request, resp: Response) {
    try {
      const campaign = await Campaign.findOne({ where: { id: req.params.id } });
      const components = await Competency.findAll({
        where: { campaignId: req.params.id },
        attributes: {
          exclude: ['campaignId']
        }
      });
      resp.status(200).send({ ...campaign, components: components });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const start_date = new Date(req.body.start_date),
        end_date = new Date(req.body.end_date),
        today_date = new Date();
      if (start_date < end_date && end_date > today_date) {
        const data = await Campaign.create({ ...req.body });
        resp.status(200).send(data);
      } else {
        resp.status(201).send({
          msg: 'Params `start_date` should less than `end_date` and `end_date` should be after today date.'
        });
      }
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const start_date = new Date(req.body.start_date),
        end_date = new Date(req.body.end_date),
        today_date = new Date();
      if (start_date < end_date && end_date > today_date) {
        let campaign = await Campaign.update({ ...req.body }, { where: { id: req.params.id } });
        campaign = await Campaign.findOne({ where: { id: req.params.id } });
        resp.status(200).send(campaign);
      } else {
        resp.status(201).send({
          msg: 'Params `start_date` should less than `end_date` and `end_date` should be after today date.'
        });
      }
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const data = await Campaign.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getStatusById(req: Request, resp: Response) {
    try {
      const campaign = await Campaign.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ active: campaign.active });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async updateStatusById(req: Request, resp: Response) {
    try {
      let campaign = await Campaign.update({ active: req.body.active }, { where: { id: req.params.id } });
      campaign = await Campaign.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ active: campaign.active });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async activate(req: Request, resp: Response) {
    try {
      let campaign = await Campaign.update({ active: 1 }, { where: { id: req.params.id } });
      campaign = await Campaign.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ active: campaign.active });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deactivate(req: Request, resp: Response) {
    try {
      let campaign = await Campaign.update({ active: 0 }, { where: { id: req.params.id } });
      campaign = await Campaign.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ active: campaign.active });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getStateById(req: Request, resp: Response) {
    try {
      const campaign = await Campaign.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ state: campaign.state });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async updateState(req: Request, resp: Response) {
    try {
      let campaign = await Campaign.update({ state: req.body.state }, { where: { id: req.params.id } });
      campaign = await Campaign.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ state: campaign.state });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async createInvite(req: Request, resp: Response) {
    try {
      const campaignInvite = await CampaignInvite.create({ ...req.body, campaignId: req.params.id });
      resp.status(200).send(campaignInvite);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async editInvite(req: Request, resp: Response) {
    try {
      let campaignInvite = await CampaignInvite.update({ ...req.body }, { where: { campaignId: req.params.id } });
      campaignInvite = await CampaignInvite.findOne({ where: { campaignId: req.params.id } });
      resp.status(200).send(campaignInvite);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getInvite(req: Request, resp: Response) {
    try {
      const campaignInvite = await CampaignInvite.findOne({ where: { campaignId: req.params.id } });
      resp.status(200).send(campaignInvite);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getAllInvites(req: Request, resp: Response) {
    try {
      const campaignInvite = await CampaignInvite.findAll({ where: { campaignId: req.params.id } });
      resp.status(200).send(campaignInvite);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deleteInvite(req: Request, resp: Response) {
    try {
      const campaignInvite = await CampaignInvite.destroy({ where: { campaignId: req.params.id } });
      resp.status(200).send(campaignInvite);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new CampaignController();