# zeropointlog.com

The ZeroPoint marketing site: Next.js 15, fully static, deployed by Vercel
from `main` (`vercel.json` sets the framework). See `docs/architecture.md`
for how it relates to the web app and the phone app.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # must pass before merging
npm run typecheck
```

## Rules

- **Pages compose sections; sections compose components.** A component file
  holds one component and its CSS module. Split anything that passes about
  120 lines.
- **Copy lives in `content/`, never inline.** Only claim what the app does
  today; check the app code (rangeai) before adding a feature, price or
  privacy claim.
- **Images:** use `Phone`, `Prop` or `LazyImage`, never a bare `<img>`, so
  they lazy-load with a skeleton. Import images from `assets/`; put files in
  `public/` only when they need a fixed URL.
- **Colours and spacing:** use the tokens in `app/globals.css`. Inside a
  module, define keyframes locally, because CSS modules rename them.
- **Store buttons:** always `StoreButtons` with a `placement`, so
  `store_click` analytics can tell them apart.
