import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { type Repo, SESSION_COLUMNS } from "@/lib/repo";
import type { Bucket } from "@/lib/types";

const SIGNED_URL_SECONDS = 60 * 60;

export function supabaseRepo(supabase: SupabaseClient, uid: string): Repo {
  async function rows<T>(table: string, columns: string, order?: [string, boolean]): Promise<T[]> {
    let q = supabase.from(table).select(columns).limit(5000);
    if (order) q = q.order(order[0], { ascending: order[1] });
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    return (data ?? []) as T[];
  }
  return {
    sessions: () => rows("sessions", SESSION_COLUMNS, ["date_time", false]),
    targets: () =>
      rows("targets", "uuid, session_id, cloud_image_path, image_type, caption, shot_count, group_size_inches, group_size_moa, created_at", ["created_at", true]),
    firearms: () =>
      rows("firearms", "uuid, name, manufacturer, model, caliber, type, session_count, total_rounds, last_used_at, cleaning_interval_rounds, photo_url, is_favorite", ["name", true]),
    ammoLots: () =>
      rows("ammo_lots", "uuid, caliber, brand, product_name, grain, purchase_quantity, remaining_quantity, total_cost, purchase_date, low_stock_threshold", ["caliber", true]),
    maintenance: () => rows("maintenance_entries", "uuid, firearm_uuid, type, date, rounds_at_service, notes", ["date", false]),
    goals: () => rows("goals", "uuid, metric, period, period_start, target, status, note", ["created_at", true]),
    drills: () => rows("custom_drills", "uuid, name, category, round_count, par_time_seconds, discipline, is_classifier, classifier_code", ["name", true]),
    ranges: () => rows("ranges", "uuid, name, city, state", ["name", true]),
    presets: () =>
      rows("session_presets", "uuid, name, range_name, firearm_id, firearm_label, caliber, distance, distance_unit, drill_id", ["name", true]),
    profile: async () => {
      const { data } = await supabase
        .from("user_profiles")
        .select("display_name, username, avatar_url, shooter_profile")
        .eq("user_id", uid)
        .maybeSingle();
      return data ?? null;
    },
    signedUrls: async (bucket: Bucket, paths: string[]) => {
      // Only ever sign objects in the member's own folder.
      const own = [...new Set(paths.filter((p) => p && p.startsWith(`${uid}/`)))];
      if (!own.length) return {};
      const { data } = await supabase.storage.from(bucket).createSignedUrls(own, SIGNED_URL_SECONDS);
      const out: Record<string, string> = {};
      for (const item of data ?? []) if (item.path && item.signedUrl) out[item.path] = item.signedUrl;
      return out;
    },
  };
}

