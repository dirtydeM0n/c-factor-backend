/**
 * Created by Narain Sagar on 15/09/2019.
 */

import { Request, Response, NextFunction } from 'express';

export const validateRole = (allowedRole: string) => async (req: Request, resp: Response, next: NextFunction) => {
    const role = req.session.userType;
    if (role === allowedRole) {
        await next();
    } else {
        resp.status(401).send({ msg: 'Unauthorized role' });
    }
};

export const validateRoles = (allowedRoles = []) => async (req: Request, resp: Response, next: NextFunction) => {
    const role = req.session.userType;
    if (allowedRoles.indexOf(role) !== -1) {
        await next();
    } else {
        resp.status(401).send({ msg: 'Unauthorized role' });
    }
};

export const validateRolesNotToBe = (notAllowedRoles = []) => async (req: Request, resp: Response, next: NextFunction) => {
    const role = req.session.userType;
    if (notAllowedRoles.indexOf(role) === -1) {
        await next();
    } else {
        resp.status(401).send({ msg: 'Unauthorized role' });
    }
};
