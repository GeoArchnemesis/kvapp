"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { quizSessions, quizResponses, quizResults } from "@/lib/db/schema";
import { TIERS } from "@/lib/domain/subscriptions/tiers";
import {
  STEPS,
  STEP_ORDER,
  nextStep,
  answerSchemaFor,
  type StepKey,
  type QuizAnswers,
} from "./config";
import { computeProfile } from "./scoring";
import { QUIZ_SESSION_COOKIE } from "./session";

export async function startQuizAction() {
  const sessionToken = randomUUID();
  await db.insert(quizSessions).values({ sessionToken });

  const store = await cookies();
  store.set(QUIZ_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect(`/quiz/${STEP_ORDER[0]}`);
}

export async function answerStepAction(step: StepKey, formData: FormData) {
  const store = await cookies();
  const sessionToken = store.get(QUIZ_SESSION_COOKIE)?.value;
  if (!sessionToken) redirect("/quiz");

  const [session] = await db
    .select()
    .from(quizSessions)
    .where(eq(quizSessions.sessionToken, sessionToken));

  if (!session) redirect("/quiz");

  const raw = STEPS[step].multi ? formData.getAll(step) : formData.get(step);
  const parsed = answerSchemaFor(step).safeParse(raw);

  if (!parsed.success) {
    redirect(`/quiz/${step}?error=required`);
  }

  await db
    .insert(quizResponses)
    .values({ quizSessionId: session.id, stepKey: step, answerValue: parsed.data })
    .onConflictDoUpdate({
      target: [quizResponses.quizSessionId, quizResponses.stepKey],
      set: { answerValue: parsed.data, answeredAt: new Date() },
    });

  const after = nextStep(step);
  if (after === "result") {
    await finalizeQuiz(session.id);
    redirect("/quiz/result");
  }

  redirect(`/quiz/${after}`);
}

async function finalizeQuiz(quizSessionId: string) {
  const rows = await db
    .select()
    .from(quizResponses)
    .where(eq(quizResponses.quizSessionId, quizSessionId));

  const answers = Object.fromEntries(
    rows.map((row) => [row.stepKey, row.answerValue])
  ) as unknown as QuizAnswers;

  const profile = computeProfile(answers);
  const tier = TIERS.find((t) => t.code === profile.recommendedTier)!;

  await db
    .insert(quizResults)
    .values({
      quizSessionId,
      recommendedTierId: tier.id,
      computedProfile: profile,
      rulesVersion: profile.rulesVersion,
    })
    .onConflictDoNothing();

  await db
    .update(quizSessions)
    .set({ status: "completed", completedAt: new Date() })
    .where(eq(quizSessions.id, quizSessionId));
}
