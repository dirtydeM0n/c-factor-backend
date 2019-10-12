
import { Request, Response } from 'express';

class RootController {

  get(req: Request, resp: Response) {
    return resp.status(200).send({ msg: 'Latest API is available' });
  }

  logout(req: Request, resp: Response) {
    // req.logout();
    resp.redirect('/');
  }

  linkedinDemo(req: Request, resp: Response) {
    resp.render('index', {
      title: 'Home',
      user: req.user
    });
  }

}

export default new RootController();