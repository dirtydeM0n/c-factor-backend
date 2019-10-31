import { Router } from 'express';
import AuthController from './auth.controller';
import * as config from '../../config';
import { UserAuth } from '../user/user.model';

const passportLinkedIn = require('./passport');

const AuthRouter = Router()
  .post('/register', AuthController.register)
  .get('/activate/:activationToken', AuthController.activate)
  .post('/login', AuthController.login)
  .post('/resetPassword', AuthController.resetPassword)
  .post('/changePassword', AuthController.changePassword)
  .get('/logout', AuthController.logout)
  .post('/user/linkedin/:authId', AuthController.fetchByAuthId)
  .get('/linkedin', passportLinkedIn.authenticate('linkedin'))
  .get('/linkedin/callback', passportLinkedIn.authenticate('linkedin', { failureRedirect: `${config.FRONTEND_URI}?error=1`, /*successRedirect: '/demo?success'*/ }),
    async (req, resp) => {
      try {
        console.log('LinkedIn Successful authentication => ', req.user);
        if (req.user) {
          let authId = null;
          if (req.user.auth && req.user.auth.id) {
            authId = req.user.auth.id;
          } else {
            const auth = await UserAuth.findOne({ where: { userId: req.user.id } });
            authId = auth.id;
          }
          console.log('authId:', authId);
          resp.redirect(`${config.FRONTEND_URI}/?authId=${authId}`); // &code=${req.query.code}&state=${req.query.state}
        }
        // Successful authentication
        // resp.json(req.user);
        resp.redirect(req.session.returnTo || `${config.FRONTEND_URI}`);
      } catch (err) {
        console.log(err);
        resp.redirect(`${config.FRONTEND_URI}?error=1`);
      }
    });

export { AuthRouter };
