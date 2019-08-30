
import { Request, Response } from 'express';

class RootController {

  get(req: Request, res: Response) {
    return res.status(200).send({ msg: 'Latest API is available' });
  }

  logout(req: Request, res: Response) {
    // req.logout();
    res.redirect('/');
  }

  demo(req: Request, res: Response) {
    res.render('index', { user: req.user });
  }

}

export default new RootController();