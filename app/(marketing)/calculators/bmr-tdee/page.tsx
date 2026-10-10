import type { Metadata } from "next";
import { BmrCalculator } from "@/components/marketing/BmrCalculator";
import { calculatorPage } from "@/content/text";

export const metadata: Metadata = {
  title: calculatorPage.metaTitle,
  description: calculatorPage.metaDescription,
};

export default function BmrTdeeCalculatorPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">{calculatorPage.heading}</h1>
      <p className="mt-2 text-foreground-muted">{calculatorPage.subheading}</p>
      <div className="mt-8">
        <BmrCalculator />
      </div>
    </section>
  );
}
