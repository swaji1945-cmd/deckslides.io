import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let cached: DrizzleDb | null = null;

function getDb(): DrizzleDb {
  if (cached) return cached;
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    "";
  if (!connectionString) {
    throw new Error(
      "No Postgres connection string found. Set POSTGRES_URL (or POSTGRES_PRISMA_URL / DATABASE_URL) in your environment."
    );
  }
  const sql = postgres(connectionString, { prepare: false, max: 1 });
  cached = drizzle(sql, { schema });
  return cached;
}

export const db = new Proxy({} as DrizzleDb, {
  get(_t, prop) {
    const real = getDb() as unknown as Record<string | symbol, unknown>;
    const value = real[prop as string];
    return typeof value === "function" ? (value as Function).bind(real) : value;
  },
});

export { schema };
