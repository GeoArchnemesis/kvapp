import { z } from "zod";

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
    questionKa: "რა არის თქვენი მთავარი მიზანი?",
    questionEn: "What is your primary goal?",
    multi: false,
    options: [
      { value: "lose_weight", labelKa: "წონის დაკლება", labelEn: "Lose weight" },
      {
        value: "maintain_habits",
        labelKa: "ჯანსაღი ჩვევების შენარჩუნება",
        labelEn: "Maintain a healthy lifestyle",
      },
      { value: "build_muscle", labelKa: "კუნთოვანი მასის მომატება", labelEn: "Build muscle / strength" },
    ],
  },
  activity_level: {
    key: "activity_level",
    questionKa: "რამდენად აქტიური ხართ ამჟამად?",
    questionEn: "How active are you currently?",
    multi: false,
    options: [
      { value: "sedentary", labelKa: "მჯდომარე ცხოვრების წესი", labelEn: "Sedentary" },
      { value: "light", labelKa: "მსუბუქი აქტივობა (კვირაში 1-3 დღე)", labelEn: "Light (1-3 days/week)" },
      {
        value: "moderate",
        labelKa: "საშუალო აქტივობა (კვირაში 3-5 დღე)",
        labelEn: "Moderate (3-5 days/week)",
      },
      {
        value: "active",
        labelKa: "აქტიური ცხოვრების წესი (კვირაში 6-7 დღე)",
        labelEn: "Active (6-7 days/week)",
      },
    ],
  },
  diet_restrictions: {
    key: "diet_restrictions",
    questionKa: "გაქვთ კვებითი პრეფერენციები ან შეზღუდვები?",
    questionEn: "Any dietary preferences or restrictions?",
    multi: true,
    options: [
      { value: "none", labelKa: "არცერთი", labelEn: "None" },
      { value: "vegetarian", labelKa: "ვეგეტარიანული", labelEn: "Vegetarian" },
      { value: "vegan", labelKa: "ვეგანური", labelEn: "Vegan" },
      { value: "gluten_free", labelKa: "გლუტენის გარეშე", labelEn: "Gluten-free" },
    ],
  },
  support_preference: {
    key: "support_preference",
    questionKa: "რა სახის მხარდაჭერა გსურთ?",
    questionEn: "What kind of support do you want?",
    multi: false,
    options: [
      {
        value: "ai_only",
        labelKa: "მხოლოდ ხელოვნური ინტელექტის რჩევები",
        labelEn: "Occasional AI guidance",
      },
      {
        value: "occasional_checkins",
        labelKa: "დროდადრო კონსულტაცია ნამდვილ ადამიანთან",
        labelEn: "Occasional check-ins with a real person",
      },
      {
        value: "regular_human_support",
        labelKa: "რეგულარული მხარდაჭერა ნამდვილი ადამიანისგან",
        labelEn: "Regular check-ins with a real person",
      },
    ],
  },
  gym_interest: {
    key: "gym_interest",
    questionKa: "სავარჯიშო დარბაზი უკვე გაქვთ, თუ გსურთ მისი დამატება პაკეტში?",
    questionEn: "Do you already have gym access, or want one included?",
    multi: false,
    options: [
      { value: "have_gym", labelKa: "დიახ, მაქვს სავარჯიშო დარბაზი", labelEn: "Yes, I already have a gym" },
      {
        value: "want_gym_included",
        labelKa: "მსურს, რომ დარბაზი ჩართული იყოს პაკეტში",
        labelEn: "I want a gym included in my plan",
      },
      {
        value: "not_interested",
        labelKa: "სავარჯიშო დარბაზი არ მაინტერესებს",
        labelEn: "Not interested in a gym",
      },
    ],
  },
  lab_interest: {
    key: "lab_interest",
    questionKa: "გაინტერესებთ ლაბორატორიული ანალიზები ფასდაკლებით ჩვენს პარტნიორ ლაბორატორიებში?",
    questionEn: "Interested in lab testing (with partner discounts)?",
    multi: false,
    options: [
      { value: "yes", labelKa: "დიახ", labelEn: "Yes" },
      { value: "no", labelKa: "არა", labelEn: "No" },
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
