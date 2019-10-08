import { Request, Response } from 'express';
import { UserProfile, UserAuth, User } from './user.model';
import { Avatar } from './avatar/avatar.model';

class UserController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await User.findAll();
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
      const data = await User.findOne({ id: req.params.id });
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
      const user = await User.create({ ...req.body });
      if (req.body.profile) {
        await UserProfile.create({ ...req.body.profile, userId: user.id });
      }
      if (req.body.auth) {
        await UserAuth.create({ ...req.body.auth, userId: user.id });
      }
      if (req.body.avatar) {
        await Avatar.create({ ...req.body.avatar, userId: user.id });
      }
      resp.status(200).send(user);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      const user = await User.findOneAndUpdate({ id: req.params.id }, { ...req.body });
      if (req.body.profile) {
        await UserProfile.findOneAndUpdate({ userId: user.id }, { ...req.body.profile });
      }
      if (req.body.auth) {
        await UserAuth.findOneAndUpdate({ userId: user.id }, { ...req.body.auth });
      }
      if (req.body.avatar) {
        await Avatar.findOneAndUpdate({ userId: user.id }, { ...req.body.avatar });
      }
      resp.status(200).send(user);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const data = await User.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async activateAccount(req: Request, resp: Response) {
    try {
      const data = await User.findOneAndUpdate({ id: req.params.id }, { status: 'accepted' });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deactivateAccount(req: Request, resp: Response) {
    try {
      const data = await User.findOneAndUpdate({ id: req.params.id }, { status: 'deactivated' });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async createAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.create({ ...req.body, userId: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async editAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.update({ ...req.body }, { where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.findOne({ where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deleteAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.destroy({ where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  /*
  async createCampaign(req: Request, resp: Response) { // client
    try {
      const campaign = await Campaign.create({ ...req.body, userId: req.params.id });
      resp.status(200).send(campaign);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
  */

  async getCampaigns(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      const campaigns = user.getCampaigns();
      console.log('user campaigns:', campaigns);
      resp.status(200).send({ ...user, campaigns: campaigns });
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async selectCampaign(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      user.addCampaign(req.params.campaignId, { through: { state: req.body.state || 'active' } });
      const campaigns = user.getCampaigns();
      console.log('user campaigns:', campaigns);
      resp.status(200).send({ ...user, campaigns: campaigns });
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getCampaignById(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      const campaign = user.getCampaign(req.params.campaignId);
      console.log('get user campaign by Id:', campaign);
      resp.status(200).send(campaign);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async editCampaign(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      let opts = {};
      if (req.body.state) {
        opts = { state: req.body.state };
      }
      user.setCampaign(req.params.campaignId, { through: opts });
      const campaign = user.getCampaign();
      console.log('edit user campaign:', campaign);
      resp.status(200).send(campaign);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deleteCampaign(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      user.removeCampaign(req.params.campaignId);
      const campaign = user.getCampaign();
      console.log('delete user campaign:', campaign);
      resp.status(200).send(campaign);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getCompetencies(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      const competencies = user.getCompetencies();
      console.log('user competencies:', competencies);
      resp.status(200).send({ ...user, competencies: competencies });
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async selectCompetency(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      user.addCompetency(req.params.competencyId, { through: { state: req.body.state || 'active' } });
      const competencies = user.getCompetencies();
      console.log('user competencies:', competencies);
      resp.status(200).send({ ...user, competencies: competencies });
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async getCompetencyById(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      const competency = user.getCompetency(req.params.competencyId);
      console.log('get user competency by Id:', competency);
      resp.status(200).send(competency);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async editCompetency(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      let opts = {};
      if (req.body.state) {
        opts = { state: req.body.state };
      }
      user.setCompetency(req.params.competencyId, { through: opts });
      const competency = user.getCompetency();
      console.log('edit user competency:', competency);
      resp.status(200).send(competency);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }

  async deleteCompetency(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      user.removeCompetency(req.params.competencyId);
      const competency = user.getCompetency();
      console.log('delete user competency:', competency);
      resp.status(200).send(competency);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
}

export default new UserController();