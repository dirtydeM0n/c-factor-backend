import * as jwt from 'jsonwebtoken';
import config = require('./../../config');

export function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
}

export function createJWToken(payload) {
    return jwt.sign({
        data: payload
    }, config.JWT_SECRET, {
            expiresIn: 3600,
            algorithm: 'HS256'
        });
}