import * as jwt from 'jsonwebtoken';
import config = require('./../../config');

export function verifyJWTToken(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
}

export function createJWToken(payload: Object) {
    return jwt.sign({
        ...payload
    }, config.JWT_SECRET, {
        expiresIn: 3600, // '1d'
        algorithm: 'HS256'
    });
}