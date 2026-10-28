# ZeroPoint on the web: architecture

Decided 2026-10-26.

| Surface | Domain | Repo | Stack | Vercel project |
|---|---|---|---|---|
| Marketing site | zeropointlog.com (www) | `zeropoint-website` (this repo, root) | Next.js 15, static | `zeropoint-website` |
| Web log view | app.zeropointlog.com | `fvargas320/zeropoint-web-app` (split out of `dashboard/`, history kept) | Next.js 15 + Supabase auth | `zeropoint-dashboard` |
| Phone app | App Store / Google Play | `rangeai` | Flutter | — |

## Why two sites

- **Different jobs.** The marketing site is public, cached and fast, with no
  auth and no database. The web log view is signed-in, Pro-gated and talks to
  Supabase on every request.
- **Different release pace.** Copy and design changes on the site shouldn't
  wait on web-app reviews, and a web-app deploy can't take down the site.
- **Own domain each.** The site links to `app.zeropointlog.com/login`
  through one setting, `site.appUrl` in `content/site.ts`. The "Log in"
  link stays hidden until that's set.

## What has to stay on zeropointlog.com

The phone app opens these URLs as universal links and App Links, so they
can't move:

- `/.well-known/apple-app-site-association` and `/.well-known/assetlinks.json`
- `/r/<code>` (invites) and `/g/<code>` (gifts): static pages in
  `public/r`, `public/g`, rewritten in `next.config.ts`. `/i/<code>` redirects
  to `/r/<code>`.
- `/your-data`: the page the Pro-ended retention email points to; its
  button opens `zeropoint://your-data`
- `/app-ads.txt` (AdMob)

## This repo

- `app/`: routes only, and each page just composes sections:
  - `/`, `/get`
  - `/shooting-log-app`, `/ammo-inventory-app`
  - `/privacy`, `/terms`, `/support`, `/your-data`
  - The icon, share image, robots and sitemap are generated.
- `components/`: reusable pieces, each with its CSS module next to it:
  - `layout/`: header, footer, logo
  - `ui/`: store buttons, rating, strike, section heading
  - `media/`: `LazyImage` (skeleton, then fade in), `Phone`, `Prop`,
    `ScreenCycle`, `LazyVideo`
  - `motion/`: `Reveal`
  - `sections/`: hero, feature rows, plans, FAQ and the rest
  - `pages/`: the keyword and legal page templates
- `content/`: all copy and facts as data. Prices, the rating and store links
  live in `site.ts`, and every claim was checked against the app code.
- `assets/`: imported images, fonts and share-image sources. These get hashed
  file names and responsive sizes through `next/image`.
- `public/`: only files that need fixed URLs: link pages, `.well-known`, the
  brand film, and the assets the link pages use.

## Release-gated content

`lib/release.ts` reads the live App Store version (re-checked hourly) and
switches on what ships in app 1.5.0:
- Matches lose their "Coming in the next update" tags.
- Founders Lifetime joins the Pro toggle, with the Black Friday price from
  Nov 26 to Dec 1 to match App Store Connect.

`site.matchesLive` forces both on early. `site.foundersLifetime` hides
Lifetime if the app's PostHog switch turns it off.

## Performance rules

- **Images:** every image goes through `next/image`, lazy unless it's in the
  first screen, with a shimmer skeleton until it decodes. Cut-out props fade
  in without a shimmer.
- **Video:** downloads nothing until it's near the screen, only the cut for
  the current width, never for reduced motion, and pauses off-screen.
- **Motion:** respects `prefers-reduced-motion`. Content is never hidden when
  JavaScript doesn't run (`.js` on `<html>`).
- **Measured 2026-10-26 (production build):**
  - First load is about 650 KB, of which images are 40–70 KB.
  - The old static site was about 3.7 MB.
