import { Request, Response } from 'express';
import { UserProfile, UserAuth, User } from './user.model';
import { Avatar } from './avatar/avatar.model';
import { Campaign } from '../campaign/campaign.model';
import { Client } from '../client/client.model';
import { UserCampaign } from './user_campaign.model';

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
      const userType = req.body.userType || 'applicant';
      const user = await User.create({ ...req.body, userType: userType });
      if (userType === 'client') {
        const client = await Client.create({ ...req.body, userId: user.id });
      }
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
      const user = await User.update({ ...req.body }, { where: { id: req.params.id } });
      if (req.body.profile) {
        await UserProfile.update({ ...req.body.profile }, { where: { userId: user.id } });
      }
      if (req.body.auth) {
        await UserAuth.update({ ...req.body.auth }, { where: { userId: user.id } });
      }
      if (req.body.avatar) {
        await Avatar.update({ ...req.body.avatar }, { where: { userId: user.id } });
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
      const data = await User.update({ status: 'accepted' }, { where: { id: req.params.id } });
      resp.status(200).send(data);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deactivateAccount(req: Request, resp: Response) {
    try {
      const data = await User.update({ status: 'deactivated' }, { where: { id: req.params.id } });
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
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