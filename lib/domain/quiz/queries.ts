import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { quizSessions, quizResponses, quizResults } from "@/lib/db/schema";
import { getQuizSessionToken } from "./session";
import type { StepKey } from "./config";

export async function getActiveQuizSession() {
  const token = await getQuizSessionToken();
  if (!token) return null;

  const [session] = await db.select().from(quizSessions).where(eq(quizSessions.sessionToken, token));
  return session ?? null;
}

export async function getAnsweredStepValues(quizSessionId: string) {
  const rows = await db
    .select()
    .from(quizResponses)
    .where(eq(quizResponses.quizSessionId, quizSessionId));

  const answered = new Map<StepKey, unknown>();
  for (const row of rows) {
    answered.set(row.stepKey as StepKey, row.answerValue);
  }
  return answered;
}

export async function getQuizResultBySessionId(quizSessionId: string) {
  const [result] = await db
    .select()
    .from(quizResults)
    .where(eq(quizResults.quizSessionId, quizSessionId));
  return result ?? null;
}
