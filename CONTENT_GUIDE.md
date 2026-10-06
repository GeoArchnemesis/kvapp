# Kvapp Georgian Content Guide

All user-facing text on Kvapp (UI copy, marketing copy, quiz questions/answers, buttons, error messages, form labels, placeholders, tooltips, notification/email templates in later phases) is written in **Georgian**, as the single displayed language for now (no live locale switcher exists yet — see Open Items below). This file is the single source of truth for tone, register, and terminology so every phase stays consistent. Read it before writing any new user-facing string.

## Register

- **Formal/polite address only** — the plural "თქვენ" form, never the informal singular "შენ". Verb forms follow accordingly (e.g. imperative "-ეთ" endings: "აირჩიეთ", "დაიწყეთ", "გააგრძელეთ").
- First-person statements ("I want...") use the more polished/literary "მსურს" rather than the blunter "მინდა" in option labels and formal copy.
- Tone: friendly and motivating, **not clinical** — this is a lifestyle/habit-building brand, not a medical service (see PRD §3 positioning). Avoid words that read as diagnostic or exam-like (e.g. avoid "ტესტი" for the onboarding flow — use "კითხვარი", quiz/questionnaire, instead).
- Professional, not casual/slangy — this is a paid service.

## Canonical terms (use exactly these, everywhere)

| Concept | Georgian term | Notes |
|---|---|---|
| Subscription tier (Starter/Pro/VIP) | **პაკეტი** | Never "გეგმა" for this — that word is reserved for the meal plan (below). Matches how Georgian telecom/subscription services refer to tiers. |
| AI-generated meal plan (the food plan itself) | **კვების გეგმა** | Distinct concept from "პაკეტი" — do not conflate the two. |
| The onboarding quiz | **კითხვარი** | Not "ტესტი" (sounds clinical/exam-like). |
| "AI" / artificial intelligence | **ხელოვნური ინტელექტი** | Spelled out in user-facing text; don't use the bare English acronym "AI". |
| Calorie | **კალორია** | |
| Protein | **ცილა** | |
| Carbohydrates | **ნახშირწყალი** (or plural ნახშირწყლები where grammatically natural) | |
| Fat (nutrition) | **ცხიმი** | |
| Breakfast / Lunch / Dinner / Snack | **საუზმე / სადილი / ვახშამი / სნექი** | See `lib/domain/recipes/mealTypeLabels.ts` |
| Dietitian | **დიეტოლოგი** (სერტიფიცირებული დიეტოლოგი = certified dietitian) | |
| Personal trainer | **პირადი მწვრთნელი** | |
| Lab test(s) | **ლაბორატორიული ანალიზები** | Not "ტესტირება" — "ანალიზი" is the natural Georgian term for a lab test (e.g. "სისხლის ანალიზი"). |
| Gym | **სავარჯიშო დარბაზი** | |
| "Find/choose your package" (primary site-wide CTA) | **„იპოვეთ თქვენი პაკეტი“** | Used identically in the nav, hero, footer, final CTA band, and calculator cross-sell. Don't invent variants. |
| "Choose this package" (per-tier pricing card CTA) | **„ამ პაკეტის არჩევა“** | One universal phrase on every pricing card, everywhere a tier is offered (homepage, `/pricing`, quiz result) — not a different verb per tier. |
| "Recommended" pricing badge | **„რეკომენდებული“** | Not a literal "most popular" translation. |
| "Continue" (form submit button) | **„გაგრძელება“** | Georgian UI buttons use the verbal-noun form, not an imperative — same pattern for any future button: "დადასტურება" (confirm), "გაგზავნა" (send), "შენახვა" (save), "გაუქმება" (cancel), etc. |

## Formatting conventions

- **Currency:** amount before the symbol, with the unit word after: `39 ₾/თვეში` (not `₾39/month`).
- **Quotation marks:** Georgian typographic quotes „ " (U+201E / U+201C) when naming a tier or product inline in prose, e.g. `ყველაფერი „სტარტერიდან“`.
- **Loanwords:** prefer the native Georgian term wherever one is established and commonly used (e.g. კალორია, ცილა, ლაბორატორიული ანალიზები). Where no natural Georgian term exists and an international loanword is already the common usage (e.g. "სმუზი-ბოული", certification acronyms like ISSA/NASM, brand names like Fitpass), keep the loanword — don't force an awkward invented translation.
- **Brand name "Kvapp"** stays in Latin script everywhere (not transliterated).

## Data model note

`nameEn`/`labelEn`/`questionEn` fields still exist in the data layer (`lib/domain/quiz/config.ts`, `lib/domain/subscriptions/tiers.ts`, recipes) for a possible future locale switcher (PRD §6 mentions ka/en/ru), but **nothing in the UI currently renders them** — only the `*Ka` fields are displayed. When English/Russian locales are actually built, route through a real i18n layer rather than showing both languages stacked on screen.

## Open items

- No live locale switcher yet (Phase 2+). When it's built, the `*En`/`*Ru` fields need the same quality bar as this guide, and this file should be extended with their own register/terminology rules.
- Transactional notification templates (WhatsApp/Mailgun, PRD §5.4) don't exist in code yet — when they're written, they must follow this same register and terminology table (e.g. "პაკეტი" for tier, formal address, "კონსულტაცია" for bookings).
