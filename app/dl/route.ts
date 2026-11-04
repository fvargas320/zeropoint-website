import { NextResponse, type NextRequest } from "next/server";
import { stores } from "@/content/site";
import { captureServer, tagStoreUrl } from "@/lib/analytics";

// Where the QR code on /get points: a phone goes straight to its own store,
// with the ad's campaign attached; anything else lands on /get.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  const store = /iPhone|iPad|iPod/.test(ua) ? "app_store" : /Android/.test(ua) ? "google_play" : null;
  const campaign = (request.nextUrl.searchParams.get("c") ?? "get").replace(/[^\w-]/g, "").slice(0, 40) || "get";
  await captureServer("qr_open", { store: store ?? "none", campaign, placement: "qr", page: "dl" });
  const target = store
    ? tagStoreUrl(store === "app_store" ? stores.appStore : stores.playStore, store, { source: "zeropointlog.com", medium: "qr", campaign })
    : new URL("/get", request.url).toString();
  return NextResponse.redirect(target, 302);
}
