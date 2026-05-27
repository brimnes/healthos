# Timeweb PostgreSQL setup

1. Create a PostgreSQL database in Timeweb.
2. Copy the connection string from the Timeweb panel.
3. Create `.env.local` from `.env.example`.
4. Put the connection string into `DATABASE_URL`.
5. Run the SQL from `database/schema.sql` in Timeweb's SQL console.
6. Start the app and open `/api/db/health`.

Expected response:

```json
{ "status": "ok", "result": { "ok": 1, "now": "..." } }
```

Do not commit `.env.local`.
