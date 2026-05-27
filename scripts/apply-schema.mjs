import fs from "node:fs";
import { Client } from "pg";

function loadEnvFile(path) {
  if (!fs.existsSync(path)) return;

  const env = fs.readFileSync(path, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
}

function getConnectionString() {
  if (process.env.DATABASE_URL) {
    if (/USER|PASSWORD|HOST|DATABASE/.test(process.env.DATABASE_URL)) {
      throw new Error("DATABASE_URL still contains placeholder values. Paste the real Timeweb connection string into .env.local.");
    }

    return process.env.DATABASE_URL;
  }

  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT ?? "5432";
  const database = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  if (!host || !database || !user || !password) {
    throw new Error("Set DATABASE_URL or DB_HOST/DB_NAME/DB_USER/DB_PASSWORD in .env.local.");
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

loadEnvFile(".env.local");

const sql = fs.readFileSync("database/schema.sql", "utf8");
let client;

try {
  client = new Client({
    connectionString: getConnectionString(),
    ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false }
  });
  await client.connect();
  await client.query(sql);
  const result = await client.query("select count(*)::int as count from marker_dictionary");
  console.log("SCHEMA_APPLIED");
  console.log(`marker_dictionary_count=${result.rows[0].count}`);
} catch (error) {
  console.error(`SCHEMA_ERROR: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
} finally {
  await client?.end().catch(() => {});
}
