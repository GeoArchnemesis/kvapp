import type { Metadata } from "next";
import { PricingTable } from "@/components/marketing/PricingTable";

export const metadata: Metadata = {
  title: "ფასები — Kvapp",
};

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">ფასები</h1>
      <p className="mt-2 text-foreground-muted">
        ერთი სერვისი. სამი გზა დასაწყებად. გაუქმება შესაძლებელია ნებისმიერ დროს.
      </p>
      <div className="mt-8">
        <PricingTable />
      </div>
    </section>
  );
}
