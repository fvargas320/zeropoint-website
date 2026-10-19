# ZeroPoint web app (app.zeropointlog.com)

Desktop dashboard for ZeroPoint Pro members, on the same Supabase account and
data as the phone app. Plan and decisions: `docs/research/web-app-proposal.md`
in the rangeai repo; approved designs: `docs/design/web/index.html` there.

This folder is its own Vercel project (Root Directory = `dashboard`), separate
from the static marketing site at the repo root.

## What's built (web round 5)

Sidebar: Overview, Sessions, Matches, Metrics, Armory, Training, Profile, and
**+ New** (Log a session; Import match results comes next).

| Route | What |
|---|---|
| `/login` | Sign in with Apple / Google / email magic link. Email never creates an account (`shouldCreateUser: false`) |
| `/upgrade` | Signed in, not Pro. Phase 1 sells Pro **only in the app**; "Check again" re-runs the Pro check |
| `/` | Overview: month figures, rounds by week, recent sessions with target thumbnails, goals, next match |
| `/sessions` | Filterable list + detail: target photo with group size, photos, video player, facts, notes (`?id=`, `?firearm=`, `?range=`, `?year=`, `?q=`) |
| `/sessions/new` | Log a session: one page; photos/video upload straight to Storage under `<uid>/…`, then a server action writes `sessions` + `targets` |
| `/sessions/<id>/edit` | Edit a session: details, notes, photos and video (add/remove). Rounds and ammo lock when the phone already deducted them, and for matches (official results stay as imported) |
| Delete (on the session panel) | Confirm says what goes (photos, video) and how many rounds go back to which lot; runs `web_delete_session` |
| `/matches` | Season (round 1b E) from `sessions.is_match` |
| `/metrics` | Rounds, cost per round, spend by caliber, firearm usage, group size trend (`?period=month\|quarter\|year\|all`) |
| `/armory` | Firearms (photo, rounds, sessions, cleaning bar), Ammo, Maintenance (`?tab=`) |
| `/training` | Goals with progress, classification, custom drills with run counts |
| `/profile` | Shooter profile (division, class, member numbers editable), plan and where it's billed, account, CSV export |
| `/export/sessions.csv` | Every session as CSV (formula-safe) |
| `/sample` | Public sample season |
| `/preview/*` | **Dev only** (404 in production): every page above with made-up data |

Rules for things the web writes (`lib/session-writes.ts`, `lib/edit-rules.ts`, `app/(app)/profile`):
- **Delete** goes through the `web_delete_session` RPC (rangeai
  `supabase/migrations/20261019120000_web_session_writes.sql`, **not applied
  yet**): one transaction that gives deducted rounds back to the lot
  (`ammo_deducted`, else `round_count` for legacy rows, clamped to the
  purchase quantity), deletes the session (targets cascade; both tombstoned
  for the phone) and recomputes the firearm's cached totals — the same steps
  as the app's `SessionNotifier.deleteSession`. Files are removed after.
- **Edit** never changes rounds or the ammo lot once the phone deducted
  rounds (`editLocks`), nor a match's results. Firearm totals are
  recomputed for the old and new firearm (`web_refresh_firearm_stats`).
- A replacement video uploads under a new name; the old file is removed
  only after the save succeeds.
- The edit form turns the stored time into local time in the browser, not
  on the server (Vercel runs in UTC).
- `ammo_deducted = 0` when an ammo lot is named; the web never changes
  inventory, and 0 (not null) stops the phone from "giving back" rounds it
  never took when the session is later edited or deleted.
- Media paths are the app's: `target-images/<uid>/targets/<target>.ext`,
  `video-vault/<uid>/sessions/<session>/video.ext`; bucket limits apply
  (photos 15 MB JPEG/PNG/HEIC, one video 50 MB MP4/MOV).
- Shooter-profile saves merge into `user_profiles.shooter_profile`, changing
  only division, class and member numbers.
- Every write re-checks Pro on the server. RLS already limits rows to the
  member; the storage quota (5 GB) is still only enforced by the app.

Pro check (server only, `lib/pro.ts`): `my_pro_status()` RPC (grants + RevenueCat
webhook mirror), then the `pro-status` edge function (live RevenueCat lookup)
when that says no. Everything under `app/(app)` redirects to `/upgrade` without Pro.

## Run

```bash
cp .env.example .env.local   # fill NEXT_PUBLIC_SUPABASE_ANON_KEY (the app's public anon key)
npm install
npm run dev
# open http://localhost:3000/preview to see every page with sample data
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
