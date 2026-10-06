"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

const ACTIVITY_FACTORS = [
  { value: "sedentary", label: "მჯდომარე ცხოვრების წესი (მინიმალური აქტივობა)", factor: 1.2 },
  { value: "light", label: "მსუბუქი აქტივობა (კვირაში 1-3 დღე)", factor: 1.375 },
  { value: "moderate", label: "საშუალო აქტივობა (კვირაში 3-5 დღე)", factor: 1.55 },
  { value: "active", label: "აქტიური ცხოვრების წესი (კვირაში 6-7 დღე)", factor: 1.725 },
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
          სქესი
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
            className="rounded-lg border border-border bg-background px-3 py-2"
          >
            <option value="female">მდედრობითი</option>
            <option value="male">მამრობითი</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          ასაკი
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
          სიმაღლე (სმ)
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
          წონა (კგ)
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
          აქტივობის დონე
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
          <p className="text-sm text-foreground-muted">ბაზალური ცვლის ტემპი</p>
          <p className="text-2xl font-extrabold">{Math.round(bmr)} კალორია</p>
        </div>
        <div>
          <p className="text-sm text-foreground-muted">
            დღიური კალორიული საჭიროება წონის შესანარჩუნებლად
          </p>
          <p className="text-2xl font-extrabold">{tdee} კალორია</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-foreground-muted">
        მიახლოებითი მაჩვენებელია, გამოთვლილია Mifflin-St Jeor-ის ფორმულით. არ წარმოადგენს
        სამედიცინო რეკომენდაციას.
      </p>

      <ButtonLink href="/quiz" className="mt-6">
        მიიღეთ ამაზე მორგებული გეგმა — იპოვეთ თქვენი პაკეტი
      </ButtonLink>
    </Card>
  );
}
