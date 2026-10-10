import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { CheckIcon, SparkleIcon, ProfileIcon, CrownIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { TIERS, type TierCode } from "@/lib/domain/subscriptions/tiers";
import { tiers as tierContent, recommendedBadge } from "@/content/text";

const TIER_ICON: Record<TierCode, typeof SparkleIcon> = {
  starter: SparkleIcon,
  pro: ProfileIcon,
  vip: CrownIcon,
};

const TIER_IMAGE: Record<TierCode, string> = {
  starter: "/images/pricing-starter.jpg",
  pro: "/images/pricing-pro.jpg",
  vip: "/images/pricing-vip.jpg",
};

// The generically-recommended tier (badge + default highlighted-card
// styling) comes from TIERS config (`recommended: true`), not hardcoded
// here — see lib/domain/subscriptions/tiers.ts. This is independent of
// the `highlight` prop's *other* use on the quiz result page, which points
// at whichever tier the quiz personally recommends for that user.
const DEFAULT_HIGHLIGHT: TierCode = TIERS.find((t) => t.recommended)!.code;

export function PricingTable({
  highlight = DEFAULT_HIGHLIGHT,
  ctaHref = "/quiz",
}: {
  highlight?: TierCode;
  ctaHref?: string;
}) {
  return (
    <div className="grid items-stretch gap-6 sm:grid-cols-3">
      {TIERS.map((tier) => {
        const Icon = TIER_ICON[tier.code];
        return (
          <Card
            key={tier.code}
            className={cn(
              "flex h-full flex-col",
              tier.code === highlight && "border-accent ring-2 ring-accent/40"
            )}
          >
            {/* Everything but the CTA grows to fill the card, so cards of
                different content length still end at the same height and
                the button always lands at the bottom — see fix below. */}
            <div className="flex-1">
              <PhotoSlot
                src={TIER_IMAGE[tier.code]}
                alt={tierContent[tier.code].imageAlt}
                aspect="aspect-[16/9]"
                className="mb-5"
                icon={<Icon className="h-9 w-9 text-white/80" />}
              />
              {tier.recommended && <Badge className="mb-3">{recommendedBadge}</Badge>}
              <h3 className="whitespace-nowrap text-lg font-semibold">{tier.nameKa}</h3>
              <p className="mt-1 text-sm text-foreground-muted">{tier.tagline}</p>
              <p className="mt-4 whitespace-nowrap text-3xl font-extrabold sm:text-xl md:text-2xl lg:text-3xl">
                {tier.priceGel} ₾
                <span className="text-base font-medium text-foreground-muted sm:text-xs md:text-sm lg:text-base">
                  /თვეში
                </span>
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckIcon className="h-5 w-5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ButtonLink href={ctaHref} className="mt-6 w-full px-4 sm:px-6">
              {tier.cta}
            </ButtonLink>
          </Card>
        );
      })}
    </div>
  );
}
