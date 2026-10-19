// Row shapes of the synced tables the web reads (public schema). Only the
// columns the web uses; names match the database.

export interface SessionRow {
  uuid: string;
  date_time: string;
  name: string | null;
  range_name: string | null;
  firearm_id: string | null;
  firearm_label: string | null;
  caliber: string | null;
  distance: number | null;
  distance_unit: string | null;
  round_count: number | null;
  drill_id: string | null;
  notes: string | null;
  went_well: string | null;
  needs_work: string | null;
  focus_next: string | null;
  score: number | null;
  max_score: number | null;
  score_is_time: boolean | null;
  score_label: string | null;
  cost: number | null;
  ammo_lot_uuid: string | null;
  ammo_brand: string | null;
  ammo_product: string | null;
  ammo_grain: number | null;
  weather: string | null;
  temperature_f: number | null;
  wind_mph: number | null;
  discipline: string | null;
  division: string | null;
  is_match: boolean | null;
  match_name: string | null;
  match_level: string | null;
  match_result_json: string | null;
  cloud_other_image_paths: string[] | null;
  cloud_video_path: string | null;
  video_duration_seconds: number | null;
}

export interface TargetRow {
  uuid: string;
  session_id: string;
  cloud_image_path: string | null;
  image_type: string | null;
  caption: string | null;
  shot_count: number | null;
  group_size_inches: number | null;
  group_size_moa: number | null;
  created_at: string;
}

export interface FirearmRow {
  uuid: string;
  name: string;
  manufacturer: string | null;
  model: string | null;
  caliber: string | null;
  type: string | null;
  session_count: number | null;
  total_rounds: number | null;
  last_used_at: string | null;
  cleaning_interval_rounds: number | null;
  photo_url: string | null;
  is_favorite: boolean | null;
}

export interface AmmoLotRow {
  uuid: string;
  caliber: string;
  brand: string | null;
  product_name: string | null;
  grain: number | null;
  purchase_quantity: number | null;
  remaining_quantity: number | null;
  total_cost: number | null;
  purchase_date: string | null;
  low_stock_threshold: number | null;
}

export interface MaintenanceRow {
  uuid: string;
  firearm_uuid: string;
  type: string | null;
  date: string;
  rounds_at_service: number | null;
  notes: string | null;
}

export interface GoalRow {
  uuid: string;
  metric: string;
  period: string;
  period_start: string;
  target: number;
  status: string | null;
  note: string | null;
}

export interface DrillRow {
  uuid: string;
  name: string;
  category: string | null;
  round_count: number | null;
  par_time_seconds: number | null;
  discipline: string | null;
  is_classifier: boolean | null;
  classifier_code: string | null;
}

export interface RangeRow {
  uuid: string;
  name: string;
  city: string | null;
  state: string | null;
}

export interface PresetRow {
  uuid: string;
  name: string;
  range_name: string | null;
  firearm_id: string | null;
  firearm_label: string | null;
  caliber: string | null;
  distance: number | null;
  distance_unit: string | null;
  drill_id: string | null;
}

export interface ShooterProfile {
  type?: string;
  disciplines?: string[];
  division?: string;
  officialClass?: string;
  highestClass?: string;
  memberNumbers?: Record<string, string>;
}

export interface ProfileRow {
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  shooter_profile: ShooterProfile | null;
}

export type Bucket = "target-images" | "other-images" | "video-vault" | "firearm-photos";
