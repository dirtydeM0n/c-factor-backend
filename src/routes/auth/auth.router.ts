import { Router } from 'express';
import AuthController from './auth.controller';

const passportLinkedIn = require('./passport');

const AuthRouter = Router()
  .post('/register', AuthController.register)
  .get('/activate/:activationToken', AuthController.activate)
  .post('/login', AuthController.login)
  .post('/resetPassword', AuthController.resetPassword)
  .post('/changePassword', AuthController.changePassword)
  .get('/logout', AuthController.logout)
  .get('/user/linkedin/:authId', AuthController.fetchByAuthId)
  .get('/linkedin', passportLinkedIn.authenticate('linkedin'))
  .get('/linkedin/callback', passportLinkedIn.authenticate('linkedin', { failureRedirect: '/auth/login', /*successRedirect: '/demo?success'*/ }),
    function (req, resp) {
      console.log('LinkedIn Successful authentication => ', req.user);
      if (req.user) {
        const serverUrl = req.protocol + '://' + req.get('Host');
        resp.redirect(`${serverUrl}/?authId=${req.user.auth.id}`); // &code=${req.query.code}&state=${req.query.state}
      }
      // Successful authentication
      // resp.json(req.user);
      resp.redirect(req.session.returnTo || '/');
    });

export { AuthRouter };
