# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Kvapp is a GEL-priced nutrition/wellness subscription platform for Georgia (the country). The full product spec is `PRD.md`; the phased build plan (architecture, data model, Next.js 16-specific corrections) lives in this session's plan file under `.claude/plans/` — ask the user or check there before assuming structural decisions, rather than re-deriving them. Only **Phase 0 (scaffolding) and Phase 1 (marketing site + onboarding quiz)** are built so far. There is no auth, no real payments, no booking system, and no WhatsApp/email notifications yet — those are Phase 2+.

## Commands

```bash
npm run dev          # start dev server (Turbopack)
npm run build         # production build
npm run lint          # eslint
npm run typecheck      # tsc --noEmit
npm run db:generate    # generate SQL migration from lib/db/schema.ts (drizzle-kit)
npm run db:migrate     # apply migrations (drizzle-kit — see gotcha below)
npm run db:studio      # Drizzle Studio
npm run db:seed        # seed subscription tiers + recipes (tsx db/seed.ts)
```

There is no test runner configured in this repo yet.

**`drizzle-kit migrate`/`push` gotcha:** because `@neondatabase/serverless` is a dependency, `drizzle-kit` auto-detects it and tries to reach the target `DATABASE_URL` over Neon's websocket protocol even when that URL is a plain local Postgres — it will hang. `drizzle-kit generate` (static, no connection) is unaffected. To apply a generated migration to local Postgres, run the generated `.sql` file directly with `psql -d <db> -f drizzle/xxxx_*.sql` instead of `drizzle-kit migrate`.

**Local dev without a Neon project:** `lib/db/client.ts` auto-detects whether `DATABASE_URL` points at `localhost`/`127.0.0.1` and switches between `drizzle-orm/node-postgres` (local) and `drizzle-orm/neon-http` (real Neon, production). `db/seed.ts` duplicates this same detection inline rather than importing `lib/db/client.ts` — that file does `import "server-only"`, which throws when loaded outside Next.js's own build pipeline (e.g. via a standalone `tsx` script). Don't "simplify" `db/seed.ts` to import the shared client; it will break.

## Architecture

**Route groups** (`app/`) split by audience, each with its own layout:
- `(marketing)` — public site: homepage, `/pricing`, `/calculators/bmr-tdee`.
- `(quiz)` — the onboarding quiz: `/quiz` (intro, creates a session + cookie), `/quiz/[step]` (generic renderer driven by `lib/domain/quiz/config.ts`'s `STEP_ORDER`), `/quiz/result`.

Business logic lives under `lib/domain/<area>/`, not inside route files, split into `queries.ts` (reads), `actions.ts` (`"use server"` mutations), and pure logic (`scoring.ts`, `selector.ts`) — this split matters because `"use server"` files expose every export as a POST-reachable endpoint, so read-only helpers are deliberately kept out of those files.

**Quiz flow:** an anonymous session is tracked via an httpOnly cookie (`lib/domain/quiz/session.ts`) pointing at a `quiz_sessions` row; each step's answer is upserted into `quiz_responses` (one row per step, keyed by session+step, so the flow is resumable — revisiting `/quiz` redirects to the first unanswered step, or straight to the result if already completed). On the last step, `lib/domain/quiz/scoring.ts` deterministically computes a recommended tier and nutrition targets (rules engine, not a black box — see `RULES_VERSION`), persisted to `quiz_results`.

**Meal-plan generation anti-hallucination design** (`lib/domain/meal-plans/`): `generator.ts` fetches a candidate pool of real recipes from the DB already filtered by diet tags/meal type, then `selector.ts`'s `selectDeterministic()` picks from *only* that pool. Every selection is Zod-validated against the exact candidate pool it was given (`assertGrounded`) before being returned — this makes it structurally impossible to reference a recipe that wasn't actually offered, which matters because the selector is designed to be swappable for an LLM-backed implementation later (same input/output shape) without reopening this guarantee.

**Next.js 16 specifics** (this version differs from older Next.js — see `AGENTS.md`/`node_modules/next/dist/docs/` before assuming older conventions): `middleware.ts` is renamed `proxy.ts` and is documented as unsuitable for real auth — when auth lands in Phase 2, it must use a Data Access Layer pattern (`verifySession()` re-checked inside every protected Server Action/Route Handler individually), with `proxy.ts` doing only optimistic cookie-presence redirects.

**Admin dashboard auth** (`/admin`, `lib/auth.ts`): Auth.js v5 (`next-auth@beta`), magic-link only, email allowlisted via `ADMIN_EMAILS` (`lib/domain/admin/admin-emails.ts`) — no public signup, no password. This is a separate, minimal identity store (`auth_users`/`auth_verification_tokens` tables) from the future consumer `users` table — don't conflate them. Follows the DAL convention above exactly: `proxy.ts` only redirects based on cookie presence; `lib/domain/admin/session.ts`'s `verifySession()` is the real gate and **must** be called independently by every admin Server Action/Route Handler, not just the `(protected)` layout. Mailgun sending is best-effort (`lib/domain/admin/mailgun-provider.ts`) — the magic-link URL always prints to the server console too, since Mailgun real delivery wasn't confirmed configured as of this writing. Only the Leads (contact form) submission type is actually DB-wired; Bookings/Inquiries/Newsletter are dashboard placeholders until those forms/tables exist.

**Database:** Drizzle ORM, schema in `lib/db/schema.ts` covers the *full* data model from the plan (30 tables: identity, subscriptions/billing, quiz, recipes, meal plans, grocery lists, booking, VIP extras, notifications) even though only the quiz/recipes/subscription_tiers tables are populated by Phase 1. All timestamps are `timestamptz` (UTC); Tbilisi-local wall-clock concepts (billing anniversary day, booking availability, week-start dates) are stored as explicit local date/time fields, never derived from a hardcoded UTC+4 offset.

**UI primitives** are hand-rolled in `components/ui/` (Card, Button, Badge, ProgressRing) — not shadcn/ui, despite earlier planning notes suggesting it. The icon set in `components/icons/` is hand-drawn flat SVGs matching the project's muted, flat icon reference, not an icon library.

**Content language:** all user-facing text is Georgian only (no live locale switcher yet, though `nameEn`/`labelEn`/`questionEn` fields exist in data for a future one — don't render them). **Before writing any user-facing string, read `CONTENT_GUIDE.md`** — it defines the formal register, a canonical-terminology table (e.g. "პაკეტი" for subscription tier vs. "გეგმა" reserved for the meal plan — these are never interchangeable), currency/quotation formatting, and a loanword policy. This applies to every future phase, especially notification templates once those are built.

**Env var stubs:** `PAYMENT_PROVIDER` (`stub`/`tbc`/`bog`) and `MEAL_PLAN_SELECTOR` (`deterministic`/`llm`) are placeholders in `.env.example` for decisions not yet made (bank merchant agreement, LLM vendor) — see `PRD.md`'s Open Items. Nothing currently reads these env vars yet; Phase 1 only has the deterministic selector.

when creating forms on the website - always use field validation

always use GEL symbol as a currency on the website 