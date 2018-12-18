import { Request, Response, NextFunction } from 'express';

const UNKNOWN_ERROR_CODE = 500;

export async function errorResponder(req: Request, res: Response, next: NextFunction) {
  try {
    await next();
  } catch (err) {
    let statusCode = undefined;
    let result = undefined;
    statusCode = err.status || UNKNOWN_ERROR_CODE;
    if (err.error) {
      result = {
        error: err.error,
        message: err.message
      };
    } else {
      result = err.message || '';
    }
    console.error(`${res.status} response: ${res}`);
    if (statusCode === UNKNOWN_ERROR_CODE) {
      console.error(`${err.stack}`);
    }

    res.status(statusCode).send(result);
  }
}
