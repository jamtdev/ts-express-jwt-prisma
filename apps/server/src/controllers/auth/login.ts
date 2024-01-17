import express from 'express';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

import { db } from '../../db/client';
import { generateAuthTokens } from '../../services/auth';

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(createError.BadRequest('Username or password not provided'));
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return next(createError.NotFound('User not found'));
  }

  const passwordMatch = await bcrypt.compare(password, user.password ?? '');

  if (!passwordMatch) {
    return next(createError.Unauthorized('Invalid password'));
  }

  const { accessToken, refreshToken } = generateAuthTokens({
    sub: user.id,
    username,
  });

  await db.token.upsert({
    where: {
      userId: user.id,
    },
    update: {
      token: refreshToken,
    },
    create: {
      userId: user.id,
      token: refreshToken,
    },
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};
