import type { Metadata } from "next";
import { PricingTable } from "@/components/marketing/PricingTable";
import { pricingPage } from "@/content/text";

export const metadata: Metadata = {
  title: pricingPage.metaTitle,
};

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">{pricingPage.heading}</h1>
      <p className="mt-2 text-foreground-muted">{pricingPage.subheading}</p>
      <div className="mt-8">
        <PricingTable />
      </div>
    </section>
  );
}
