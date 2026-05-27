import "server-only";
import { dbQuery } from "./db";

export async function checkDatabaseConnection() {
  const [row] = await dbQuery<{ ok: number; now: string }>("select 1 as ok, now()::text as now");
  return row;
}
