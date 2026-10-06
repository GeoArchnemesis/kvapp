# Kvapp — Product Requirements Document

**Product:** Kvapp — AI + human nutrition and wellness subscription platform
**Market:** Georgia (primary language: Georgian, secondary: English/Russian)
**Author context:** Based on `Research/compass_artifact_wf-384c1290-2a26-526b-be85-400740f15f02_text_markdown.md` (8-platform competitive teardown) and `Research/pattern_analysis.md` (6 cross-platform patterns), aligned to the visual references `Font.webp`, `Icons.webp`, and the `original-*.webp` screenshots.
**Status:** Draft v1

---

## 0. Technical Context (fixed constraints)

| Area | Decision |
|---|---|
| Timezone | Asia/Tbilisi (GET, UTC+4) — all scheduling, billing cycles, and "day resets" (e.g., daily macro ring, quiz save state) use this timezone regardless of visitor's device locale |
| Currency | Georgian Lari (₾ / GEL). All prices displayed with the ₾ symbol, no decimal places for whole-number tiers (e.g., "₾39", not "₾39.00") |
| Frontend/Backend | Next.js (App Router) |
| Database | Neon (serverless PostgreSQL) |
| Deployment | Railway |
| Payments | Local Georgian payment gateway (e.g., TBC/BOG e-commerce API or similar PSP), supporting tokenized recurring monthly billing and card-on-file for upgrades/downgrades |
| Messaging | n8n workflow automation → WhatsApp Business API for booking confirmations, plan-ready alerts, renewal reminders |
| Transactional email | Mailgun — welcome email, receipt, booking confirmation, password reset, dunning/failed-payment emails |
| Core surfaces | Marketing site (public), Onboarding Quiz, User Dashboard (authenticated app), Consultation booking system, Admin/ops panel (lightweight, for dietitians/coaches and support staff) |

---

## 1. What

Kvapp is a tiered, subscription-based nutrition and wellness platform for people in Georgia. It combines an AI-generated meal-planning engine, a local Georgian recipe database, and — at higher tiers — real human dietitians, personal trainers, and partner fitness/lab benefits, into one recurring monthly product sold in GEL.

Concretely, Kvapp is:
- A **quiz-driven onboarding funnel** that converts a visitor into a personalized meal plan and a recommended subscription tier in under 2–3 minutes (Pattern 1: quiz-first funnel).
- A **habit-building app**, not a medical or diagnostic tool: daily meal plans, macro/calorie tracking, a Georgian recipe library, and an automated grocery list.
- A **human escalation path**: from AI-only guidance (Starter), to a named certified dietitian doing monthly 1:1 consultations (Pro), to a fully bundled lifestyle membership with a personal trainer, Fitpass gym access, and discounted lab testing (VIP).
- A **locally-adapted product**: Georgian-language UI and recipes, GEL pricing shown openly (unlike BetterMe/Simple, which hide pricing — Pattern 3/Finding #3 in the research), Tbilisi-timezone scheduling, and WhatsApp as the primary notification channel (the regional norm, per Eat For Fit/GoodFood in the research).

This directly fills the gap the research identifies: **no global platform (Noom, Future, ZOE, Levels, WeightWatchers, Simple, BetterMe) and no Georgian platform (Eat For Fit, GoodFood) bundles AI + human dietitian + gym + lab discounts + personal trainer into one locally-priced product.** Future ($199/mo) sells remote training only; Levels' top tier ($110.75/mo) sells labs + nutritionist but no physical gym or trainer; Georgian competitors sell meal delivery with no coaching layer at all. Kvapp's VIP tier is the first to combine all of these.

---

## 2. Who It Is For

**Primary audience:** Adults living in Georgia (Tbilisi-first, expandable to Batumi/Kutaisi) who want to eat healthily, manage their weight, and build sustainable habits — not people seeking clinical treatment for a diagnosed condition.

Three audience segments map directly to the three pricing tiers:

| Segment | Profile | Maps to |
|---|---|---|
| **Self-starters** | Comfortable with apps, price-sensitive, want structure without commitment to a human coach. Equivalent to the users Simple and Levels' entry tier capture globally. | Starter (₾39) |
| **Guided strivers** | Have tried self-directed apps/diets before and plateaued or lost motivation; want real accountability from a qualified person but can't justify ₾500+/mo. Equivalent to Noom/WeightWatchers Core+ users. | Pro (₾149) |
| **Committed investors** | Want a fully managed lifestyle change: coaching + training + gym + labs in one bill, no juggling separate subscriptions (gym membership ~₾160–225/mo alone in Tbilisi, per the research). Equivalent to Future/Levels Complete users, but underserved locally. | VIP (₾550) |

**Explicitly not the audience:** people seeking GLP-1/medication-based weight loss (Noom Med, WW Med+) or clinical diagnosis/treatment of a medical condition. This is an intentional exclusion — see Positioning below.

---

## 3. Positioning

### Should Kvapp position as a premium lifestyle/wellness service (habit-building) rather than clinical/medical?

**Yes — this is a deliberate and research-backed choice.** The teardown's Finding #4 and Recommendation #6 both flag that Noom and WeightWatchers are moving aggressively into GLP-1/medical territory (WW's clinical subscribers grew 55.7% YoY to 197K in Q2 2026), which leaves the **non-clinical lifestyle space more open** for a focused entrant. Positioning Kvapp as clinical would also require medical licensing, liability, and regulatory overhead disproportionate to a Georgian market entrant. Pattern 5 (lifestyle tone) and Pattern 3 (trust via credentials, not diagnosis) both point the same direction: sell transformation and consistency, back it with qualified-professional credentials, but keep the product framed as **wellness insight and coaching, not medical treatment** — mirroring how ZOE and Levels both carry explicit "wellness-only, not a clinical trial" disclaimers even while using lab data.

**Positioning statement:**
> Kvapp is the premium lifestyle and habit-building platform for Georgians who want to eat better and feel better — combining AI guidance, real certified dietitians, and (at the top tier) a trainer and gym access, without presenting itself as medical treatment.

**Brand tone implications (Pattern 5):**
- Warm, encouraging, identity-driven copy — not clinical/sterile. Avoid words like "diagnosis," "treatment," "patient." Prefer "plan," "coach," "habit," "progress."
- Consider a light mascot/companion voice for the AI layer (as Simple's "Blinky"/"Coach Avo" does) to make the AI feel like a companion rather than a tracking tool — e.g., a named AI assistant persona for Kvapp, introduced in onboarding and reused in notifications ("Your plan for tomorrow is ready 🍲").
- All outcome claims (weight lost, consistency %) must carry a disclaimer similar to Levels/Noom's footnotes: self-reported/retrospective, not a clinical trial.

### Primary hero promise (homepage)

Per Pattern 1 and Recommendation #1 of the research (short emotional headline + one-line benefit subhead + single quiz CTA with price microcopy), and adapted to the Georgian market and 3-tier structure:

> **Headline:** "შენი ჯანსაღი ცხოვრება იწყება აქ." / *"Your healthier life starts here."*
> **Subheadline:** "AI-powered meal plans, real Georgian dietitians, and your gym — matched to you in 2 minutes."
> **Primary CTA button:** **"იპოვე ჩემი გეგმა"** / **"Find My Plan"** → routes directly into the Onboarding Quiz (never to the pricing table or a signup form, per Pattern 1).
> **Microcopy under the button** (Future-style price anchor): "From ₾39/month. Cancel anytime."

Secondary CTA (for users who want to skip the quiz, lower in the hero or in the nav): "See plans" → anchors to the pricing section, not a separate page, so the quiz remains the dominant conversion path.

### Trust & proof strategy (Patterns 3 & 4)

Because Kvapp is a new, unknown brand, it must compensate with visible credentials and quantified proof from day one:
- **Credentials, not just claims:** every dietitian and trainer profile shown with their certification (e.g., clinical nutrition diploma, ISSA/NASM-equivalent certification), mirroring BetterMe's coach cards and Future's coach bio directory.
- **Open pricing** (unlike BetterMe/Simple/Noom, which hide prices behind the quiz) — Kvapp shows all three tiers and GEL prices directly on the homepage and inside the quiz result screen, building trust as a new entrant (Finding #3).
- **Quantified proof as it accumulates:** once live, replace generic testimonials with numbered outcomes and tenure badges ("-6 kg in 10 weeks," "Member for 4 months") — structure the testimonial data model to capture these numbers from day one so they're ready to surface in marketing (Pattern 4).
- **Data-privacy trust strip:** given Kvapp will hold health-adjacent data (weight, meals, possibly lab results at VIP tier), include a Levels-style trust strip ("Encrypted · Private · Your data is never sold") near the hero or pricing section even before formal compliance certification is pursued.

---

## 4. Sections

### 4.1 Marketing Site (public, unauthenticated)

Homepage order (per Recommendation #4 of the research, adapted):

1. **Nav:** Logo · How it works · Pricing · For Dietitians (recruiting page) · Login · primary CTA button ("Find My Plan")
2. **Hero** — headline/subhead/CTA as specified in Section 3, with a clean dashboard-style product visual (macro ring, meal card) per the chosen Clean & Minimal direction, rather than raw food photography.
3. **Trust strip** — member count (once available), average rating, "Private & secure" line, certified-dietitian badge.
4. **Problem framing** — short section: "Generic diets don't fit your life" / "Fad diets. Confusing apps. No one who actually knows you." (sets up Kvapp as the fix).
5. **How it works (3 steps)** — "1. Take the 2-minute quiz → 2. Get your AI plan & local recipes → 3. Add a real dietitian or trainer anytime."
6. **Product feature carousel** — real UI screenshots (dashboard, recipe card, grocery list) in the clean/minimal visual style, mirroring Future/Levels/Simple's app-screenshot sections.
7. **Meet the team** (Pro/VIP differentiator) — dietitian and trainer bios with certifications and specialties, filterable like Future's coach directory (goal, language — Georgian/English/Russian, specialty).
8. **Outcomes & testimonials** — quantified, tenure-stamped (Pattern 4), with a visible disclaimer ("Individual results vary; not a clinical claim").
9. **Pricing — 3-tier comparison table** (see Section 4.1.1 below) — full detail, GEL pricing, "Great if you want…" line per tier (WeightWatchers-style), each CTA routes to the quiz, not directly to checkout (quiz recommends a tier, pre-selected on the result screen, but user can override).
10. **Free lead magnets** (Pattern 6) — embedded free tools: BMR/TDEE/calorie calculator, "What's my daily protein target?" calculator, and a short blog/recipe index (SEO content, e.g., "მენიუ კვირაში" weekly menu ideas) — all routing back to the quiz CTA.
11. **FAQ** — billing, cancellation, what's included per tier, how booking works, data privacy.
12. **Final CTA band** — repeat hero promise + button.
13. **Footer** — legal (ToS, Privacy, Refund Policy — important given recurring billing), social links, contact/WhatsApp link, language switcher (KA/EN/RU).

#### 4.1.1 Pricing section — 3-tier structure

Presented as three cards, Levels-style (concrete quantities per tier, not vague "features"), with the middle tier marked "Most popular":

| | **Starter (AI)** | **Pro (Human + AI)** | **VIP All-Inclusive** |
|---|---|---|---|
| **Price** | **₾39/month** | **₾149/month** | **₾550/month** |
| **Tagline** | "Flexible path" — great if you want to try it yourself | "Recommended" — great if you want real accountability | "Highest-touch" — great if you want it all managed for you |
| **Includes** | AI-generated meal plan · Georgian recipe database · automated grocery shopping list | Everything in Starter **+** 1-on-1 monthly online consultation with a certified dietitian · manual plan adjustments & progress tracking by your dietitian | Everything in Pro **+** Fitpass subscription · partner lab test discounts · 1-on-1 personal trainer program |
| **CTA** | "Start with AI" | "Get My Dietitian" | "Go All-In" |

Design notes for this section:
- Each card states **exact quantities**, not generic bullet language — e.g., "1 dietitian video call / month," not "dietitian support" — per the research's explicit callout that Levels' specificity ("2 labs, 2 months of CGM, a 50-minute session") is what to copy.
- Prices shown in GEL only (no USD conversion needed — local market).
- An "Available to add-on" micro-line under each card for upsells (e.g., extra consultations, one-off lab test booking) — matches ZOE's model of selling the lab test as an add-on rather than bundling it into every tier.
- The quiz result screen reuses this exact card component with one tier pre-highlighted based on quiz answers.

### 4.2 Onboarding Quiz

A 5–7 step flow (per Recommendation #2), Tbilisi-timezone aware for any "when can we reach you" scheduling step:

1. **Goal** — lose weight / maintain & build habits / build muscle (mirrors Eat For Fit's step 1 exactly — proven locally).
2. **Current habits / activity level.**
3. **Dietary preferences & restrictions** (vegetarian, halal/kosher if relevant, allergies) — feeds the Georgian recipe database filter.
4. **Schedule & support preference** — "Do you want occasional AI guidance, or regular check-ins with a real person?" (this answer primarily drives the tier recommendation).
5. **Gym access / interest** — "Do you already have a gym, or want one included?" (drives VIP recommendation + Fitpass messaging).
6. **Optional: "Interested in lab testing?"** toggle (drives VIP messaging around partner lab discounts).
7. **Result screen** — recommended tier card (reusing the pricing component), sample 1-day meal preview generated from their answers (a concrete, personalized teaser — not just a generic result), and the primary CTA to subscribe.

No paywall mid-quiz; price is visible throughout (per Finding #3 — avoid BetterMe/Simple's opaque-pricing criticism).

### 4.3 User Dashboard (authenticated app)

Following the clean/minimal dashboard reference screenshot directly:

- **Today view** — macro/calorie ring (protein/carbs/fat, kcal remaining), today's planned meals as cards, quick-log button (+).
- **Meal Journal** — logged meals history, swipeable/scrollable by day.
- **Recipes** — browsable Georgian recipe database, filterable by tag (vegan, vegetarian, low-calorie, high-protein, breakfast/lunch/dinner), each recipe detail shows kcal + macro rings, prep time, servings, ingredients, instructions (mirrors the recipe-detail screenshot).
- **Grocery List** — auto-generated from the current week's plan, grouped by category, checkable items.
- **Coaching** (Pro/VIP only) — booking calendar for dietitian/trainer consultations, message thread with assigned dietitian, progress notes from the dietitian visible to the user.
- **Fitpass & Labs** (VIP only) — Fitpass access status/QR or code, partner lab list with discount codes/booking links.
- **Account & Billing** — current tier, upgrade/downgrade, payment method, invoice history, cancellation flow.
- **Notification preferences** — WhatsApp opt-in/out, email preferences.

### 4.4 Consultation Booking System (Pro & VIP)

- Dietitian/trainer availability calendar (Tbilisi timezone, GET/UTC+4 fixed), bookable in fixed slot lengths (e.g., 30/45 min).
- Booking confirmation triggers both a Mailgun email and an n8n-routed WhatsApp message.
- Reminder messages (WhatsApp) sent a fixed interval before the appointment (e.g., 24h and 1h prior).
- Reschedule/cancel flow with a minimum-notice policy.
- Dietitian-side lightweight view: their upcoming bookings, client profile (goals, dietary restrictions, plan history) — part of the admin/ops panel, not the consumer dashboard.

### 4.5 Admin / Ops Panel (internal, lightweight)

- Dietitian/trainer roster management (profile, bio, certifications, specialties, availability).
- Subscriber list with tier, billing status, and churn-risk flags (e.g., failed payment, no login in 14 days).
- Manual override tools for support (pause subscription, apply discount code, resend welcome email).

---

## 5. Functions

### 5.1 Core product functions
- **AI meal-plan generator** — produces a personalized weekly meal plan from quiz answers + ongoing preferences, drawing from the Georgian recipe database; regenerates/adjusts on request.
- **Georgian recipe database** — structured recipe records (ingredients, macros, kcal, prep time, tags, language: Georgian primary) seeded at launch and expandable by the Kvapp team/dietitians.
- **Automated grocery shopping list** — derived from the active week's meal plan, aggregated by ingredient, with category grouping; regenerates when the plan changes.
- **Macro/calorie tracking & journal** — manual log + plan-linked auto-log, daily ring visualization matching the dashboard reference.
- **Dietitian plan adjustment tools** (Pro/VIP) — dietitians can directly edit a client's active plan and leave tracking notes visible to the client.
- **Personal trainer program delivery** (VIP) — structured training plan/schedule tied to the trainer relationship (can reuse the same plan-adjustment mechanism as dietitians, scoped to training content).

### 5.2 Onboarding & conversion functions
- **Multi-step Onboarding Quiz engine** — stateful, resumable (saves progress against a session/user), timezone-aware for any scheduling questions, outputs a structured profile used both for the meal-plan generator and the tier recommendation logic.
- **Tier recommendation logic** — deterministic rules engine (not black-box) mapping quiz answers (support-preference, gym interest, lab interest) to a recommended tier, fully overridable by the user on the result screen.
- **Free calculators (lead magnets)** — BMR/TDEE/calorie/macro calculators as standalone, no-login tools, each ending in a CTA into the full quiz (Pattern 6).

### 5.3 Commerce & billing functions
- **Georgian payment gateway integration** — card tokenization, recurring monthly charge on signup-anniversary date (Tbilisi-timezone billing day), upgrade/downgrade proration, failed-payment retry/dunning flow.
- **Subscription state management** — active/paused/canceled/past-due states; downgrade/upgrade takes effect per a defined policy (e.g., immediate upgrade, end-of-cycle downgrade).
- **Invoice/receipt generation** — triggers Mailgun email on each successful charge.

### 5.4 Communication functions
- **n8n → WhatsApp automation** — booking confirmations, reminders, "your weekly plan & grocery list are ready," renewal/failed-payment nudges. n8n acts as the orchestration layer between Kvapp's backend events and the WhatsApp Business API.
- **Mailgun transactional email** — welcome/onboarding sequence, receipts, password reset, booking confirmations (as a fallback/parallel channel to WhatsApp), win-back/cancellation-confirmation emails.
- **In-app notification preferences** — user-level toggle for WhatsApp vs. email vs. both.

### 5.5 Booking functions
- **Dietitian/trainer availability & scheduling** — calendar logic in Tbilisi time, slot locking to prevent double-booking, reschedule/cancel with notice-period rules.
- **Booking-to-notification pipeline** — every booking event (created/changed/canceled/reminder-due) emits an event consumed by the n8n/Mailgun integrations.

### 5.6 Data & account functions
- **User authentication & profile** — standard auth (email/password or OTP via WhatsApp/email), profile with dietary preferences, goals, and (VIP) linked lab results.
- **Role-based access** — consumer, dietitian/trainer, admin/ops, each with scoped dashboard views.
- **Data privacy controls** — given health-adjacent data, clear user-facing statement + control to export/delete personal data.

---

## 6. Design Preferences

**Chosen direction: Clean & Minimal** (confirmed), matching the dashboard/app mockup and the flat muted icon set rather than the organic (GreenBite) or bold/playful (BiteBox) references. The marketing site mirrors the product UI for one consistent brand from ad to app — a deliberate choice to make Kvapp feel like a premium, data-forward health product rather than a food-delivery brand.

### Typography
- **Inter** (per `Font.webp`), used across marketing site and product UI.
- Weight usage: Bold/Extra Bold for headlines and the hero promise; Semi Bold for section headers and card titles; Regular/Medium for body copy and UI labels.
- Keep headline copy short (per Pattern 5/Recommendation #1) — Inter's geometric, screen-optimized letterforms support large, confident headline type at 1–2 lines max.

### Color palette
- **Base:** off-white/near-white background (not stark white) for the marketing site and dashboard background.
- **Accent:** soft lavender-pink (as in the dashboard mockup's macro-ring and card accents) as the primary brand accent, used for primary CTAs, progress rings, and active states.
- **Text:** charcoal (not pure black) for body copy, matching the soft, premium feel of the reference dashboard.
- **Semantic colors** for macro rings only (protein/carbs/fat), kept distinct from the brand accent so nutrition data is instantly scannable (as in the reference screenshot's multi-color rings).
- Avoid the saturated yellow/orange/green block-color approach (BiteBox) and the forest-green/cream organic palette (GreenBite) as primary brand colors — reserve any green use for small "healthy/organic" tags only, if at all.

### Iconography
- **Flat, solid, muted icon set** (per `Icons.webp`) — single-color (muted blue-grey or brand-accent-tinted), consistent stroke/fill weight, used throughout the dashboard nav (home, recipes, profile, bookmarks/favorites, search, notifications, tags/categories, history, grid/menu, chat, bookmark).
- No line-art/outline icons and no skeuomorphic/3D icons (ruling out BiteBox's illustrated 3D food icons) — icon style must stay consistent between marketing-site feature callouts and the in-app navigation.

### Layout & components
- **Card-based layout** throughout — meal cards, recipe cards, pricing-tier cards, dietitian/trainer bio cards — all sharing one rounded-corner, soft-shadow card component.
- **Rounded corners** on cards, buttons, and input fields (matching the dashboard mockup's phone-frame and card radii) — avoid sharp/square corners to keep the calm, approachable feel.
- **Generous white space** — avoid the dense, color-blocked section style seen in BiteBox; prefer breathing room between sections, consistent with Levels/Future's spacious homepage layout described in the research.
- **Data visualization first:** macro/calorie rings and progress indicators are a core visual signature of the product (not just a dashboard afterthought) — reuse the ring component in marketing-site feature screenshots so prospective users recognize the real product, not a mockup.
- **Mobile-first:** given WhatsApp-centric notifications and a Georgian user base likely to onboard and check plans primarily on mobile, the dashboard and quiz must be designed mobile-first, with desktop as an enhanced layout, not the primary target.

### Imagery
- Favor **clean product UI screenshots** (dashboard, recipe cards) over raw lifestyle food photography as the dominant hero visual — in contrast to GreenBite/BiteBox's photography-led homepages. Limited, high-quality food photography can still appear inside individual recipe cards, but should not dominate the hero or pricing sections.

### Localization
- Georgian as the primary UI language (with EN/RU switcher), including the quiz, dashboard, recipe content, and all WhatsApp/email notification templates.
- GEL currency formatting (₾ symbol) consistent across pricing cards, quiz result screen, invoices, and the dashboard billing page.
- All times shown to users (booking slots, "plan ready" timestamps) rendered in Asia/Tbilisi local time regardless of the viewer's device locale, with the GET/UTC+4 convention applied consistently in backend scheduling logic.

---

## Open Items for Next Iteration
- Exact Georgian payment gateway provider (TBC vs. BOG vs. other) — needs a decision before building the billing integration.
- Legal review of "wellness, not medical" disclaimers for the Georgian market, especially for the VIP tier's lab-test and personal-trainer program language.
- Initial dietitian/trainer roster size and specialties at launch (affects booking-calendar capacity planning).
- Fitpass partnership commercial terms (how the subscription is provisioned/redeemed inside the VIP tier).
