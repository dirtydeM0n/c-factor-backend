
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config = require('../../config');

export async function ValidateToken(req: Request, resp: Response, next: NextFunction) {
  const token = req.cookies.get('token');
  if (token) {
    try {
      await jwt.verify(token, config.JWT_SECRET);
      await next();
    } catch (err) {
      resp.status(400).send({ msg: err });
    }
  } else {
    resp.status(401).send({ msg: 'Unauthorized request' });
  }
}
