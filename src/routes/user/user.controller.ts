import { Request, Response } from 'express';
import { UserProfile, UserAuth, User } from './user.model';
import { Avatar } from './avatar/avatar.model';
import { UserCampaign } from '../user_campaign/user_campaign.model';

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

  async selectCampaign(req: Request, resp: Response) {
    try {
      let data = await UserCampaign.findOne({ where: { campaignId: req.body.campaignId, userId: req.params.userId } });
      if (!data) {
        data = await UserCampaign.create({ ...req.body, campaignId: req.body.campaignId, userId: req.params.userId });
      }
      resp.status(200).send(data);
    } catch (error) {
      resp.send({
        msg: 'Not found',
        status: 404
      });
    }
  }
}

export default new UserController();