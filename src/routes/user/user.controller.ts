import { Request, Response } from 'express';
import { UserAuth, User } from './user.model';
import { Avatar } from './avatar/avatar.model';
import { Campaign } from '../campaign/campaign.model';
import { Client } from '../client/client.model';
import { UserCampaign } from './user_campaign.model';
import { Competency } from '../competency/competency.model';
import { UserCompetency } from './user_competency.model';

class UserController {
  async getAll(req: Request, resp: Response) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      resp.status(200).send(users);
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
      let auth = null, avatar = null;
      if (req.body.auth) {
        auth = await UserAuth.create({ ...req.body, ...req.body.auth, userId: user.id });
      }
      if (req.body.avatar) {
        avatar = await Avatar.create({ ...req.body.avatar, userId: user.id });
      }
      resp.status(200).send({ ...user, auth, avatar });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      resp.status(200).send({ ...user });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async put(req: Request, resp: Response) {
    try {
      let user = await User.update({ ...req.body }, { where: { id: req.params.id } });
      let auth = null, avatar = null;
      if (req.body.auth) {
        auth = await UserAuth.update({ ...req.body.auth }, { where: { userId: req.params.id } });
        auth = await UserAuth.findOne({ where: { userId: req.params.id }, attributes: { exclude: ['userId'] } });
      }
      if (req.body.avatar) {
        avatar = await Avatar.update({ ...req.body.avatar }, { where: { userId: req.params.id } });
        avatar = await Avatar.findOne({ where: { userId: req.params.id }, attributes: { exclude: ['userId'] } });
      }
      user = await User.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      resp.status(200).send({ ...user, auth, avatar });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const user = await User.destroy({ where: { id: req.params.id } });
      resp.status(200).send(user);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async activate(req: Request, resp: Response) {
    try {
      let user = await User.update({ status: 'accepted' }, { where: { id: req.params.id } });
      user = await User.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ status: user.status });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deactivate(req: Request, resp: Response) {
    try {
      let user = await User.update({ status: 'deactivated' }, { where: { id: req.params.id } });
      user = await User.findOne({ where: { id: req.params.id } });
      resp.status(200).send({ status: user.status });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getAvatars(req: Request, resp: Response) {
    try {
      const avatar = await Avatar.findAll({ where: { userId: req.params.userId } });
      resp.status(200).send(avatar);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async createAvatar(req: Request, resp: Response) {
    try {
      const avatar = await Avatar.create({ ...req.body, userId: req.params.userId });
      resp.status(200).send(avatar);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async editAvatar(req: Request, resp: Response) {
    try {
      let avatar = await Avatar.update({ ...req.body }, { where: { id: req.params.id, userId: req.params.userId } });
      avatar = await Avatar.findOne({ where: { id: req.params.id, userId: req.params.userId } });
      resp.status(200).send(avatar);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getAvatar(req: Request, resp: Response) {
    try {
      const avatar = await Avatar.findOne({ where: { id: req.params.id, userId: req.params.userId } });
      resp.status(200).send(avatar);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deleteAvatar(req: Request, resp: Response) {
    try {
      const avatar = await Avatar.destroy({ where: { id: req.params.id, userId: req.params.userId } });
      resp.status(200).send(avatar);
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

  async getUserCampaigns(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.params.userId }
      });
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
      const userCampaigns = await UserCampaign.findAll({
        where: { userId: req.params.userId, strikeable: false }
      });
      const campaigns = await Promise.all(userCampaigns.map(async (camp) => {
        const campaign = await Campaign.findOne({ where: { id: camp.campaignId } });
        const competencies = await Competency.findAll({
          where: { campaignId: camp.campaignId },
          order: [['createdAt', 'ASC']],
          attributes: {
            exclude: ['campaignId']
          }
        });
        const userCompetencies = await Promise.all(competencies.map(async (comp) => {
          const userCompetency = await UserCompetency.findOne({
            where: {
              userId: req.params.userId,
              competencyId: comp.id,
              strikeable: false
            },
            attributes: {
              exclude: ['competencyId', 'userId']
            }
          });
          return { ...comp, ...userCompetency/*status: userCompetency.status, score: userCompetency.score*/ };
        }));
        return { ...campaign, status: camp.status, score: camp.score, activeComponentId: camp.activeComponentId, components: userCompetencies };
      }));
      resp.status(200).send(campaigns);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getUserCampaignById(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.params.userId }
      });
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
      let userCampaign = await UserCampaign.findOne({
        where: {
          userId: req.params.userId,
          campaignId: req.params.campaignId
        }
      });
      if (!userCampaign) {
        userCampaign = await UserCampaign.create({ userId: req.params.userId, campaignId: req.params.campaignId });
      }
      const campaign = await Campaign.findOne({ where: { id: req.params.campaignId } });
      const competencies = await Competency.findAll({
        where: { campaignId: req.params.campaignId },
        order: [['createdAt', 'ASC']],
        attributes: {
          exclude: ['campaignId']
        }
      });
      const userCompetencies = await Promise.all(competencies.map(async (comp) => {
        const userCompetency = await UserCompetency.findOne({
          where: {
            userId: req.params.userId,
            competencyId: comp.id,
            strikeable: false
          },
          attributes: {
            exclude: ['competencyId', 'userId']
          }
        });
        return { ...comp, ...userCompetency/*status: userCompetency.status, score: userCompetency.score*/ };
      }));
      resp.status(200).send({ ...campaign, status: userCampaign.status, score: userCampaign.score, activeComponentId: userCampaign.activeComponentId, components: userCompetencies });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async updateUserCampaign(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.params.userId }
      });
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
      const whereObj = { userId: req.params.userId, campaignId: req.params.campaignId };
      let userCampaign = await UserCampaign.findOne({ where: whereObj });
      if (userCampaign) {
        await UserCampaign.update({ ...req.body }, { where: whereObj });
        userCampaign = await UserCampaign.findOne({ where: whereObj });
      } else {
        userCampaign = await UserCampaign.create({ ...req.body, ...whereObj });
      }
      resp.status(200).send(userCampaign);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async deleteUserCampaign(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { userId: req.params.id }
      });
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
      const userCampaign = await UserCampaign.destroy({
        where: {
          userId: req.params.userId,
          campaignId: req.params.campaignId
        }
      });
      resp.status(200).send(userCampaign);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async saveUserCompetency(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.params.userId }
      });
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
      const competency = await Competency.findOne({ where: { id: req.params.competencyId, campaignId: req.params.campaignId } });
      if (!competency) {
        return resp.status(404).send({ msg: 'Invalid competency id or No such competency found for provided campaign!' });
      }
      console.log('body:', req.body);
      const whereObj = { userId: req.params.userId, competencyId: req.params.competencyId };
      let userCompetency = await UserCompetency.findOne({ where: whereObj });
      if (userCompetency) {
        await UserCompetency.update({ ...req.body }, { where: whereObj });
        userCompetency = await UserCompetency.findOne({ where: whereObj });
      } else {
        userCompetency = await UserCompetency.create({ ...req.body, ...whereObj });
      }
      resp.status(200).send(userCompetency);
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCompetencies(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.params.id }
      });
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
      const competencies = user.getCompetencies();
      console.log('user competencies:', competencies);
      resp.status(200).send({ ...user, components: competencies });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async selectCompetency(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.params.id }
      });
      if (!user) {
        return resp.status(404).send({ msg: 'Invalid user id or No user found!' });
      }
      user.addCompetency(req.params.competencyId, { through: { state: req.body.state || 'active' } });
      const competencies = user.getCompetencies();
      console.log('user competencies:', competencies);
      resp.status(200).send({ ...user, components: competencies });
    } catch (error) {
      resp.status(404).send({ msg: 'Not found' });
    }
  }

  async getCompetencyById(req: Request, resp: Response) {
    try {
      const user = await User.findOne({
        where: { id: req.params.id }
      });
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
      const user = await User.findOne({
        where: { id: req.params.id }
      });
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
      const user = await User.findOne({
        where: { id: req.params.id }
      });
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