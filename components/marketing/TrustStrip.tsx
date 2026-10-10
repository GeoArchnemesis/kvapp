import { StarIcon, ShieldIcon, TagIcon } from "@/components/icons";
import { trustStrip } from "@/content/text";

const ICONS = [StarIcon, ShieldIcon, TagIcon];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 text-sm font-medium text-foreground-muted sm:flex-row sm:justify-between">
        {trustStrip.map((label, i) => {
          const Icon = ICONS[i];
          return (
            <p key={label} className="flex items-center gap-2">
              <Icon className="h-5 w-5 shrink-0 text-accent" />
              {label}
            </p>
          );
        })}
      </div>
    </section>
  );
}
