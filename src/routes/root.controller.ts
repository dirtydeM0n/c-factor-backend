
import { Request, Response } from 'express';

class RootController {

  get(req: Request, res: Response) {
    return res.status(200).send({ msg: 'Latest API is available' });
  }

}

export default new RootController();