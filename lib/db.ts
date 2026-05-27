import "server-only";
import { Pool, type QueryResultRow } from "pg";

let pool: Pool | undefined;

function getConnectionString() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT ?? "5432";
  const database = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  if (!host || !database || !user || !password) {
    return undefined;
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

export function getDb() {
  if (pool) return pool;

  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error("Database is not configured. Set DATABASE_URL in .env.local.");
  }

  pool = new Pool({
    connectionString,
    ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false }
  });

  return pool;
}

export async function dbQuery<T extends QueryResultRow>(sql: string, params: unknown[] = []) {
  const result = await getDb().query<T>(sql, params);
  return result.rows;
}
