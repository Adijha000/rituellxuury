# Rituel — Founding Waitlist

A one-page, editorial-luxury waitlist experience for Rituel (modern Ayurvedic hair rituals). Built to convert on a single KPI: waitlist reservations from people who want to belong to something before everyone else.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion for scroll-driven reveals, parallax, sticky/horizontal scroll, and magnetic buttons
- Lenis for smooth scrolling
- React Hook Form + Zod for the waitlist form
- API route (`/api/waitlist`) that stores entries and sends confirmation email

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Waitlist storage & email

Copy `.env.example` to `.env.local` and fill in what you use:

- **`GOOGLE_SHEETS_WEBAPP_URL` + `GOOGLE_SHEETS_SECRET`** (recommended) — every submission is appended as a row to a Google Sheet you own. No Google API keys needed — see [`google-apps-script/README.md`](./google-apps-script/README.md) for the 5-minute setup.
- **No env vars set** — the form still works end-to-end. Entries are stored in `.data/waitlist.json` (dev-only, gitignored) and confirmation emails are skipped.
- **`RESEND_API_KEY`** — set this (and optionally `WAITLIST_FROM_EMAIL`) to send a branded confirmation email to the signee and a notification to `WAITLIST_NOTIFY_EMAIL` (defaults to `rituelluxury@gmail.com`). Get a key at https://resend.com.
- **`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`** — set both to also persist entries in Supabase. Create a `waitlist` table with columns: `id uuid default gen_random_uuid()`, `first_name text`, `email text`, `phone text`, `hair_goal text`, `consent bool`, `source text`, `created_at timestamptz`.

The founding-member counter (`GET /api/waitlist`) starts at 127 and adds real signups on top, capped at 500.

## Structure

Sections live in `src/components/sections/` in scroll order: Hero → Story → Philosophy → Ingredients → Product Reveal → Ritual Cards → Why Join Early → Social Proof → Founder Story → Waitlist Form → FAQ → Footer. `src/app/page.tsx` assembles them behind a loading screen (`src/components/LoadingScreen.tsx`), with a scroll-triggered popup (`WaitlistPopup.tsx`) and a mobile sticky CTA (`StickyJoinButton.tsx`).

The real Rituel Luxury logo artwork lives in `public/rituel-logo-*.png|jpg` and is used as-is (unmodified proportions/typography) via `BrandMark`/`BrandLockup`/`BrandPlate` in `src/components/Logo.tsx`. `LogoMark` (hand-drawn SVG) remains only for tinted decorative motifs (`AmbientScene`, `ProductPouch`) that need to recolor per section.

## Deploying

Deploy on Vercel (or any Node host). Set the environment variables above in your hosting provider's dashboard for production email + persistence.
