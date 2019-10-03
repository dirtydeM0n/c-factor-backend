import { Request, Response } from 'express';
import { Campaign } from './campaign.model';
import { CampaignInvite } from './invite/invite.model';

class CampaignController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await Campaign.findAll({});
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
      const data = await Campaign.findOne({ where: { id: req.params.id } });
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
      const start_date = new Date(req.body.start_date),
        end_date = new Date(req.body.end_date),
        today_date = new Date();
      if (start_date < end_date && end_date > today_date) {
        const data = await Campaign.create({ ...req.body });
        resp.status(200).send(data);
      } else {
        resp.send({
          msg: 'Params `start_date` should less than `end_date` and `end_date` should be after today date.',
          status: 201
        });
      }
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const start_date = new Date(req.body.start_date),
        end_date = new Date(req.body.end_date),
        today_date = new Date();
      if (start_date < end_date && end_date > today_date) {
        const data = await Campaign.update({ ...req.body }, { where: { id: req.params.id } });
        resp.status(200).send(data);
      } else {
        resp.send({
          msg: 'Params `start_date` should less than `end_date` and `end_date` should be after today date.',
          status: 201
        });
      }
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const data = await Campaign.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async activate(req: Request, resp: Response) {
    try {
      const data = await Campaign.findOneAndUpdate({ id: req.params.id }, { active: 1 });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deactivate(req: Request, resp: Response) {
    try {
      const data = await Campaign.findOneAndUpdate({ id: req.params.id }, { active: 0 });
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
      const data = await Campaign.findOneAndUpdate({ id: req.params.id }, { state: req.body.state });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async createInvite(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.create({ ...req.body, campaignId: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async editInvite(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.update({ ...req.body }, { where: { campaignId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getInvite(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.findOne({ where: { campaignId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getAllInvites(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.findAll({ where: { campaignId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deleteInvite(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.destroy({ where: { campaignId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
}

export default new CampaignController();