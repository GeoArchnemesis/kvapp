"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { calculatorForm } from "@/content/text";

const ACTIVITY_FACTORS = [
  { value: "sedentary", label: calculatorForm.activityLabels.sedentary, factor: 1.2 },
  { value: "light", label: calculatorForm.activityLabels.light, factor: 1.375 },
  { value: "moderate", label: calculatorForm.activityLabels.moderate, factor: 1.55 },
  { value: "active", label: calculatorForm.activityLabels.active, factor: 1.725 },
] as const;

type Sex = "female" | "male";

export function BmrCalculator() {
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState(30);
  const [heightCm, setHeightCm] = useState(165);
  const [weightKg, setWeightKg] = useState(65);
  const [activity, setActivity] = useState<(typeof ACTIVITY_FACTORS)[number]["value"]>("light");

  // Mifflin-St Jeor equation
  const bmr =
    10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
  const factor = ACTIVITY_FACTORS.find((a) => a.value === activity)!.factor;
  const tdee = Math.round(bmr * factor);

  return (
    <Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          {calculatorForm.sexLabel}
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
            className="rounded-lg border border-border bg-background px-3 py-2"
          >
            <option value="female">{calculatorForm.sexFemale}</option>
            <option value="male">{calculatorForm.sexMale}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          {calculatorForm.ageLabel}
          <input
            type="number"
            min={14}
            max={100}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="rounded-lg border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          {calculatorForm.heightLabel}
          <input
            type="number"
            min={120}
            max={230}
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="rounded-lg border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          {calculatorForm.weightLabel}
          <input
            type="number"
            min={35}
            max={250}
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="rounded-lg border border-border bg-background px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
          {calculatorForm.activityLabel}
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as typeof activity)}
            className="rounded-lg border border-border bg-background px-3 py-2"
          >
            {ACTIVITY_FACTORS.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 rounded-xl bg-accent-soft p-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-foreground-muted">{calculatorForm.bmrLabel}</p>
          <p className="text-2xl font-extrabold">
            {Math.round(bmr)} {calculatorForm.calorieUnit}
          </p>
        </div>
        <div>
          <p className="text-sm text-foreground-muted">{calculatorForm.tdeeLabel}</p>
          <p className="text-2xl font-extrabold">
            {tdee} {calculatorForm.calorieUnit}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-foreground-muted">{calculatorForm.disclaimer}</p>

      <ButtonLink href="/quiz" className="mt-6">
        {calculatorForm.cta}
      </ButtonLink>
    </Card>
  );
}
