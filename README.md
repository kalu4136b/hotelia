# Hotelia Tenant SaaS Starter

A multi-tenant SaaS starter project for hotels, restaurants, and base companies using:

- React + Vite frontend
- Express backend
- MySQL database
- Master user database with separate per-user databases

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy and configure environment variables:

```bash
cp server/.env.example server/.env
```

3. Create the master database and user databases using the SQL files in `server/db/`.

   - `server/db/master-schema.sql`
   - `server/db/seed-master.sql`
   - `server/db/user-schema.sql`
   - `server/db/seed-user-1.sql`

4. Start both frontend and backend:

```bash
npm run dev
```

## Architecture

- `client/` — React application built with Vite
- `server/` — Express API server
- `server/.env.example` — sample database settings
- `server/db/master-schema.sql` — schema for the central master user database
- `server/db/user-schema.sql` — schema for each user-specific database

## Multi-tenant pattern

This starter now uses a central master user database to look up each user’s own database connection. API requests must include `x-user-id`.

## Request headers

- `Authorization: Bearer <accessToken>`: protects API requests and selects the current user by token.

## Authentication

- `POST /api/auth/login` — login with `userId` and `password`
- `POST /api/auth/refresh` — refresh an expired access token using a refresh token

## Next steps

- Add authentication and user onboarding
- Add tenant admin tenant-specific onboarding
- Add role-based access controls
- Add migration scripts and seed data for MySQL
