
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export async function ValidateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.get('token');
  if (token) {
    try {
      const tokenHash = await jwt.verify(token, process.env.JWT_SECRET);
      await next();
    } catch (err) {
      res.sendStatus(400).send(err);
    }
  } else {
    res.sendStatus(401).send('Unauthorized request');
  }
}
