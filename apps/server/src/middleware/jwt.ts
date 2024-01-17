import express from 'express';
import createError from 'http-errors';

import { verifyAccessToken } from '../services/auth';

export const authenticateJwt = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createError.Unauthorized('No access token provided'));
  }

  const token = authHeader.split(' ')[1];

  verifyAccessToken(token, (err, decoded) => {
    if (err) {
      return next(createError.Unauthorized('Invalid access token'));
    }

    // @ts-expect-error
    req.user = decoded;

    next();
  });
};
