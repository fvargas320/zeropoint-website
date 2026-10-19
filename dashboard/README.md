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

## Before it can work signed in

Done 2026-10-18 (project oxilkmjmtnslhhbcyamx):
- [x] `my_pro_status()` applied (migration `my_pro_status`); checked: a granted
      user gets `pro: true`, a free user `false`, `anon` can't call it.
- [x] `pro-status` deployed (v1, verify_jwt false); checked: no token, a bad
      token and the anon key all get 401, OPTIONS 200.

You (dashboards and secrets — nothing here can be done from code):

1. **Supabase › Authentication › URL Configuration › Redirect URLs**: add
   `https://app.zeropointlog.com/**`, `http://localhost:3000/**`, and
   `https://*-fvargas320s-projects.vercel.app/**` (Vercel previews). Leave the
   Site URL as it is (the app's email links use it).
2. **Google** (Google Cloud project of the iOS client `1064375127882-…`):
   open the *Web* OAuth client the app already uses as `serverClientId`
   (`lib/features/auth/services/auth_service.dart`). Under *Authorized
   redirect URIs* add `https://oxilkmjmtnslhhbcyamx.supabase.co/auth/v1/callback`;
   under *Authorized JavaScript origins* add `https://app.zeropointlog.com` and
   `http://localhost:3000`. In Supabase › Authentication › Providers › Google,
   make sure that web client's ID and **secret** are filled in (the ID is
   probably there already for the app; the secret is what the web redirect
   flow needs) and the iOS client ID stays in the authorized client IDs.
3. **Apple** (developer.apple.com › Certificates, IDs & Profiles):
   - Identifiers › **Services IDs** › new, e.g. `com.zeropoint.zeropoint.web`,
     enable *Sign in with Apple*, primary App ID `com.zeropoint.zeropoint`,
     domain `oxilkmjmtnslhhbcyamx.supabase.co`, return URL
     `https://oxilkmjmtnslhhbcyamx.supabase.co/auth/v1/callback`.
   - Keys › a key with *Sign in with Apple* (reuse one if it exists) → download
     the `.p8`, note the Key ID and your Team ID (`VWZ46FQA8B`).
   - Supabase › Providers › Apple: add the Services ID to **Client IDs**
     (comma-separated, keep the bundle ID `com.zeropoint.zeropoint` first so the
     app keeps working) and paste the **secret key** generated from the .p8
     (Supabase's Apple page has the generator). **That secret expires after
     6 months** — put a calendar reminder to regenerate it, or web Apple
     sign-in stops working.
   - Same Apple ID → same Supabase user, including Hide My Email (the relay
     address is per app team, so phone and web match).
4. **Vercel**: new project from this repo, Root Directory `dashboard`, env vars
   from `.env.example` (the anon key is public), domain `app.zeropointlog.com`.
   DNS: CNAME `app` → `cname.vercel-dns.com` at the registrar (add it after the
   GoDaddy → Spaceship move, or add it now and copy it over).
5. Test: sign in with Apple, Google and an email link on localhost with a Pro
   account and a free one; the free one lands on `/upgrade`, "Check again"
   after a test purchase in the app flips it to the Season page.

Note: OAuth sign-in on the web can still create a new user if someone picks a
different provider than on their phone (Supabase has no per-request switch for
OAuth). The upgrade page's "Signed in as … with Apple" line and hint cover it.

## Next

Match page, compare and import (web round 2) need the match archive tables and
the shared Dart core; Web Billing is phase 2.
