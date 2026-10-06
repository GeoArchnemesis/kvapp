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
};

export const TIERS: TierDisplay[] = [
  {
    code: "starter",
    id: 1,
    nameKa: "სტარტერი",
    nameEn: "Starter (AI)",
    tagline: "დამოუკიდებელი დაწყება — თუ გსურთ, ჯერ თავად სცადოთ",
    priceGel: 39,
    includes: [
      "ხელოვნური ინტელექტის მიერ შედგენილი კვირეული კვების გეგმა",
      "ქართული რეცეპტების ბაზა",
      "ავტომატურად გენერირებული სავაჭრო სია",
    ],
    cta: "ამ პაკეტის არჩევა",
  },
  {
    code: "pro",
    id: 2,
    nameKa: "პრო",
    nameEn: "Pro (Human + AI)",
    tagline: "რეკომენდებული — თუ გსურთ ნამდვილი ადამიანის მხარდაჭერა",
    priceGel: 149,
    includes: [
      "ყველაფერი „სტარტერიდან“",
      "თვეში 1 ვიდეო-კონსულტაცია სერტიფიცირებულ დიეტოლოგთან",
      "თქვენი გეგმის ინდივიდუალური კორექტირება და პროგრესის მონიტორინგი დიეტოლოგის მიერ",
    ],
    cta: "ამ პაკეტის არჩევა",
  },
  {
    code: "vip",
    id: 3,
    nameKa: "ვიპ",
    nameEn: "VIP All-Inclusive",
    tagline: "ყველაფერი ჩართულია — თუ გსურთ, რომ ყველაფერზე ჩვენ ვიზრუნოთ",
    priceGel: 550,
    includes: [
      "ყველაფერი „პროდან“",
      "Fitpass აბონემენტი სავარჯიშო დარბაზზე",
      "ფასდაკლება პარტნიორ ლაბორატორიებში",
      "პირადი მწვრთნელის ინდივიდუალური პროგრამა",
    ],
    cta: "ამ პაკეტის არჩევა",
  },
];

export function getTierByCode(code: TierCode): TierDisplay {
  const tier = TIERS.find((t) => t.code === code);
  if (!tier) throw new Error(`Unknown tier code: ${code}`);
  return tier;
}
