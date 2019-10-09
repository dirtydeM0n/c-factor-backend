
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config = require('../../config');

function getToken(req: Request) {
  if (req.cookies && req.cookies.get('token')) {
    return req.cookies.get('token');
  }
  const tokenHeader = req.headers.Authorization || req.headers.authorization;
  if (tokenHeader && (tokenHeader as string).split(' ')[0] === 'Bearer') {
    return (tokenHeader as string).split(' ')[1];
  }
  return null;
}

export async function ValidateToken(req: Request, resp: Response, next: NextFunction) {
  const token = getToken(req);
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
