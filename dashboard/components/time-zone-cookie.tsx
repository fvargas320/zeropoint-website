"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TZ_COOKIE } from "@/lib/tz";

/// Tells the server the browser's time zone (lib/viewer-tz.ts), and re-renders
/// once when it learns it or it changed, so dates match the viewer's clock.
export function TimeZoneCookie() {
  const router = useRouter();
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return;
    const now = document.cookie.split("; ").find((c) => c.startsWith(`${TZ_COOKIE}=`))?.slice(TZ_COOKIE.length + 1);
    if (now && decodeURIComponent(now) === tz) return;
    document.cookie = `${TZ_COOKIE}=${encodeURIComponent(tz)}; path=/; max-age=31536000; samesite=lax${location.protocol === "https:" ? "; secure" : ""}`;
    router.refresh();
  }, [router]);
  return null;
}
