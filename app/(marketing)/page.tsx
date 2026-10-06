import { Hero } from "@/components/marketing/Hero";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Team } from "@/components/marketing/Team";
import { PricingTable } from "@/components/marketing/PricingTable";
import { FAQ } from "@/components/marketing/FAQ";
import { ButtonLink } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Team />
      <section id="pricing" className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold">ერთი სერვისი. სამი გზა დასაწყებად.</h2>
        <p className="mt-1 text-foreground-muted">
          გამჭვირვალე ფასები ლარში — ყველაფერი წინასწარ ცხადია.
        </p>
        <div className="mt-8">
          <PricingTable />
        </div>
      </section>
      <FAQ />
      <section className="mx-auto max-w-5xl px-4 pb-20 text-center">
        <h2 className="text-2xl font-bold">მზად ხართ დაიწყოთ?</h2>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/quiz">იპოვეთ თქვენი პაკეტი</ButtonLink>
        </div>
      </section>
    </>
  );
}
