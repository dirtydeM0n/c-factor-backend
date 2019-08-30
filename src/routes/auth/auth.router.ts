import { Router } from 'express';
import AuthController from './auth.controller';

const passportLinkedIn = require('./passport');

const AuthRouter = Router()
  .post('/register', AuthController.register)
  .get('/activate/:activationToken', AuthController.activate)
  .post('/login', AuthController.login)
  .post('/resetPassword', AuthController.resetPassword)
  .post('/changePassword', AuthController.changePassword)
  .get('/linkedin', passportLinkedIn.authenticate('linkedin'))
  .get('/linkedin/callback', passportLinkedIn.authenticate('linkedin', { failureRedirect: '/auth/login', successRedirect: '/demo?success' }),
    function(req, res) {
      console.log('LinkedIn Successful authentication => ', req.user);
      // Successful authentication
      res.json(req.user);
    });

export { AuthRouter };
