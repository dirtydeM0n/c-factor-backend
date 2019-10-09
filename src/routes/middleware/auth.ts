const _ = require('lodash');
import { Request, Response, NextFunction } from 'express';

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, resp: Response, next: NextFunction) => {
    if (req.user) { // req.isAuthenticated()
        return next();
    }
    resp.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
export const isAuthorized = (req: Request, resp: Response, next: NextFunction) => {
    const provider = req.path.split('/').slice(-1)[0];
    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        resp.redirect(`/auth/${provider}`);
    }
};