import type { Metadata } from "next";
import { BmrCalculator } from "@/components/marketing/BmrCalculator";

export const metadata: Metadata = {
  title: "კალორიების კალკულატორი — Kvapp",
  description:
    "უფასო კალკულატორი — გაიგეთ თქვენი ბაზალური ცვლის ტემპი და დღიური კალორიული საჭიროება.",
};

export default function BmrTdeeCalculatorPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">კალორიების კალკულატორი</h1>
      <p className="mt-2 text-foreground-muted">
        გაიგეთ თქვენი ბაზალური ცვლის ტემპი და რამდენი კალორია გჭირდებათ დღეში, რომ
        თქვენი ამჟამინდელი წონა შეინარჩუნოთ.
      </p>
      <div className="mt-8">
        <BmrCalculator />
      </div>
    </section>
  );
}
