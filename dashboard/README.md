# ZeroPoint web app (app.zeropointlog.com)

Desktop dashboard for ZeroPoint Pro members, on the same Supabase account and
data as the phone app. Plan and decisions: `docs/research/web-app-proposal.md`
in the rangeai repo; approved designs: `docs/design/web/index.html` there.

This folder is its own Vercel project (Root Directory = `dashboard`), separate
from the static marketing site at the repo root.

## Phase 1 (this scaffold)

| Route | What |
|---|---|
| `/login` | Sign in with Apple / Google / email magic link (web round 3 C). Email never creates an account (`shouldCreateUser: false`) |
| `/auth/callback` | OAuth / magic-link code exchange |
| `/upgrade` | Signed in, not Pro (web round 4 C). Phase 1 sells Pro **only in the app**, so nobody can pay twice; "Check again" re-runs the Pro check |
| `/` | Season page (round 1b E) from `sessions` where `is_match` — date, match, level, division, class, place, match %, rounds |
| `/sample` | Public sample season (for the marketing site's link) |

Pro check (server only, `lib/pro.ts`): `my_pro_status()` RPC (grants + RevenueCat
webhook mirror), then the `pro-status` edge function (live RevenueCat lookup)
when that says no. Everything under `app/(app)` redirects to `/upgrade` without Pro.

## Run

```bash
cp .env.example .env.local   # fill NEXT_PUBLIC_SUPABASE_ANON_KEY (the app's public anon key)
npm install
npm run dev
```

## Before it can work signed in (none done)

1. Apply `supabase/migrations/20261019100000_my_pro_status.sql` (rangeai repo).
2. Deploy `supabase/functions/pro-status` (config.toml: verify_jwt = false).
3. Supabase Auth › URL configuration: add `https://app.zeropointlog.com/**`
   (and `http://localhost:3000/**` for local testing) to the redirect allow-list.
4. Apple: a Services ID with the Supabase callback URL, added to the Apple
   provider's client IDs. Google: a Web OAuth client in the same Google Cloud
   project as the iOS client, added to the Google provider.
5. Vercel: new project from this repo with Root Directory `dashboard`, env vars
   from `.env.example`, domain `app.zeropointlog.com` (CNAME).

Note: OAuth sign-in on the web can still create a new user if someone picks a
different provider than on their phone (Supabase has no per-request switch for
OAuth). The upgrade page's "Signed in as … with Apple" line and hint cover it.

## Next

Match page, compare and import (web round 2) need the match archive tables and
the shared Dart core; Web Billing is phase 2.
