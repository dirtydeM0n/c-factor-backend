import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import * as crypto from 'crypto';
import { sendMail } from '../services/mail.service';
import * as config from '../../config';
import { UserProfile, User, UserAuth } from '../user/user.model';
import { compare } from '../services/crypto.service';
import { Role } from '../role/role.model';

class AuthController {

  async login(req: Request, resp: Response) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();
    if (errors) {
      return resp.status(401).send({ msg: errors });
    }

    try {
      const user = await User.findOne({
        where: { email: req.body.email }
      });
      if (!user) {
        return resp.status(404).send({ msg: 'User not found' });
      }
      const isSamePass = await compare(req.body.password, user.password);
      if (isSamePass) {
        const userProfile = await UserProfile.findOne({
          where: { userId: user.id },
          attributes: {
            exclude: ['id', 'userId', 'createdAt', 'updatedAt']
          }
        });
        const token = jwt.sign({
          email: user.email,
          role: user.role,
          username: user.username
        }, config.JWT_SECRET, { expiresIn: '1d' });
        return resp.status(200).send({ id: user.id, email: user.email, userType: user.userType, status: user.status, ...userProfile, token: token });
      } else {
        return resp.status(401).send({ msg: 'Unauthorized' });
      }
    } catch (error) {
      return resp.status(400).send({ msg: error });
    }
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.assert('name', 'name must be specified').notEmpty();
    // req.assert('country', 'Country must be specified').notEmpty();
    // req.assert('address', 'Address must be specified').notEmpty();
    // req.assert('phone', 'Phone must be specified').notEmpty();
    // req.assert('dob', 'DOB must be specified').notEmpty();

    req.assert('email', 'Email is not valid').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    // req.assert('username', 'Username must be specified').notEmpty();
    // req.assert('role', 'Role must be specified').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return resp.status(401).send({ msg: errors });
    }

    const user = { ...req.body };
    try {
      // Check if user already exists
      const existingUser = await User.findOne({
        where: { email: user.email }
      });
      if (existingUser) {
        return resp.status(409).send({ msg: 'User already exists' });
      }
      // Generate activation token
      const qRandomBytes = (util as any).promisify(crypto.randomBytes);
      const cryptedValue = await qRandomBytes(16);
      user.activationToken = cryptedValue.toString('hex');
      user.activationTokenExpireAt = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour
      // Send activation email
      const serverUrl = req.protocol + '://' + req.get('Host');
      const mailOptions = {
        to: user.email,
        from: config.mail.SMTP_USER,
        subject: 'Account activation',
        text: `You are receiving this email because you (or someone else) have requested account activation.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          ${serverUrl}/auth/activate/${user.activationToken}\n\n
          If you did not request this, please ignore this email\n`
      };
      await sendMail(mailOptions);
      const role = await Role.findOne({ where: { value: 'applicant' } });
      const savedUser = await User.create({ ...user, userType: 'applicant', roleId: role ? role.id : null });
      const userProfile = await UserProfile.create({ ...req.body, userId: savedUser.id });
      console.log('savedUser:', savedUser);
      resp.status(200).send({ msg: 'An activation email has been sent to your email. Please check!' });
    } catch (exp) {
      console.log(exp.error);
      resp.status(400).send({
        msg: exp.error
      });
    }
  }

  async activate(req: Request, resp: Response) {
    try {
      const user = await User.update({ status: 'accepted', activationToken: null }, { where: { activationToken: req.params.activationToken, status: 'pending' } });
      if (!user) {
        return resp.status(400).send({
          msg: 'Activation token invalid, please register again!'
        });
      }
      console.log('user:', user);
      if (user.status == 'accepted') {
        return resp.status(400).send({
          msg: 'Already activated, please login to continue!'
        });
      }
      /*const token = jwt.sign({
        email: user.email,
        role: user.role,
        username: user.username
      }, config.JWT_SECRET, { expiresIn: '1d' });
      // return resp.status(200).send({ token: token });
      resp.redirect(config.FRONTEND_URI + '/enter/' + token);*/
      resp.status(200).send({
        msg: 'Account activated, please login to continue!'
      });
    } catch (error) {
      console.log(error);
      resp.status(400).send({
        msg: 'Activation token expired, please register again!'
      });
    }
  }

  async resetPassword(req: Request, resp: Response, next: NextFunction) {
    req.assert('email', 'Email is not valid').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();
    if (errors) {
      return resp.status(401).send({
        msg: errors
      });
    }

    const user = { ...req.body };
    try {
      // Check if user exists
      const existingUser = await User.findOne({
        where: { email: user.email }
      });
      if (!existingUser) {
        return resp.status(409).send({
          msg: 'User does not exist'
        });
      }
      // Generate reset activation token
      const qRandomBytes = (util as any).promisify(crypto.randomBytes);
      const cryptedValue = await qRandomBytes(16);
      const resetToken = cryptedValue.toString('hex');
      const resetTokenSentAt = new Date(Date.now());
      const resetTokenExpireAt = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour
      // Send activation email
      const serverUrl = req.protocol + '://' + req.get('Host');
      const mailOptions = {
        to: user.email,
        from: config.mail.SMTP_USER,
        subject: 'Account password reset',
        text: `You are receiving this email because you (or someone else) have requested password reset of your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          ${serverUrl}/auth/resetPassword/${resetToken}\n\n
          If you did not request this, please ignore this email\n`
      };
      await sendMail(mailOptions);
      await User.update({
        resetToken: resetToken,
        resetTokenExpireAt: resetTokenExpireAt,
        resetTokenSentAt: resetTokenSentAt
      }, { where: { id: existingUser.id } });
      const updatedUser = await User.findOne({
        where: { id: existingUser.id },
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      resp.status(200).send(updatedUser);
    } catch (exp) {
      console.log(exp.error);
      resp.status(400).send({ msg: exp.error });
    }
  }

  async changePassword(req: Request, resp: Response) {
    try {
      req.assert('password', 'Password cannot be blank').notEmpty();
      const errors = req.validationErrors();
      if (errors) {
        return resp.status(401).send({ msg: errors });
      }
      const user = await User.findOne({
        where: { resetToken: req.params.resetToken }
      });
      if (!user) {
        return resp.status(400).send({
          msg: 'User not found.'
        });
      }
      await User.update({ ...req.body, resetToken: null }, { where: { resetToken: req.params.resetToken } });
      const updatedUser = await User.findOne({
        where: { resetToken: req.params.resetToken },
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      return resp.status(200).send(updatedUser);
    } catch (error) {
      console.log(error);
      resp.status(400).send({
        msg: 'Activation token expired, please try reset again!'
      });
    }
  }

  async logout(req: Request, resp: Response) {
    try {
      req.session.destroy(function (err) {
        // cannot access session here
        req.session = null;
        resp.redirect('/');
      });
    } catch (error) {
      console.log(error);
      resp.status(400).send({
        msg: error
      });
    }
  }

  async fetchByAuthId(req: Request, resp: Response) {
    try {
      const userAuth = await UserAuth.findOne({
        where: { id: req.params.authId }
      });
      const user = await User.findOne({
        where: { id: userAuth.userId },
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      const userProfile = await UserProfile.findOne({
        where: { userId: userAuth.userId },
        attributes: {
          exclude: ['id', 'userId', 'createdAt', 'updatedAt']
        }
      });
      const token = jwt.sign({
        email: user.email,
        role: user.role,
        username: user.username
      }, config.JWT_SECRET, { expiresIn: '1d' });
      resp.status(200).send({ ...user, ...userProfile, token: token });
    } catch (error) {
      console.log(error);
      resp.status(400).send({
        msg: error
      });
    }
  }

}

export default new AuthController();