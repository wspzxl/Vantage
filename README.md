# 蹲未来 — Cross-Border Catalyst Tracker

A lightweight, multi-user web app that tracks market catalysts (earnings, FOMC, China macro releases) and early anomaly signals for US-listed Chinese companies ("中概股") and outbound/cross-border names — one calendar that merges both markets' events for the tickers you actually watch.

Full product/technical plan: see the plan doc referenced in `DEVLOG.md`'s first entry, or ask for a copy — it covers the strategic framing, data sources, schema, and build sequence.

## Status

Early build — see `DEVLOG.md` for what's done so far.

## Stack

Next.js 16 (App Router, TypeScript) · Supabase (Postgres + Auth) · Resend (email) · Vercel (hosting)

## Local setup

1. `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in the values (see **Accounts needed** below for where each one comes from).
3. `npm run dev` → http://localhost:3000

## Accounts needed (one-time, free tier covers the MVP)

These need to be created by you directly — sign-up/account creation isn't something to hand off:

| Service | Used for | Sign up |
|---|---|---|
| [Supabase](https://supabase.com) | Database + auth | New project → Settings > API for the URL/keys |
| [Vercel](https://vercel.com) | Hosting/deploys | `npx vercel login` from this repo, or sign up on the site |
| [Resend](https://resend.com) | Alert emails | Dashboard → API Keys |
| [Finnhub](https://finnhub.io/register) | Earnings calendar, price/volume | Dashboard → API key (free tier) |
| [Financial Modeling Prep](https://site.financialmodelingprep.com) | Backfill earnings/OHLCV | Dashboard → API key (free tier) |

Once you have the keys, drop them into `.env.local`. Nothing above needs a paid tier for the MVP.
