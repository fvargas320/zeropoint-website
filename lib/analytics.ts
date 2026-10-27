// Cookieless analytics: events go straight to PostHog's capture API. No SDK,
// no cookies, no recordings; the id lives for one tab (sessionStorage).

const KEY = "phc_vQ69py6Bu5g4xZ2S7tszh8TpXt7ZrhfyyFVZHwYRt8pH";
const ENDPOINT = "https://us.i.posthog.com/i/v0/e/";
// App Store Connect › App Analytics › Campaigns shows the provider token.
// Until it is set, App Store links carry no campaign; Play links always do.
const APPLE_PROVIDER_TOKEN = "";
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
  const url = new URL(href);
  const tags = utm();
  const campaign = tags.utm_campaign || page();
  if (store === "google_play") {
    const referrer = new URLSearchParams({
      utm_source: tags.utm_source || "zeropointlog.com",
      utm_medium: tags.utm_medium || "website",
      utm_campaign: campaign,
    });
    url.searchParams.set("referrer", referrer.toString());
  } else if (APPLE_PROVIDER_TOKEN) {
    url.searchParams.set("pt", APPLE_PROVIDER_TOKEN);
    url.searchParams.set("ct", campaign.slice(0, 40));
    url.searchParams.set("mt", "8");
  }
  return url.toString();
}
