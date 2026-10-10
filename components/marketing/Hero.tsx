import { ButtonLink } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { hero, primaryCta } from "@/content/text";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:grid-cols-2 sm:items-center sm:py-24">
      <div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">{hero.headline}</h1>
        <p className="mt-6 max-w-md text-lg text-foreground-muted">{hero.body}</p>
        <div className="mt-8 flex flex-col items-start gap-2">
          <ButtonLink href="/quiz">{primaryCta}</ButtonLink>
        </div>
      </div>
      <div className="relative">
        <PhotoSlot
          src="/images/hero-meal.jpg"
          alt={hero.imageAlt}
          aspect="aspect-[4/5]"
          className="shadow-[var(--shadow-card)]"
          sizes="(min-width: 640px) 480px, 100vw"
          priority
        />
        <div className="absolute -bottom-6 -left-6 rounded-2xl bg-surface p-5 shadow-[var(--shadow-card)] sm:-left-10">
          <ProgressRing percent={62} color="var(--primary)" size={120} strokeWidth={10}>
            <div className="text-center">
              <p className="text-xl font-extrabold">545</p>
              <p className="text-[10px] text-foreground-muted">{hero.ringCalorieLabel}</p>
            </div>
          </ProgressRing>
          <div className="mt-3 flex justify-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-macro-protein" /> {hero.macroProtein}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-macro-carbs" /> {hero.macroCarbs}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-macro-fat" /> {hero.macroFat}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
