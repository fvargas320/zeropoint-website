// Cookieless analytics: events go straight to PostHog's capture API. No SDK,
// no cookies, no recordings; the id lives for one tab (sessionStorage).

const KEY = "phc_vQ69py6Bu5g4xZ2S7tszh8TpXt7ZrhfyyFVZHwYRt8pH";
const ENDPOINT = "https://us.i.posthog.com/i/v0/e/";
// App Store Connect › App Analytics › Campaigns shows the provider token.
const APPLE_PROVIDER_TOKEN = "128412466";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const isLocal = () => /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

function anonId(): string {
  try {
    const saved = sessionStorage.getItem("zp-aid");
    if (saved) return saved;
    const id = crypto.randomUUID();
    sessionStorage.setItem("zp-aid", id);
    return id;
  } catch {
    return "anon";
  }
}

export function utm(): Record<string, string> {
  const query = new URLSearchParams(location.search);
  return Object.fromEntries(UTM_KEYS.flatMap((k) => (query.get(k) ? [[k, query.get(k)!]] : [])));
}

export function page(): string {
  return location.pathname.replace(/\/+$/, "").split("/")[1] || "home";
}

export function capture(event: string, props: Record<string, unknown> = {}) {
  const properties = {
    $process_person_profile: false,
    $current_url: location.href,
    $pathname: location.pathname,
    $referrer: document.referrer || "$direct",
    page: page(),
    platform: document.documentElement.dataset.platform,
    ...utm(),
    ...props,
  };
  if (isLocal()) {
    console.debug("[analytics]", event, properties);
    return;
  }
  const body = JSON.stringify({ api_key: KEY, event, distinct_id: anonId(), properties });
  const sent = navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "text/plain" }));
  if (!sent) fetch(ENDPOINT, { method: "POST", body, keepalive: true }).catch(() => {});
}

/** The store URL with this visit's campaign attached. */
export function withCampaign(href: string, store: string): string {
  const tags = utm();
  return tagStoreUrl(href, store, {
    source: tags.utm_source || "zeropointlog.com",
    medium: tags.utm_medium || "website",
    campaign: tags.utm_campaign || page(),
  });
}

/** Adds a campaign to a store URL: the install referrer on Google Play, the
    provider and campaign tokens on the App Store. Safe on the server too. */
export function tagStoreUrl(href: string, store: string, tags: { source: string; medium: string; campaign: string }): string {
  const url = new URL(href);
  if (store === "google_play") {
    const referrer = new URLSearchParams({ utm_source: tags.source, utm_medium: tags.medium, utm_campaign: tags.campaign });
    url.searchParams.set("referrer", referrer.toString());
  } else if (APPLE_PROVIDER_TOKEN) {
    url.searchParams.set("pt", APPLE_PROVIDER_TOKEN);
    url.searchParams.set("ct", tags.campaign.slice(0, 40));
    url.searchParams.set("mt", "8");
  }
  return url.toString();
}

/** PostHog's capture call from the server (the /dl redirect), same key. */
export async function captureServer(event: string, properties: Record<string, unknown>) {
  const body = JSON.stringify({ api_key: KEY, event, distinct_id: crypto.randomUUID(), properties: { $process_person_profile: false, ...properties } });
  await fetch(ENDPOINT, { method: "POST", body, signal: AbortSignal.timeout(800) }).catch(() => {});
}
