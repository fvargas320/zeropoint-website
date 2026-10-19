import type { Repo } from "@/lib/repo";
import type { AmmoLotRow, FirearmRow, GoalRow, SessionRow, TargetRow } from "@/lib/types";

// Made-up data for the dev-only /preview routes. Never a real member.
const UID = "00000000-0000-4000-8000-000000000000";
const day = (offset: number, hour = 10) => {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  d.setDate(d.getDate() - offset);
  return d.toISOString();
};

const firearms: FirearmRow[] = [
  { uuid: "f1", name: "Glock 34", manufacturer: "Glock", model: "34 Gen5", caliber: "9mm", type: "handgun", session_count: 38, total_rounds: 4210, last_used_at: day(2), cleaning_interval_rounds: 500, photo_url: null, is_favorite: true },
  { uuid: "f2", name: "Sig P320", manufacturer: "Sig Sauer", model: "P320 X5", caliber: "9mm", type: "handgun", session_count: 21, total_rounds: 2380, last_used_at: day(9), cleaning_interval_rounds: 500, photo_url: null, is_favorite: false },
  { uuid: "f3", name: "AR-15", manufacturer: "BCM", model: "Recce 16", caliber: "5.56 NATO", type: "rifle", session_count: 12, total_rounds: 1540, last_used_at: day(16), cleaning_interval_rounds: 1000, photo_url: null, is_favorite: false },
  { uuid: "f4", name: "Tikka T3x", manufacturer: "Tikka", model: "T3x TAC A1", caliber: "6.5 Creedmoor", type: "rifle", session_count: 9, total_rounds: 410, last_used_at: day(30), cleaning_interval_rounds: 200, photo_url: null, is_favorite: false },
  { uuid: "f5", name: "Ruger 10/22", manufacturer: "Ruger", model: "10/22", caliber: ".22 LR", type: "rifle", session_count: 6, total_rounds: 1900, last_used_at: day(45), cleaning_interval_rounds: 500, photo_url: null, is_favorite: false },
];

const ranges = ["Frontier Shoot", "Ridge Run", "Desert Range", "Summit Range"];
const sessions: SessionRow[] = Array.from({ length: 34 }, (_, i) => {
  const f = firearms[i % 4];
  const rounds = [150, 100, 200, 60, 120, 80][i % 6];
  const match = i % 9 === 4;
  return {
    uuid: `s${i}`,
    date_time: day(2 + i * 5, 9 + (i % 6)),
    name: match ? ["Summit Championship", "Area Classic", "Liberty Match", "Year End Bash"][i % 4] : ["Practice", "Bill drills", "Zeroing", "Dot torture", "Steel practice"][i % 5],
    range_name: ranges[i % ranges.length],
    firearm_id: f.uuid,
    firearm_label: f.name,
    caliber: f.caliber,
    distance: f.type === "rifle" ? [100, 200, 300][i % 3] : [7, 15, 25][i % 3],
    distance_unit: "yards",
    round_count: rounds,
    drill_id: null,
    notes: null,
    went_well: i % 3 === 0 ? "Consistent groups, smooth pace." : null,
    needs_work: i % 3 === 0 ? "Slight flinch on rapid fire." : null,
    focus_next: i % 3 === 0 ? "Trigger control at speed." : null,
    score: null,
    max_score: null,
    score_is_time: false,
    score_label: null,
    cost: Math.round(rounds * (f.caliber === "6.5 Creedmoor" ? 1.1 : f.caliber === "5.56 NATO" ? 0.45 : 0.3) * 100) / 100,
    ammo_lot_uuid: i % 3 === 1 ? "a1" : null,
    ammo_deducted: i % 3 === 1 ? rounds : null,
    ammo_brand: "Federal",
    ammo_product: f.caliber === "9mm" ? "124gr FMJ" : null,
    ammo_grain: f.caliber === "9mm" ? 124 : null,
    weather: null,
    temperature_f: 58 + (i % 20),
    wind_mph: i % 8,
    discipline: match ? "uspsa" : null,
    division: match ? "Carry Optics" : null,
    is_match: match,
    match_name: match ? ["Summit Championship", "Area Classic", "Liberty Match", "Year End Bash"][i % 4] : null,
    match_level: match ? "Level 2" : null,
    match_result_json: match ? JSON.stringify({ place: 2 + (i % 4), ofCompetitors: 48 + i, percent: 84 + (i % 9) }) : null,
    match_imported_at: match ? day(1 + i * 5) : null,
    cloud_other_image_paths: i % 4 === 0 ? [`${UID}/sessions/s${i}/other_0.jpg`] : [],
    cloud_video_path: i % 7 === 0 ? `${UID}/sessions/s${i}/video.mp4` : null,
    video_duration_seconds: i % 7 === 0 ? 42 : null,
  };
});

const targets: TargetRow[] = sessions.flatMap((s, i) =>
  i % 2 === 0
    ? [{
        uuid: `t${i}`,
        session_id: s.uuid,
        cloud_image_path: `${UID}/targets/t${i}.jpg`,
        image_type: "target",
        caption: null,
        shot_count: 10,
        group_size_inches: Math.round((2.3 - i * 0.025 + ((i * 7) % 5) * 0.08) * 100) / 100,
        group_size_moa: null,
        created_at: s.date_time,
      }]
    : [],
);

const ammo: AmmoLotRow[] = [
  { uuid: "a1", caliber: "9mm", brand: "Federal", product_name: "American Eagle 124gr FMJ", grain: 124, purchase_quantity: 2000, remaining_quantity: 640, total_cost: 560, purchase_date: day(120), low_stock_threshold: 300 },
  { uuid: "a2", caliber: "5.56 NATO", brand: "PMC", product_name: "X-TAC 55gr", grain: 55, purchase_quantity: 1000, remaining_quantity: 180, total_cost: 420, purchase_date: day(150), low_stock_threshold: 200 },
  { uuid: "a3", caliber: "6.5 Creedmoor", brand: "Hornady", product_name: "ELD Match 140gr", grain: 140, purchase_quantity: 200, remaining_quantity: 120, total_cost: 330, purchase_date: day(90), low_stock_threshold: 40 },
];

const goals: GoalRow[] = [
  { uuid: "g1", metric: "rounds", period: "month", period_start: day(20), target: 2000, status: "active", note: null },
  { uuid: "g2", metric: "sessions", period: "month", period_start: day(20), target: 12, status: "active", note: null },
  { uuid: "g3", metric: "trainingDays", period: "quarter", period_start: day(40), target: 24, status: "active", note: null },
];

function svgTarget(seed: number) {
  const holes = Array.from({ length: 10 }, (_, k) => {
    const a = (seed * 13 + k * 47) % 360;
    const r = 6 + ((seed + k * 5) % 14);
    return `<circle cx="${100 + r * Math.cos(a)}" cy="${96 + r * Math.sin(a)}" r="2.6" fill="#111"/>`;
  }).join("");
  const rings = [80, 64, 48, 32, 16].map((r, k) => `<circle cx="100" cy="100" r="${r}" fill="${k % 2 ? "#f4efe6" : "#1b1b1b"}"/>`).join("");
  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#d9cdb8"/>${rings}<circle cx="100" cy="100" r="8" fill="#e5532a"/>${holes}</svg>`)}`;
}
const svgScene = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="120" fill="#8fa3b8"/><rect y="120" width="200" height="80" fill="#a68a64"/><rect x="88" y="78" width="24" height="44" fill="#efe6d4"/></svg>`)}`;

export const sampleRepo: Repo = {
  sessions: async () => sessions,
  targets: async () => targets,
  firearms: async () => firearms,
  ammoLots: async () => ammo,
  maintenance: async () => [
    { uuid: "m1", firearm_uuid: "f1", type: "cleaning", date: day(12), rounds_at_service: 3800, notes: null },
    { uuid: "m2", firearm_uuid: "f3", type: "cleaning", date: day(40), rounds_at_service: 1200, notes: "Bolt carrier group" },
    { uuid: "m3", firearm_uuid: "f2", type: "part", date: day(70), rounds_at_service: 2000, notes: "Recoil spring replaced" },
  ],
  goals: async () => goals,
  drills: async () => [
    { uuid: "d1", name: "Bill Drill", category: "speed", round_count: 6, par_time_seconds: 2.5, discipline: "uspsa", is_classifier: false, classifier_code: null },
    { uuid: "d2", name: "Dot Torture", category: "accuracy", round_count: 50, par_time_seconds: null, discipline: null, is_classifier: false, classifier_code: null },
    { uuid: "d3", name: "CM 99-11 El Presidente", category: "classifier", round_count: 12, par_time_seconds: 10, discipline: "uspsa", is_classifier: true, classifier_code: "99-11" },
  ],
  ranges: async () => ranges.map((name, i) => ({ uuid: `r${i}`, name, city: null, state: null })),
  presets: async () => [
    { uuid: "p1", name: "Pistol practice", range_name: "Frontier Shoot", firearm_id: "f1", firearm_label: "Glock 34", caliber: "9mm", distance: 15, distance_unit: "yards", drill_id: null },
  ],
  profile: async () => ({
    display_name: "Alex Rivera",
    username: "arivera",
    avatar_url: null,
    shooter_profile: { type: "competitor", disciplines: ["uspsa", "steelChallenge"], division: "Carry Optics", officialClass: "B", memberNumbers: { uspsa: "A123456" } },
  }),
  signedUrls: async (bucket, paths) =>
    bucket === "video-vault" ? {} :
    Object.fromEntries(paths.map((p) => [p, p.includes("/targets/") ? svgTarget(p.length + p.charCodeAt(p.length - 6)) : svgScene])),
};
