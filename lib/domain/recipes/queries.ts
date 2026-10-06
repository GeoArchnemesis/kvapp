import "server-only";
import { and, eq, arrayContains } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { recipes } from "@/lib/db/schema";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export async function getCandidateRecipes(params: {
  mealType: MealType;
  dietRestrictions: string[];
}) {
  const conditions = [eq(recipes.mealType, params.mealType), eq(recipes.isPublished, true)];

  const restrictions = params.dietRestrictions.filter((r) => r !== "none");

  if (restrictions.includes("vegan")) {
    conditions.push(arrayContains(recipes.tags, ["vegan"]));
  } else if (restrictions.includes("vegetarian")) {
    conditions.push(arrayContains(recipes.tags, ["vegetarian"]));
  }

  if (restrictions.includes("gluten_free")) {
    conditions.push(arrayContains(recipes.tags, ["gluten_free"]));
  }

  return db
    .select()
    .from(recipes)
    .where(and(...conditions));
}
