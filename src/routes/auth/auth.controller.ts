import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import * as crypto from 'crypto';
import { IUser } from '../user/user';
import { default as UserService } from '../user/user.service';
import { sendMail } from '../services/mail.service';
import config = require('../../config');
import { UserProfile } from '../user/user.model';

class AuthController {

  async login(req: Request, resp: Response) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();
    if (errors) {
      return resp.status(401).send({
        msg: errors,
        code: 406
      });
    }

    try {
      const user: IUser = await UserService.findByEmail(req.body.email);
      if (!user) {
        return resp.status(404).send({
          msg: 'User not found',
          code: 404
        });
      }
      const isSamePass = await UserService.comparePassword(req.body.password, user.password);
      if (isSamePass) {
        const token = jwt.sign({
          email: user.email,
          role: user.role,
          username: user.username
        }, config.JWT_SECRET, { expiresIn: '1d' });
        return resp.status(200).send({ token: token });
      } else {
        return resp.status(401).send({
          msg: 'Unauthorized',
          status: 401
        });
      }
    } catch (error) {
      return resp.status(400).send({
        msg: error,
        code: 400
      });
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.assert('firstname', 'First name must be specified').notEmpty();
    req.assert('lastname', 'Last name must be specified').notEmpty();
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
      return res.status(401).send({
        msg: errors,
        status: 401
      });
    }

    const user: IUser = { ...req.body };
    try {
      // Check if user already exists
      const existingUser = await UserService.findByEmail(user.email);
      console.log('existingUser:', existingUser);
      if (existingUser) {
        return res.status(409).send({
          msg: 'User already exists',
          status: 409
        });
      }
      // Generate activation token
      const qRandomBytes = (util as any).promisify(crypto.randomBytes);
      const cryptedValue = await qRandomBytes(16);
      user.activationToken = cryptedValue.toString('hex');
      user.activationTokenExpireAt = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour
      // Send activation email
      const mailOptions = {
        to: user.email,
        from: config.mail.SMTP_USER,
        subject: 'Account activation',
        text: `You are receiving this email because you (or someone else) have requested account activation.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/auth/activate/${user.activationToken}\n\n
          If you did not request this, please ignore this email\n`
      };
      await sendMail(mailOptions);
      const savedUser: IUser = await UserService.create(user);
      // await UserProfile.create({ ...req.body, userId: savedUser.id });
      res.status(200).send({ msg: 'An activation email has been sent to your email. Please check!' });
    } catch (exp) {
      console.log(exp.error);
      res.status(400).send({
        msg: exp.error,
        status: 400
      });
    }
  }

  async activate(req: Request, res: Response) {
    try {
      const user: IUser = await UserService.findOneAndUpdate({ activationToken: req.params.activationToken, status: 'pending' }, { status: 'accepted' });
      if (!user) {
        return res.status(400).send({
          msg: 'Activation token invalid, please register again',
          status: 400
        });
      }
      console.log('user:', user);
      if (user.status == 'accepted') {
        return res.status(400).send({
          msg: 'Already activated, please login to continue!',
          status: 400
        });
      }
      /*const token = jwt.sign({
        email: user.email,
        role: user.role,
        username: user.username
      }, config.JWT_SECRET, { expiresIn: '1d' });
      // return res.status(200).send({ token: token });
      res.redirect(config.FRONTEND_URI + '/enter/' + token);*/
      res.status(200).send({
        msg: 'Account activated, please login to continue!'
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        msg: 'Activation token expired, please register again',
        status: 400
      });
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    req.assert('email', 'Email is not valid').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();
    if (errors) {
      return res.status(401).send({
        msg: errors,
        status: 401
      });
    }

    const user: IUser = { ...req.body };
    try {
      // Check if user exists
      const existingUser = await UserService.findByEmail(user.email);
      if (!existingUser) {
        return res.status(409).send({
          msg: 'User does not exist',
          status: 409
        });
      }
      // Generate reset activation token
      const qRandomBytes = (util as any).promisify(crypto.randomBytes);
      const cryptedValue = await qRandomBytes(16);
      user.resetToken = cryptedValue.toString('hex');
      user.resetTokenExpireAt = new Date(Date.now() + (60 * 60 * 1000)); // 1 hour
      // Send activation email
      const mailOptions = {
        to: user.email,
        from: config.mail.SMTP_USER,
        subject: 'Account password reset',
        text: `You are receiving this email because you (or someone else) have requested reset password of your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/auth/resetPassword/${user.activationToken}\n\n
          If you did not request this, please ignore this email\n`
      };
      await sendMail(mailOptions);
      const savedUser: IUser = await UserService.create(user);
      res.status(200).send(savedUser);
    } catch (exp) {
      console.log(exp.error);
      res.status(400).send({
        msg: exp.error,
        status: 400
      });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const user = await UserService.findOne({ resetToken: req.params.resetToken });
      const token = jwt.sign({
        email: user.email,
        role: user.role,
        username: user.username
      }, config.JWT_SECRET, { expiresIn: '1h' });
      await UserService.findOneAndUpdate({ resetToken: req.params.resetToken }, { resetToken: token });
      return res.status(200).send({ token: token });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        msg: 'Activation token expired, please register again',
        status: 400
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      req.session.destroy(function (err) {
        // cannot access session here
        req.session = null;
        res.redirect('/');
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        msg: error,
        status: 400
      });
    }
  }

}

export default new AuthController();