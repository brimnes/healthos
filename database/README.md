# Timeweb PostgreSQL setup

1. Create a PostgreSQL database in Timeweb.
2. Copy the connection string from the Timeweb panel.
3. Create `.env.local` from `.env.example`.
4. Put the connection string into `DATABASE_URL`.
5. Apply the schema:

```bash
npm run db:schema
```

You can also run the SQL from `database/schema.sql` manually in Timeweb's SQL console.

6. Start the app and open `/api/db/health`.

Expected response:

```json
{ "status": "ok", "result": { "ok": 1, "now": "..." } }
```

Do not commit `.env.local`.

## Timeweb App Platform deployment

For a full Next.js app with API routes, deploy this repository using the included `Dockerfile`.

Recommended settings:

- Repository: `https://github.com/brimnes/healthos`
- Branch: `main`
- Build mode: Dockerfile
- Port: `3000`
- Environment variables:
  - `DATABASE_URL`
  - `DB_SSL=true`

The container start command is already defined in `Dockerfile`.
