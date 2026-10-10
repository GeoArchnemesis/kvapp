import "server-only";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { contactSubmissions } from "@/lib/db/schema";

export async function getRecentLeads() {
  return db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}
