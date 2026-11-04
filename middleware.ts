import { NextResponse, type NextRequest } from "next/server";
import { getVariants } from "@/content/get";

// An ad links to /get?utm_campaign=<name>; a name that mentions a sport or
// feature (uspsa, idpa, ammo, log) or partner (gunscom) gets that version of the page, served
// from /get/<slug> while the address bar keeps /get and its query.
export function middleware(request: NextRequest) {
  const campaign = request.nextUrl.searchParams.get("utm_campaign");
  const variant = campaign && getVariants.find((v) => v.matches.test(campaign));
  if (!variant) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/get/${variant.slug}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: "/get" };
