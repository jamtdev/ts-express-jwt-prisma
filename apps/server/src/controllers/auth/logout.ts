import express from 'express';

import { db } from '../../db/client';

export const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.sendStatus(204);
  }

  const storedToken = await db.token.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken) {
    res.clearCookie('refreshToken', { httpOnly: true });

    return res.sendStatus(204);
  }

  await db.token.delete({
    where: { token: refreshToken },
  });

  res.clearCookie('refreshToken', { httpOnly: true });
  res.sendStatus(204);
};
