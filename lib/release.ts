import "server-only";
import { site, stores } from "@/content/site";

// Match import ships in app 1.5.0. Instead of someone remembering to flip a
// flag on release day, the site asks the App Store which version is live
// (re-checked about hourly) and turns the Matches section on by itself.
const MATCHES_VERSION = [1, 5, 0];

const parse = (v: string) => v.split(".").map((n) => Number.parseInt(n, 10) || 0);

function atLeast(version: string, min: number[]) {
  const v = parse(version);
  for (let i = 0; i < min.length; i++) {
    if ((v[i] ?? 0) !== min[i]) return (v[i] ?? 0) > min[i];
  }
  return true;
}

/** The live App Store version, or null if the lookup fails (then we stay cautious). */
async function appStoreVersion(): Promise<string | null> {
  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${stores.appStoreId}&country=us`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { results?: { version?: string }[] };
    return data.results?.[0]?.version ?? null;
  } catch {
    return null;
  }
}

/** True once 1.5.0 or later is actually live on the App Store. */
async function release150Live(): Promise<boolean> {
  const version = await appStoreVersion();
  return version ? atLeast(version, MATCHES_VERSION) : false;
}

/** Matches show as current once 1.5.0 is live, or earlier when site.ts forces it. */
export async function matchesLive(): Promise<boolean> {
  return site.matchesLive || (await release150Live());
}

/** Founders Lifetime waits for the real release (it's a price people must be
    able to pay), whatever the Matches override says; site.foundersLifetime hides it. */
export async function foundersLive(): Promise<boolean> {
  return site.foundersLifetime && (await release150Live());
}
