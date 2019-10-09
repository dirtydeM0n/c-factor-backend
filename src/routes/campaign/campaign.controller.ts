import { Request, Response } from 'express';
import { Campaign } from './campaign.model';
import { CampaignInvite } from './invite/invite.model';
import { Competency } from '../competency/competency.model';
import { UserCompetency } from '../user/user_competency.model';
import { User } from '../user/user.model';

class CampaignController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await Campaign.findAll({});
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const data = await Campaign.findOne({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getByIdFormatted(req: Request, resp: Response) {
    try {
      const campaign = await Campaign.findOne({
        where: { id: req.params.id },
        include: [
          { model: Competency, as: 'components' }
        ]
      });
      // const user = await User.findOne({ where: { id: req.body.userId } });
      resp.status(200).send(campaign);
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
        resp.send({
          msg: 'Params `start_date` should less than `end_date` and `end_date` should be after today date.',
          status: 201
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
        const data = await Campaign.update({ ...req.body }, { where: { id: req.params.id } });
        resp.status(200).send(data);
      } else {
        resp.send({
          msg: 'Params `start_date` should less than `end_date` and `end_date` should be after today date.',
          status: 201
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

  async activate(req: Request, resp: Response) {
    try {
      const data = await Campaign.findOneAndUpdate({ id: req.params.id }, { active: 1 });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deactivate(req: Request, resp: Response) {
    try {
      const data = await Campaign.findOneAndUpdate({ id: req.params.id }, { active: 0 });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async changeState(req: Request, resp: Response) {
    try {
      const data = await Campaign.findOneAndUpdate({ id: req.params.id }, { state: req.body.state });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async createInvite(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.create({ ...req.body, campaignId: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async editInvite(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.update({ ...req.body }, { where: { campaignId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getInvite(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.findOne({ where: { campaignId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getAllInvites(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.findAll({ where: { campaignId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deleteInvite(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.destroy({ where: { campaignId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new CampaignController();