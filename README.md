# Kvapp

AI + human nutrition and wellness subscription platform for Georgia. See `PRD.md` for the product spec and `.claude/plans/` (or ask the assistant) for the implementation plan.

## Stack

Next.js 16 (App Router) · Neon Postgres via Drizzle · Railway deployment.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL at minimum
npm run db:generate          # generate SQL migrations from lib/db/schema.ts
npm run db:migrate           # apply migrations to your Neon database
npm run db:seed              # seed subscription tiers + sample recipes
npm run dev
```

Visit `/api/healthcheck` to confirm the app can reach the database.

## Notes

- `proxy.ts` (Next.js 16's renamed `middleware.ts`) is used only for optimistic, cookie-based redirects — real auth/authorization checks live in `lib/dal.ts` and are re-verified in every Server Action and Route Handler, per Next.js's Data Access Layer guidance.
- `PAYMENT_PROVIDER` and `MEAL_PLAN_SELECTOR` env vars are stubbed (`stub` / `deterministic`) until a bank merchant agreement and an LLM vendor decision are in hand — see `PRD.md`'s Open Items.
