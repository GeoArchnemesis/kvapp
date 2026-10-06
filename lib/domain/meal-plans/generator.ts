import "server-only";
import { getCandidateRecipes, type MealType } from "@/lib/domain/recipes/queries";
import { selectDeterministic, type RecipeCandidate } from "./selector";
import type { ComputedProfile } from "@/lib/domain/quiz/scoring";

export type OneDayPreviewMeal = {
  mealType: MealType;
  nameKa: string;
  nameEn: string;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  prepMinutes: number;
};

export type OneDayPreview = {
  meals: OneDayPreviewMeal[];
  totals: { kcal: number; proteinG: number; carbsG: number; fatG: number };
};

const MEAL_SLOTS: { mealType: MealType; share: number }[] = [
  { mealType: "breakfast", share: 0.25 },
  { mealType: "lunch", share: 0.35 },
  { mealType: "dinner", share: 0.4 },
];

export async function generateOneDayPreview(profile: ComputedProfile): Promise<OneDayPreview> {
  const candidatesByMealType: Record<string, RecipeCandidate[]> = {};

  for (const slot of MEAL_SLOTS) {
    const rows = await getCandidateRecipes({
      mealType: slot.mealType,
      dietRestrictions: profile.answers.diet_restrictions,
    });

    candidatesByMealType[slot.mealType] = rows.map((r) => ({
      id: r.id,
      nameKa: r.nameKa,
      nameEn: r.nameEn,
      kcal: r.kcal,
      proteinG: Number(r.proteinG),
      carbsG: Number(r.carbsG),
      fatG: Number(r.fatG),
      prepMinutes: r.prepMinutes,
    }));
  }

  const selections = selectDeterministic(
    candidatesByMealType,
    MEAL_SLOTS.map((s) => ({ mealType: s.mealType, targetKcal: profile.targets.kcal * s.share }))
  );

  const meals: OneDayPreviewMeal[] = selections.map((selection) => {
    const recipe = candidatesByMealType[selection.mealType].find(
      (c) => c.id === selection.recipeId
    )!;
    return { mealType: selection.mealType, ...recipe };
  });

  const totals = meals.reduce(
    (acc, meal) => ({
      kcal: acc.kcal + meal.kcal,
      proteinG: acc.proteinG + meal.proteinG,
      carbsG: acc.carbsG + meal.carbsG,
      fatG: acc.fatG + meal.fatG,
    }),
    { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 }
  );

  return { meals, totals };
}
