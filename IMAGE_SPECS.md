# Kvapp — Missing Image Asset Checklist

**Status: all 7 images below have been generated, placed, and wired in** (2026-10-07). Kept here as a reference for the spec each image was generated against.

Audited: homepage (`/`), `/pricing`, the quiz flow (`/quiz`, `/quiz/[step]`), and `/quiz/result`. All image slots currently render an on-brand gradient placeholder (lavender→pink, with an icon) via the shared `PhotoSlot` component (`components/ui/PhotoSlot.tsx`) — nothing is a broken `<img>`, but none has a real photo yet.

**Convention:** all files go under `public/images/` (doesn't exist yet — create it), referenced in code as `/images/<filename>`. **Code change needed for every item below:** yes — each `PhotoSlot` call currently has no `src` prop. Once you've placed a batch of files at the exact paths given, tell me and I'll add the `src` props in one pass (or ping me after each one if you'd rather go file-by-file).

Format per JPG: export as `.jpg`, sRGB, no embedded text/logos/watermarks.

---

## 1. Homepage hero

### 1.1 Hero visual (right side, behind the floating calorie-ring card)
- **Location:** `components/marketing/Hero.tsx` — the large image on the right half of the hero section (homepage only).
- **Purpose/content:** A beautifully plated, colorful healthy meal (balanced plate — vegetables, lean protein, a grain) shot top-down or at a slight angle, on a light plate/surface. This is the first thing a visitor sees, so it should feel appetizing and premium, not clinical.
- **Dimensions:** 4:5 portrait. Export **1200×1500px**.
- **Style/mood:** Off-white or very light neutral surface/table, soft natural daylight, no harsh shadows, no text/logos baked in. **Leave the bottom-left ~35% of the frame visually calm/uncluttered** — a white stat card overlaps that corner in the live layout, so avoid putting the dish's main focal point there.
- **File path:** `public/images/hero-meal.jpg`
- **Wiring:** I add `src="/images/hero-meal.jpg"` to the `PhotoSlot` in `Hero.tsx`.

---

## 2. Homepage "How it works" (3 step cards)

Same component (`components/marketing/HowItWorks.tsx`), one image per step card, all **16:10**, export **1280×800px** each.

### 2.1 Step 1 — "გაიარეთ 2-წუთიანი კითხვარი" (take the quiz)
- **Purpose/content:** A lifestyle moment evoking "starting your plan" — e.g. someone at a bright kitchen counter or sofa, relaxed, looking at their phone. **Do not** depict our actual app UI (we don't have a real screenshot-worthy mobile app yet) — keep it a genuine lifestyle photo, phone screen not legible/in focus.
- **Style/mood:** Bright, airy, natural light, soft lavender/pink props optional (e.g. a notebook or mug) but not required.
- **File path:** `public/images/how-it-works-1.jpg`

### 2.2 Step 2 — "მიიღეთ თქვენი კვების გეგმა" (get your meal plan)
- **Purpose/content:** Fresh ingredients being prepared, or a finished healthy Georgian-inspired dish (vegetable-forward, colorful), top-down.
- **Style/mood:** Same light, clean kitchen aesthetic as the hero image — these two should feel like they're from the same shoot/brand.
- **File path:** `public/images/how-it-works-2.jpg`

### 2.3 Step 3 — "დაამატეთ დიეტოლოგი ან მწვრთნელი" (add a dietitian/trainer)
- **Purpose/content:** A warm, approachable coaching moment — e.g. a friendly-looking person on a video call, or a consultation-style interaction. **Avoid clinical imagery** (white coats, stethoscopes, exam rooms) — this is a lifestyle/coaching brand, not a medical one (see `CONTENT_GUIDE.md`'s non-clinical positioning note).
- **Style/mood:** Warm, human, well-lit indoor setting.
- **File path:** `public/images/how-it-works-3.jpg`

---

## 3. Pricing tier cards (shared component — appears on 3 pages)

`components/marketing/PricingTable.tsx` is reused on the **homepage pricing section**, the standalone **`/pricing` page**, and the **quiz `/quiz/result` page**. These are the *same three images* everywhere — you only need to generate **3 files total**, not 9. All **16:9**, export **1200×675px** each.

### 3.1 Starter tier (AI-only)
- **Purpose/content:** Something evoking solo, self-directed healthy eating — e.g. a simple home-prepared meal or smoothie, one person's kitchen moment.
- **File path:** `public/images/pricing-starter.jpg`

### 3.2 Pro tier (human + AI) — currently the "recommended" highlighted card
- **Purpose/content:** Something evoking guided support — e.g. a warm video-call consultation moment, or a dietitian reviewing a plan (same non-clinical mood guidance as 2.3).
- **File path:** `public/images/pricing-pro.jpg`

### 3.3 VIP tier (all-inclusive)
- **Purpose/content:** Something evoking the fuller, premium experience — e.g. a bright modern gym space, or a trainer + healthy meal pairing. Should read as a step up in scale/polish from the other two.
- **File path:** `public/images/pricing-vip.jpg`

**Shared style/mood for all three:** off-white/neutral background, soft lavender-pink color accents acceptable (props, lighting gel, etc.), no text overlays, no gym-brand or food-brand logos visible.

---

## 4. Quiz flow (`/quiz`, `/quiz/[step]`) and result page (`/quiz/result`)

**No missing images found.** These pages use the shared `PricingTable` (covered in section 3 — same 3 files) and otherwise are text/icon/progress-bar only by design (no photo slots in `OptionForm.tsx`, `QuizProgress.tsx`, or the result page itself).

---

## 5. Not included — flagging for a decision, not a spec

**Team section avatars** (`components/marketing/Team.tsx`) currently show an icon in a colored circle, not a photo slot. I did **not** spec these as generate-able images, because the three names there (ნინო ბერიძე, გიორგი მაისურაძე, თამარ ხარაზიშვილი) are placeholder staff per the PRD — real hiring hasn't happened yet (see `PRD.md`'s Open Items). Generating AI/stock headshots and presenting them as specific named "certified dietitians" would misrepresent real people once this goes live. Two options when you're ready:
- Leave the icon-avatar placeholders until real staff are hired, then use real headshots.
- If you want visual variety sooner, I can wire in a stylized illustrated-avatar style instead (not photorealistic faces) — let me know and I'll spec that separately.

---

## Summary — files to generate

| # | File | Aspect | Export size |
|---|---|---|---|
| 1 | `public/images/hero-meal.jpg` | 4:5 | 1200×1500 |
| 2 | `public/images/how-it-works-1.jpg` | 16:10 | 1280×800 |
| 3 | `public/images/how-it-works-2.jpg` | 16:10 | 1280×800 |
| 4 | `public/images/how-it-works-3.jpg` | 16:10 | 1280×800 |
| 5 | `public/images/pricing-starter.jpg` | 16:9 | 1200×675 |
| 6 | `public/images/pricing-pro.jpg` | 16:9 | 1200×675 |
| 7 | `public/images/pricing-vip.jpg` | 16:9 | 1200×675 |

7 files total cover every missing image across the whole site (pricing images are shared across 3 pages via one component).
