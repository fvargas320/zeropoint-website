import type {
  AmmoLotRow, Bucket, DrillRow, FirearmRow, GoalRow, MaintenanceRow, PresetRow, ProfileRow, RangeRow, SessionRow, TargetRow,
} from "@/lib/types";

/// Everything a page reads. `supabaseRepo` reads the signed-in member's rows
/// (RLS scopes every query to them); `sampleRepo` is the made-up data the
/// dev-only /preview routes use.
export interface Repo {
  sessions(): Promise<SessionRow[]>;
  targets(): Promise<TargetRow[]>;
  firearms(): Promise<FirearmRow[]>;
  ammoLots(): Promise<AmmoLotRow[]>;
  maintenance(): Promise<MaintenanceRow[]>;
  goals(): Promise<GoalRow[]>;
  drills(): Promise<DrillRow[]>;
  ranges(): Promise<RangeRow[]>;
  presets(): Promise<PresetRow[]>;
  profile(): Promise<ProfileRow | null>;
  /// Short-lived URLs for private storage objects; missing ones are omitted.
  signedUrls(bucket: Bucket, paths: string[]): Promise<Record<string, string>>;
}

export const SESSION_COLUMNS =
  "uuid, date_time, name, range_name, firearm_id, firearm_label, caliber, distance, distance_unit, round_count, drill_id, notes, went_well, needs_work, focus_next, score, max_score, score_is_time, score_label, cost, ammo_lot_uuid, ammo_brand, ammo_product, ammo_grain, weather, temperature_f, wind_mph, discipline, division, is_match, match_name, match_level, match_result_json, cloud_other_image_paths, cloud_video_path, video_duration_seconds";
