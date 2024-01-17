import express from 'express';
import createError from 'http-errors';

import { db } from '../../db/client';
import { generateAccessToken, verifyRefreshToken } from '../../services/auth';

export const refresh = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(createError.Unauthorized('No refresh token provided'));
  }

  const storedToken = await db.token.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (!storedToken) {
    return next(createError.Unauthorized('No matching refresh token'));
  }

  verifyRefreshToken(refreshToken, async (err, decoded) => {
    if (err) {
      await db.token.delete({
        where: {
          token: refreshToken,
        },
      });

      return next(createError.Unauthorized('Invalid refresh token'));
    }

    const accessToken = generateAccessToken({
      // @ts-expect-error
      sub: decoded.sub,
      // @ts-expect-error
      username: decoded.username,
    });

    res.json({ accessToken });
  });
};
