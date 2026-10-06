import { notFound, redirect } from "next/navigation";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { OptionForm } from "@/components/quiz/OptionForm";
import { STEPS, STEP_ORDER, type StepKey } from "@/lib/domain/quiz/config";
import { answerStepAction } from "@/lib/domain/quiz/actions";
import { getActiveQuizSession, getAnsweredStepValues } from "@/lib/domain/quiz/queries";

function isStepKey(value: string): value is StepKey {
  return (STEP_ORDER as readonly string[]).includes(value);
}

export default async function QuizStepPage({
  params,
  searchParams,
}: {
  params: Promise<{ step: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { step } = await params;
  const { error } = await searchParams;

  if (!isStepKey(step)) notFound();

  const session = await getActiveQuizSession();
  if (!session) redirect("/quiz");
  if (session.status === "completed") redirect("/quiz/result");

  const answered = await getAnsweredStepValues(session.id);
  const currentValue = answered.get(step);

  const action = answerStepAction.bind(null, step);

  return (
    <div>
      <QuizProgress step={step} />
      <OptionForm
        config={STEPS[step]}
        action={action}
        currentValue={currentValue}
        hasError={error === "required"}
      />
    </div>
  );
}
