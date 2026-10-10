import { Card } from "@/components/ui/Card";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SearchIcon, RecipesIcon, ProfileIcon } from "@/components/icons";
import { howItWorks } from "@/content/text";

const ICONS = [SearchIcon, RecipesIcon, ProfileIcon];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-bold">{howItWorks.heading}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {howItWorks.steps.map(({ image, alt, title, body }, i) => {
            const Icon = ICONS[i];
            return (
              <Card key={title} className="flex flex-col">
                <PhotoSlot
                  src={image}
                  alt={alt}
                  aspect="aspect-[16/10]"
                  className="mb-5"
                  icon={<Icon className="h-8 w-8 text-white/80" />}
                />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-foreground-muted">{body}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
