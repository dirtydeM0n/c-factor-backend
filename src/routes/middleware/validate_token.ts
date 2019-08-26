
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config = require('../../config');

export async function ValidateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.get('token');
  if (token) {
    try {
      await jwt.verify(token, config.JWT_SECRET);
      await next();
    } catch (err) {
      res.sendStatus(400).send(err);
    }
  } else {
    res.sendStatus(401).send('Unauthorized request');
  }
}
