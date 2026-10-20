import "server-only";
import { cookies, headers } from "next/headers";
import { isTimeZone, TZ_COOKIE } from "@/lib/tz";

/// The viewer's IANA time zone for server rendering: the browser's own
/// (cookie set by <TimeZoneCookie/>), else Vercel's guess from the IP on a
/// first visit, else UTC.
export async function viewerTimeZone(): Promise<string> {
  const fromCookie = (await cookies()).get(TZ_COOKIE)?.value;
  if (isTimeZone(fromCookie)) return fromCookie;
  const fromIp = (await headers()).get("x-vercel-ip-timezone");
  if (isTimeZone(fromIp)) return fromIp;
  return "UTC";
}
