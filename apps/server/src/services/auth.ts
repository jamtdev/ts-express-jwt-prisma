import jwt from 'jsonwebtoken';

type TokenPayload = {
  sub: string;
  username: string;
};

export const generateAccessToken = (payload: TokenPayload) => {
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRY
    ? `${process.env.ACCESS_TOKEN_EXPIRY}s`
    : `120s`;

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn,
  });

  return accessToken;
};

export const generateRefreshToken = (payload: TokenPayload) => {
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRY
    ? `${process.env.REFRESH_TOKEN_EXPIRY}s`
    : `86400s`;

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn,
  });

  return refreshToken;
};

export const generateAuthTokens = (payload: TokenPayload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string, cb: jwt.VerifyCallback) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, cb);
};

export const verifyRefreshToken = (token: string, cb: jwt.VerifyCallback) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, cb);
};
