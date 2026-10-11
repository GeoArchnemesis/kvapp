import { tiers as tierContent } from "@/content/text";

export type TierCode = "starter" | "pro" | "vip";

export type TierDisplay = {
  code: TierCode;
  id: 1 | 2 | 3;
  nameKa: string;
  nameEn: string;
  tagline: string;
  priceGel: number;
  includes: string[];
  cta: string;
  /** Drives both the "რეკომენდირებული" badge and the highlighted-card
   * styling on the pricing cards (homepage, /pricing, quiz result) —
   * exactly one tier should have this set. See PricingTable.tsx. */
  recommended: boolean;
};

export const TIERS: TierDisplay[] = [
  {
    code: "starter",
    id: 1,
    nameEn: "Starter (AI)",
    priceGel: 39,
    nameKa: tierContent.starter.nameKa,
    tagline: tierContent.starter.tagline,
    includes: tierContent.starter.includes,
    cta: tierContent.starter.cta,
    recommended: false,
  },
  {
    code: "pro",
    id: 2,
    nameEn: "Pro (Human + AI)",
    priceGel: 149,
    nameKa: tierContent.pro.nameKa,
    tagline: tierContent.pro.tagline,
    includes: tierContent.pro.includes,
    cta: tierContent.pro.cta,
    recommended: true,
  },
  {
    code: "vip",
    id: 3,
    nameEn: "VIP All-Inclusive",
    priceGel: 550,
    nameKa: tierContent.vip.nameKa,
    tagline: tierContent.vip.tagline,
    includes: tierContent.vip.includes,
    cta: tierContent.vip.cta,
    recommended: false,
  },
];

export function getTierByCode(code: TierCode): TierDisplay {
  const tier = TIERS.find((t) => t.code === code);
  if (!tier) throw new Error(`Unknown tier code: ${code}`);
  return tier;
}
