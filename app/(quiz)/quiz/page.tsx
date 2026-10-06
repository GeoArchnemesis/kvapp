import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { startQuizAction } from "@/lib/domain/quiz/actions";
import { getActiveQuizSession, getAnsweredStepValues } from "@/lib/domain/quiz/queries";
import { STEP_ORDER } from "@/lib/domain/quiz/config";

export default async function QuizIntroPage() {
  const session = await getActiveQuizSession();

  if (session?.status === "completed") {
    redirect("/quiz/result");
  }

  if (session?.status === "in_progress") {
    const answered = await getAnsweredStepValues(session.id);
    const firstUnanswered = STEP_ORDER.find((step) => !answered.has(step));
    redirect(`/quiz/${firstUnanswered ?? STEP_ORDER[0]}`);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-extrabold">იპოვეთ თქვენი პაკეტი</h1>
      <p className="mt-2 max-w-sm text-foreground-muted">
        უპასუხეთ 6 მოკლე კითხვას — შევარჩევთ თქვენთვის შესაფერის პაკეტს და მაგალითის
        სახით გაჩვენებთ ერთი დღის მენიუს, შედგენილს ნამდვილი ქართული რეცეპტებით.
      </p>
      <form action={startQuizAction} className="mt-8">
        <Button type="submit">კითხვარის დაწყება</Button>
      </form>
    </div>
  );
}
