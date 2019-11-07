import { Request, Response } from 'express';
import { CampaignInvite } from './invite.model';

class CampaignInviteController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.findAll({});
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.findOne({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.create({ ...req.body });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      let campaignInvite = await CampaignInvite.update({ ...req.body }, { where: { id: req.params.id } });
      campaignInvite = await CampaignInvite.findOne({ where: { id: req.params.id } });
      resp.status(200).send(campaignInvite);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const data = await CampaignInvite.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new CampaignInviteController();