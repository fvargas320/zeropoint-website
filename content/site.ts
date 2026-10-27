// One place for the facts the site repeats. Every claim here was checked
// against the app code on 2026-10-26 (see docs/architecture.md).

export const site = {
  name: "ZeroPoint",
  url: "https://www.zeropointlog.com",
  email: "support@zeropointlog.com",
  // The web log view. Leave null until app.zeropointlog.com is live; the
  // header shows "Log in" only when this is set.
  appUrl: null as string | null,
};

export const stores = {
  appStoreId: "6757300865",
  appStore: "https://apps.apple.com/us/app/zeropoint-shooting-range-log/id6757300865",
  playStore: "https://play.google.com/store/apps/details?id=com.zeropoint.zeropoint",
};

// Real App Store figures. Update when they change; never round up.
export const rating = { value: "5.0", count: 5, source: "App Store" };

export const pricing = {
  monthly: "$6.99",
  yearly: "$49.99",
  trial: "Monthly includes a 1-week free trial. US prices; your store shows the price in your currency.",
};
