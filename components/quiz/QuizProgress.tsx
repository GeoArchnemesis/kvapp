import { STEP_ORDER, type StepKey } from "@/lib/domain/quiz/config";
import { stepLabelTemplate } from "@/content/text";

export function QuizProgress({ step }: { step: StepKey }) {
  const index = STEP_ORDER.indexOf(step);
  const total = STEP_ORDER.length;
  const percent = ((index + 1) / total) * 100;
  const label = stepLabelTemplate
    .replace("{current}", String(index + 1))
    .replace("{total}", String(total));

  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-medium text-foreground-muted">{label}</p>
      <div className="h-2 w-full rounded-full bg-accent-soft">
        <div
          className="h-2 rounded-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
