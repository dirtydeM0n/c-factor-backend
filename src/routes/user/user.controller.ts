import { Request, Response } from 'express';
import { UserProfile, UserAuth, User } from './user.model';
import { Avatar } from './avatar/avatar.model';

class UserController {
  async getAll(req: Request, resp: Response) {
    try {
      const data = await User.findAll();
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const data = await User.findOne({ id: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async post(req: Request, resp: Response) {
    try {
      const user = await User.create({ ...req.body });
      if (req.body.profile) {
        await UserProfile.create({ ...req.body, ...req.body.profile, userId: user.id });
      }
      if (req.body.auth) {
        await UserAuth.create({ ...req.body, ...req.body.auth, userId: user.id });
      }
      if (req.body.avatar) {
        await Avatar.create({ ...req.body.avatar, userId: user.id });
      }
      resp.status(200).send(user);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
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
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const data = await User.destroy({ where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async activateAccount(req: Request, resp: Response) {
    try {
      const data = await User.findOneAndUpdate({ id: req.params.id }, { status: 'accepted' });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deactivateAccount(req: Request, resp: Response) {
    try {
      const data = await User.findOneAndUpdate({ id: req.params.id }, { status: 'deactivated' });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async createAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.create({ ...req.body, userId: req.params.id });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async editAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.update({ ...req.body }, { where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.findOne({ where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deleteAvatar(req: Request, resp: Response) {
    try {
      const data = await Avatar.destroy({ where: { userId: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  /*
  async createCampaign(req: Request, resp: Response) { // client
    try {
      const campaign = await Campaign.create({ ...req.body, userId: req.params.id });
      resp.status(200).send(campaign);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
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
      resp.status(404).send({ msg: 'Not found' });
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
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCampaignById(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      const campaign = user.getCampaign(req.params.campaignId);
      console.log('get user campaign by Id:', campaign);
      resp.status(200).send(campaign);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
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
      resp.status(404).send({ msg: 'Not found' });
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
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCompetencies(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      const competencies = user.getCompetencies();
      console.log('user competencies:', competencies);
      resp.status(200).send({ ...user, competencies: competencies });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
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
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCompetencyById(req: Request, resp: Response) {
    try {
      const user = await User.findOne({ id: req.params.id });
      const competency = user.getCompetency(req.params.competencyId);
      console.log('get user competency by Id:', competency);
      resp.status(200).send(competency);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
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
      resp.status(404).send({ msg: 'Not found' });
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
      resp.status(404).send({ msg: 'Not found' });
    }
  }
}

export default new UserController();