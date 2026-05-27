import "server-only";
import { Pool, type QueryResultRow } from "pg";

let pool: Pool | undefined;

function getConnectionString() {
  if (process.env.DATABASE_URL) {
    return normalizeConnectionString(process.env.DATABASE_URL);
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

function normalizeConnectionString(connectionString: string) {
  const url = new URL(connectionString);
  url.searchParams.set("sslmode", process.env.DB_SSL === "false" ? "disable" : "no-verify");
  url.searchParams.delete("sslcert");
  url.searchParams.delete("sslkey");
  url.searchParams.delete("sslrootcert");
  return url.toString();
}

export function getDb() {
  if (pool) return pool;

  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error("Database is not configured. Set DATABASE_URL in .env.local.");
  }

  pool = new Pool({
    connectionString,
    ssl: process.env.DATABASE_URL ? undefined : process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 10_000,
    query_timeout: 30_000
  });

  return pool;
}

export async function dbQuery<T extends QueryResultRow>(sql: string, params: unknown[] = []) {
  const result = await getDb().query<T>(sql, params);
  return result.rows;
}
