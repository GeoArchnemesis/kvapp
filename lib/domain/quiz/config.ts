import { z } from "zod";
import { steps as stepContent } from "@/content/text";

export const STEP_ORDER = [
  "goal",
  "activity_level",
  "diet_restrictions",
  "support_preference",
  "gym_interest",
  "lab_interest",
] as const;

export type StepKey = (typeof STEP_ORDER)[number];

export type StepOption = { value: string; labelKa: string; labelEn: string };

export type StepConfig = {
  key: StepKey;
  questionKa: string;
  questionEn: string;
  multi: boolean;
  options: StepOption[];
};

export const STEPS: Record<StepKey, StepConfig> = {
  goal: {
    key: "goal",
    questionKa: stepContent.goal.question,
    questionEn: "What is your primary goal?",
    multi: false,
    options: [
      { value: "lose_weight", labelKa: stepContent.goal.options.lose_weight, labelEn: "Lose weight" },
      {
        value: "maintain_habits",
        labelKa: stepContent.goal.options.maintain_habits,
        labelEn: "Maintain a healthy lifestyle",
      },
      {
        value: "build_muscle",
        labelKa: stepContent.goal.options.build_muscle,
        labelEn: "Build muscle / strength",
      },
    ],
  },
  activity_level: {
    key: "activity_level",
    questionKa: stepContent.activity_level.question,
    questionEn: "How active are you currently?",
    multi: false,
    options: [
      { value: "sedentary", labelKa: stepContent.activity_level.options.sedentary, labelEn: "Sedentary" },
      {
        value: "light",
        labelKa: stepContent.activity_level.options.light,
        labelEn: "Light (1-3 days/week)",
      },
      {
        value: "moderate",
        labelKa: stepContent.activity_level.options.moderate,
        labelEn: "Moderate (3-5 days/week)",
      },
      {
        value: "active",
        labelKa: stepContent.activity_level.options.active,
        labelEn: "Active (6-7 days/week)",
      },
    ],
  },
  diet_restrictions: {
    key: "diet_restrictions",
    questionKa: stepContent.diet_restrictions.question,
    questionEn: "Any dietary preferences or restrictions?",
    multi: true,
    options: [
      { value: "none", labelKa: stepContent.diet_restrictions.options.none, labelEn: "None" },
      {
        value: "vegetarian",
        labelKa: stepContent.diet_restrictions.options.vegetarian,
        labelEn: "Vegetarian",
      },
      { value: "vegan", labelKa: stepContent.diet_restrictions.options.vegan, labelEn: "Vegan" },
      {
        value: "gluten_free",
        labelKa: stepContent.diet_restrictions.options.gluten_free,
        labelEn: "Gluten-free",
      },
    ],
  },
  support_preference: {
    key: "support_preference",
    questionKa: stepContent.support_preference.question,
    questionEn: "What kind of support do you want?",
    multi: false,
    options: [
      {
        value: "ai_only",
        labelKa: stepContent.support_preference.options.ai_only,
        labelEn: "Occasional AI guidance",
      },
      {
        value: "occasional_checkins",
        labelKa: stepContent.support_preference.options.occasional_checkins,
        labelEn: "Occasional check-ins with a real person",
      },
      {
        value: "regular_human_support",
        labelKa: stepContent.support_preference.options.regular_human_support,
        labelEn: "Regular check-ins with a real person",
      },
    ],
  },
  gym_interest: {
    key: "gym_interest",
    questionKa: stepContent.gym_interest.question,
    questionEn: "Do you already have gym access, or want one included?",
    multi: false,
    options: [
      {
        value: "have_gym",
        labelKa: stepContent.gym_interest.options.have_gym,
        labelEn: "Yes, I already have a gym",
      },
      {
        value: "want_gym_included",
        labelKa: stepContent.gym_interest.options.want_gym_included,
        labelEn: "I want a gym included in my plan",
      },
      {
        value: "not_interested",
        labelKa: stepContent.gym_interest.options.not_interested,
        labelEn: "Not interested in a gym",
      },
    ],
  },
  lab_interest: {
    key: "lab_interest",
    questionKa: stepContent.lab_interest.question,
    questionEn: "Interested in lab testing (with partner discounts)?",
    multi: false,
    options: [
      { value: "yes", labelKa: stepContent.lab_interest.options.yes, labelEn: "Yes" },
      { value: "no", labelKa: stepContent.lab_interest.options.no, labelEn: "No" },
    ],
  },
};

export function stepIndex(step: StepKey): number {
  return STEP_ORDER.indexOf(step);
}

export function nextStep(step: StepKey): StepKey | "result" {
  const idx = stepIndex(step);
  return idx === STEP_ORDER.length - 1 ? "result" : STEP_ORDER[idx + 1];
}

// ---------- Validation ----------
const singleValueSchema = z.string().min(1);
const multiValueSchema = z.array(z.string().min(1)).min(1);

export function answerSchemaFor(step: StepKey) {
  return STEPS[step].multi ? multiValueSchema : singleValueSchema;
}

export type GoalValue = "lose_weight" | "maintain_habits" | "build_muscle";
export type ActivityLevelValue = "sedentary" | "light" | "moderate" | "active";
export type SupportPreferenceValue = "ai_only" | "occasional_checkins" | "regular_human_support";
export type GymInterestValue = "have_gym" | "want_gym_included" | "not_interested";
export type LabInterestValue = "yes" | "no";

export type QuizAnswers = {
  goal: GoalValue;
  activity_level: ActivityLevelValue;
  diet_restrictions: string[];
  support_preference: SupportPreferenceValue;
  gym_interest: GymInterestValue;
  lab_interest: LabInterestValue;
};
