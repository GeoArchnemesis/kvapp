import { z } from "zod";

export type RecipeCandidate = {
  id: string;
  nameKa: string;
  nameEn: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  prepMinutes: number;
};

export type MealSlotTarget = {
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  targetKcal: number;
};

export type MealSelection = {
  mealType: MealSlotTarget["mealType"];
  recipeId: string;
};

const mealSelectionSchema = z.object({
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  recipeId: z.string(),
});

/**
 * Picks one recipe per meal slot from a candidate pool already filtered by
 * diet restrictions and meal type (see lib/domain/recipes/queries.ts).
 *
 * v1 is a deterministic closest-kcal-fit algorithm — no LLM, no vendor
 * dependency. A future LLM-backed selector can implement the same
 * (candidates, targets) -> selections shape; `assertGrounded` below is what
 * makes swapping it in safe: every returned recipeId is checked against the
 * candidate pool it was given, so a selector implementation can never
 * reference a recipe that doesn't exist or wasn't offered to it.
 */
export function selectDeterministic(
  candidatesByMealType: Record<string, RecipeCandidate[]>,
  slots: MealSlotTarget[]
): MealSelection[] {
  const selections = slots.map((slot) => {
    const candidates = candidatesByMealType[slot.mealType] ?? [];
    if (candidates.length === 0) {
      throw new Error(`No candidate recipes available for meal type "${slot.mealType}"`);
    }

    const closest = candidates.reduce((best, candidate) =>
      Math.abs(candidate.kcal - slot.targetKcal) < Math.abs(best.kcal - slot.targetKcal)
        ? candidate
        : best
    );

    return { mealType: slot.mealType, recipeId: closest.id };
  });

  return assertGrounded(selections, candidatesByMealType);
}

/** Structural anti-hallucination check: every selection must reference a
 * recipe that was actually present in the candidate pool it was given. */
function assertGrounded(
  selections: MealSelection[],
  candidatesByMealType: Record<string, RecipeCandidate[]>
): MealSelection[] {
  const parsed = z.array(mealSelectionSchema).parse(selections);

  for (const selection of parsed) {
    const pool = candidatesByMealType[selection.mealType] ?? [];
    const exists = pool.some((c) => c.id === selection.recipeId);
    if (!exists) {
      throw new Error(
        `Selector returned recipeId "${selection.recipeId}" that was not in the candidate pool for "${selection.mealType}"`
      );
    }
  }

  return parsed;
}
