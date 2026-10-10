import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { PricingTable } from "@/components/marketing/PricingTable";
import { getActiveQuizSession, getAnsweredStepValues, getQuizResultBySessionId } from "@/lib/domain/quiz/queries";
import { getTierByCode } from "@/lib/domain/subscriptions/tiers";
import { generateOneDayPreview } from "@/lib/domain/meal-plans/generator";
import { mealTypeLabels, result as resultContent } from "@/content/text";
import type { ComputedProfile } from "@/lib/domain/quiz/scoring";
import { STEP_ORDER } from "@/lib/domain/quiz/config";

export default async function QuizResultPage() {
  const session = await getActiveQuizSession();
  if (!session) redirect("/quiz");

  if (session.status !== "completed") {
    const answered = await getAnsweredStepValues(session.id);
    const firstUnanswered = STEP_ORDER.find((step) => !answered.has(step));
    redirect(`/quiz/${firstUnanswered ?? STEP_ORDER[0]}`);
  }

  const result = await getQuizResultBySessionId(session.id);
  if (!result) redirect("/quiz");

  // computedProfile is stored as untyped jsonb — cast at the read boundary
  // rather than coupling lib/db/schema.ts to domain types.
  const profile = result.computedProfile as unknown as ComputedProfile;
  const tier = getTierByCode(profile.recommendedTier);
  const preview = await generateOneDayPreview(profile);

  return (
    <div>
      {/* Narrow column, matching the quiz's single-question flow */}
      <div className="mx-auto w-full max-w-xl">
        <p className="text-sm font-semibold text-accent">{resultContent.recommendedEyebrow}</p>
        <h1 className="mt-1 text-3xl font-extrabold">{tier.nameKa}</h1>
        <p className="mt-2 text-foreground-muted">{tier.tagline}</p>

        <Card className="mt-8">
          <h2 className="font-semibold">{resultContent.sampleDayHeading}</h2>
          <div className="mt-4 flex items-center gap-6">
            <ProgressRing percent={100} color="var(--primary)" size={100} strokeWidth={10}>
              <div className="text-center">
                <p className="text-lg font-bold">{preview.totals.kcal}</p>
                <p className="text-[10px] text-foreground-muted">{resultContent.calorieUnit}</p>
              </div>
            </ProgressRing>
            <div className="flex gap-4 text-sm">
              <span>
                <span className="block h-2 w-2 rounded-full bg-macro-protein" />
                {preview.totals.proteinG} {resultContent.macroProteinSuffix}
              </span>
              <span>
                <span className="block h-2 w-2 rounded-full bg-macro-carbs" />
                {preview.totals.carbsG} {resultContent.macroCarbsSuffix}
              </span>
              <span>
                <span className="block h-2 w-2 rounded-full bg-macro-fat" />
                {preview.totals.fatG} {resultContent.macroFatSuffix}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {preview.meals.map((meal) => (
              <div key={meal.mealType} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-foreground-muted">
                    {mealTypeLabels[meal.mealType]}
                  </p>
                  <p className="font-medium">{meal.nameKa}</p>
                </div>
                <p className="text-sm font-semibold">
                  {meal.kcal} {resultContent.calorieUnit}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-foreground-muted">{resultContent.disclaimer}</p>
        </Card>
      </div>

      {/* Wide column — a 3-column pricing comparison needs real width,
          unlike the single-question quiz steps above. */}
      <div className="mx-auto mt-12 w-full max-w-5xl">
        <h2 className="text-xl font-bold">{resultContent.choosePackageHeading}</h2>
        <div className="mt-6">
          <PricingTable highlight={tier.code} />
        </div>
      </div>
    </div>
  );
}
