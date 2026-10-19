import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export interface ProStatus {
  pro: boolean;
  source: "grant" | "subscription" | "revenuecat" | null;
  expiresAt: string | null;
}

/// Server-side Pro check for the signed-in user. Two steps, cheapest first:
/// 1. `my_pro_status()` RPC — premium grants + the RevenueCat webhook mirror.
/// 2. Only on "no": the `pro-status` edge function, which adds the live
///    RevenueCat lookup (a purchase made on the phone a minute ago).
/// Anything that fails counts as "not Pro" for display; every Pro *action*
/// is re-checked by its own edge function with isProUser().
export async function getProStatus(supabase: SupabaseClient, accessToken: string): Promise<ProStatus> {
  const { data, error } = await supabase.rpc("my_pro_status");
  if (!error && data && typeof data === "object" && (data as { pro?: unknown }).pro === true) {
    const d = data as { source?: ProStatus["source"]; expires_at?: string | null };
    return { pro: true, source: d.source ?? null, expiresAt: d.expires_at ?? null };
  }
  if (error) console.warn("my_pro_status failed", error.code);
  return { pro: await liveCheck(accessToken), source: "revenuecat", expiresAt: null };
}

async function liveCheck(accessToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${env.supabaseUrl()}/functions/v1/pro-status`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, apikey: env.supabaseAnonKey() },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return false;
    const json = (await res.json()) as { pro?: unknown };
    return json.pro === true;
  } catch {
    return false;
  }
}
