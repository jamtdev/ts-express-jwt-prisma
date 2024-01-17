import express from 'express';
import createError from 'http-errors';
import bcrypt from 'bcrypt';

import { db } from '../../db/client';

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { username, password } = req.body;

  const duplicateUser = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (duplicateUser) {
    return next(createError.Conflict('Username already exists'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  res.json({ user });
};
