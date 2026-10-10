import { Hero } from "@/components/marketing/Hero";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Team } from "@/components/marketing/Team";
import { PricingTable } from "@/components/marketing/PricingTable";
import { FAQ } from "@/components/marketing/FAQ";
import { ContactForm } from "@/components/marketing/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { pricingSection, finalCta, primaryCta } from "@/content/text";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Team />
      <section id="pricing" className="bg-accent-soft/40 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold">{pricingSection.heading}</h2>
          <p className="mt-2 text-foreground-muted">{pricingSection.subheading}</p>
          <div className="mt-10 text-left">
            <PricingTable />
          </div>
        </div>
      </section>
      <FAQ />
      <ContactForm />
      <section className="bg-gradient-to-br from-primary-soft to-accent-soft py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold">{finalCta.heading}</h2>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/quiz">{primaryCta}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
