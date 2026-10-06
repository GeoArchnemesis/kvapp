import { ButtonLink } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:grid-cols-2 sm:items-center sm:py-24">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          თქვენი ჯანსაღი ცხოვრება იწყება სწორედ აქ.
        </h1>
        <p className="mt-5 max-w-md text-lg text-foreground-muted">
          ხელოვნური ინტელექტის მიერ შედგენილი კვების გეგმა, ნამდვილი ქართველი
          დიეტოლოგები და სავარჯიშო დარბაზი — ყველაფერი ერთად, თქვენზე
          მორგებული, სულ რაღაც 2 წუთში.
        </p>
        <div className="mt-8 flex flex-col items-start gap-2">
          <ButtonLink href="/quiz">იპოვეთ თქვენი პაკეტი</ButtonLink>
          <p className="text-sm text-foreground-muted">
            თვეში 39 ₾-დან · გაუქმება შესაძლებელია ნებისმიერ დროს
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative rounded-[2rem] bg-accent-soft p-8">
          <ProgressRing percent={62} color="var(--primary)" size={180} strokeWidth={14}>
            <div className="text-center">
              <p className="text-3xl font-extrabold">545</p>
              <p className="text-xs text-foreground-muted">კალორია</p>
            </div>
          </ProgressRing>
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-macro-protein" /> ცილა
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-macro-carbs" /> ნახშირწყალი
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-macro-fat" /> ცხიმი
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
