# Overview

An example of [JSON Web Token (JWT)](https://jwt.io/introduction/) authentication flow using access and refresh tokens, built with:

- TypeScript
- Express
- Prisma
- PostgreSQL (Docker)

# Specification

| Route                 | Description                                     |
| --------------------- | ----------------------------------------------- |
| `GET /api`            | Protected route requiring a valid access token  |
| `POST /auth/register` | User registration route expecting credentials   |
| `POST /auth/login`    | User authentication route expecting credentials |
| `GET /auth/refresh`   | Refresh token route requiring valid cookie      |
| `GET /auth/logout`    | User logout route destroying refresh token      |

# Getting started

Create `.env` in `/apps/server` with the following variables:

```
SERVER_PORT=<Port number (default: 3000)>
DATABASE_URL=<PostgreSQL DB URL> (required)

ACCESS_TOKEN_SECRET=<JWT Secret> (required)
ACCESS_TOKEN_EXPIRY=<Token lifetime (default: 120s)>

REFRESH_TOKEN_SECRET=<JWT Secret> (required)
REFRESH_TOKEN_EXPIRY=<Token lifetime (default: 24hr)>
```

To initalise the server:

```
docker-compose up -d
cd apps/server
yarn build
yarn start
```
