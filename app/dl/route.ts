import { NextResponse, type NextRequest } from "next/server";
import { stores } from "@/content/site";
import { captureServer, tagStoreUrl } from "@/lib/analytics";

// One link for every device: a phone goes straight to its own store with the
// campaign attached; anything else lands on /get, campaign kept. The QR code
// on /get sends ?c=<campaign>; an ad or partner link sends the usual utm_*.
export const dynamic = "force-dynamic";

const clean = (value: string | null, fallback: string) => (value ?? "").replace(/[^\w.-]/g, "").slice(0, 40) || fallback;

export async function GET(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const store = /iPhone|iPad|iPod/.test(ua) ? "app_store" : /Android/.test(ua) ? "google_play" : null;
  const query = request.nextUrl.searchParams;
  const tagged = query.has("utm_campaign") || query.has("utm_source");
  const tags = {
    source: clean(query.get("utm_source"), "zeropointlog.com"),
    medium: clean(query.get("utm_medium"), tagged ? "link" : "qr"),
    campaign: clean(query.get("utm_campaign") ?? query.get("c"), "get"),
  };
  const placement = tags.medium === "qr" ? "qr" : "link";
  await captureServer(placement === "qr" ? "qr_open" : "store_redirect", {
    store: store ?? "none", campaign: tags.campaign, placement, page: "dl",
    ...(tagged && { utm_source: tags.source, utm_medium: tags.medium, utm_campaign: tags.campaign }),
  });
  if (store) return NextResponse.redirect(tagStoreUrl(store === "app_store" ? stores.appStore : stores.playStore, store, tags), 302);
  const page = new URL("/get", request.url);
  if (tagged) for (const [key, value] of Object.entries(tags)) page.searchParams.set(`utm_${key}`, value);
  return NextResponse.redirect(page, 302);
}
