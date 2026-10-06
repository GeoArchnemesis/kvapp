import { STEP_ORDER, type StepKey } from "@/lib/domain/quiz/config";

export function QuizProgress({ step }: { step: StepKey }) {
  const index = STEP_ORDER.indexOf(step);
  const total = STEP_ORDER.length;
  const percent = ((index + 1) / total) * 100;

  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-medium text-foreground-muted">
        ნაბიჯი {index + 1} / {total}
      </p>
      <div className="h-2 w-full rounded-full bg-accent-soft">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
