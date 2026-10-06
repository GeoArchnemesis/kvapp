import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckIcon } from "@/components/icons";
import { TIERS, type TierCode } from "@/lib/domain/subscriptions/tiers";

export function PricingTable({
  highlight = "pro",
  ctaHref = "/quiz",
}: {
  highlight?: TierCode;
  ctaHref?: string;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {TIERS.map((tier) => (
        <Card
          key={tier.code}
          className={
            tier.code === highlight ? "border-accent ring-2 ring-accent/40" : undefined
          }
        >
          {tier.code === highlight && <Badge className="mb-3">რეკომენდებული</Badge>}
          <h3 className="text-lg font-semibold">{tier.nameKa}</h3>
          <p className="mt-1 text-sm text-foreground-muted">{tier.tagline}</p>
          <p className="mt-4 text-3xl font-extrabold">
            {tier.priceGel} ₾
            <span className="text-base font-medium text-foreground-muted">/თვეში</span>
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {tier.includes.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckIcon className="h-5 w-5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
          >
            {tier.cta}
          </Link>
        </Card>
      ))}
    </div>
  );
}
