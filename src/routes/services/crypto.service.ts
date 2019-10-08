import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config = require('../../config');

export const generate = (text: string, size = 10) => new Promise((resolve, reject) => {
  bcrypt.hash(text, size, (err, hash) => {
    if (err) return reject(err);
    return resolve(hash);
  });
});

export const compare = (text: string, hash: string) => new Promise((resolve, reject) => {
  bcrypt.compare(text, hash, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
  });
});

export const sign = (payload = {}, opts = { expiresIn: '12h' }, secret = config.JWT_SECRET) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, secret, opts, (err, token) => {
      if (err !== null) return reject(err);
      return resolve(token);
    });
  });

/*
export const exp = (payload = {}, opts = { expiresIn: '0h' }) =>
  new Promise((resolve, reject) => {
    jwt.exp(payload, opts, (err, token) => {
      if (err !== null) return reject(err);
      return resolve(token);
    });
  });
*/

export const verify = (token = null, secret = config.JWT_SECRET) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return reject(err);
    return resolve(decoded);
  });
});