import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeonHttp } from "drizzle-orm/neon-http";
import { Pool } from "pg";
import { drizzle as drizzleNodePostgres } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
}

const isLocalPostgres = /^(postgres(ql)?:\/\/)[^/]*\b(localhost|127\.0\.0\.1)\b/.test(
  connectionString
);

// Neon's serverless driver only speaks to Neon's own HTTP/WebSocket proxy, so
// a plain local Postgres (used for local development without a Neon project)
// needs the standard node-postgres driver instead. Production always uses a
// real Neon connection string, which never matches `isLocalPostgres`.
export const db = isLocalPostgres
  ? drizzleNodePostgres(new Pool({ connectionString }), { schema })
  : drizzleNeonHttp(neon(connectionString), { schema });
