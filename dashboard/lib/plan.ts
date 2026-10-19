import type { ProStatus } from "@/lib/pro";

/// Where a member's Pro comes from, for the Profile page.
export function planLines(pro: ProStatus) {
  const id = pro.productId ?? "";
  const store =
    pro.source === "grant" ? "Granted by ZeroPoint"
    : id.includes(":") ? "Google Play"
    : id.startsWith("zeropoint_pro") ? "The App Store"
    : pro.source === "revenuecat" ? "Your phone's app store"
    : "—";
  const manage =
    store === "Google Play" ? "Manage in Google Play on your phone"
    : store === "The App Store" ? "Manage on your iPhone: Settings › your name › Subscriptions"
    : pro.source === "grant" ? null
    : "Manage in your phone's app store";
  const renews = pro.expiresAt ? new Date(pro.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;
  return { store, manage, renews };
}
