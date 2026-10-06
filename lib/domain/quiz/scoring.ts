import type { TierCode } from "@/lib/domain/subscriptions/tiers";
import type { QuizAnswers } from "./config";

export const RULES_VERSION = "v1";

export type NutritionTargets = {
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type ComputedProfile = {
  rulesVersion: string;
  answers: QuizAnswers;
  recommendedTier: TierCode;
  targets: NutritionTargets;
};

/**
 * Deterministic tier recommendation. No biometric data is collected in the
 * quiz (that happens at full signup in Phase 2), so this reads only the
 * quiz's own answers — documented here so the rule stays auditable rather
 * than a black box.
 */
export function computeRecommendedTier(answers: QuizAnswers): TierCode {
  const wantsRegularHuman = answers.support_preference === "regular_human_support";
  const wantsGymOrLabs =
    answers.gym_interest === "want_gym_included" || answers.lab_interest === "yes";

  if (wantsRegularHuman && wantsGymOrLabs) return "vip";
  if (answers.support_preference !== "ai_only") return "pro";
  return "starter";
}

// Generic activity-level calorie bands (unisex average placeholder — not
// biometric-precise). Refined with real height/weight/age/sex once the user
// completes full signup in Phase 2; good enough for the quiz's "sample day".
const ACTIVITY_BASE_KCAL: Record<QuizAnswers["activity_level"], number> = {
  sedentary: 1800,
  light: 2000,
  moderate: 2200,
  active: 2500,
};

const GOAL_KCAL_ADJUSTMENT: Record<QuizAnswers["goal"], number> = {
  lose_weight: -400,
  maintain_habits: 0,
  build_muscle: 300,
};

export function computeNutritionTargets(answers: QuizAnswers): NutritionTargets {
  const kcal = ACTIVITY_BASE_KCAL[answers.activity_level] + GOAL_KCAL_ADJUSTMENT[answers.goal];

  // 30% protein / 40% carbs / 30% fat split.
  const proteinG = Math.round((kcal * 0.3) / 4);
  const carbsG = Math.round((kcal * 0.4) / 4);
  const fatG = Math.round((kcal * 0.3) / 9);

  return { kcal, proteinG, carbsG, fatG };
}

export function computeProfile(answers: QuizAnswers): ComputedProfile {
  return {
    rulesVersion: RULES_VERSION,
    answers,
    recommendedTier: computeRecommendedTier(answers),
    targets: computeNutritionTargets(answers),
  };
}
