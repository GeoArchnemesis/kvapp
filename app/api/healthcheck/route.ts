import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ status: "ok", db: "connected" });
  } catch (error) {
    return Response.json(
      { status: "error", message: error instanceof Error ? error.message : "unknown error" },
      { status: 500 }
    );
  }
}
