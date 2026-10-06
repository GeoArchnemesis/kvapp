import "server-only";
import { cookies } from "next/headers";

export const QUIZ_SESSION_COOKIE = "kvapp_quiz_session";

export async function getQuizSessionToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(QUIZ_SESSION_COOKIE)?.value;
}
