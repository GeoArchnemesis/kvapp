import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeonHttp } from "drizzle-orm/neon-http";
import { Pool } from "pg";
import { drizzle as drizzleNodePostgres } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

type Database =
  | ReturnType<typeof drizzleNeonHttp<typeof schema>>
  | ReturnType<typeof drizzleNodePostgres<typeof schema>>;

let instance: Database | null = null;

// Built lazily, on first actual use — NOT at module import time. Importing
// this file (even transitively, e.g. any route handler that imports it)
// used to throw immediately if DATABASE_URL was missing, which broke
// `next build` in every environment that doesn't have it set yet (CI,
// Railway, ...), even though build-time "collecting page data" only loads
// route modules to inspect them and never actually runs a query. A build
// should never need a live DB connection string just to exist.
function getDb(): Database {
  if (instance) return instance;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
  }

  // Neon's serverless driver only speaks to Neon's own HTTP/WebSocket proxy, so
  // a plain local Postgres (used for local development without a Neon project)
  // needs the standard node-postgres driver instead. Production always uses a
  // real Neon connection string, which never matches `isLocalPostgres`.
  const isLocalPostgres = /^(postgres(ql)?:\/\/)[^/]*\b(localhost|127\.0\.0\.1)\b/.test(
    connectionString
  );

  instance = isLocalPostgres
    ? drizzleNodePostgres(new Pool({ connectionString }), { schema })
    : drizzleNeonHttp(neon(connectionString), { schema });

  return instance;
}

export const db: Database = new Proxy({} as Database, {
  get(_target, prop) {
    const real = getDb() as unknown as Record<PropertyKey, unknown>;
    const value = Reflect.get(real, prop);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
