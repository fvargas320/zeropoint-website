// Shared by the session form (client) and the edit page (server).

const pad = (n: number) => String(n).padStart(2, "0");

export interface SessionFormValues {
  sessionUuid: string;
  /// The stored instant. The form turns it into local date/time in the
  /// browser: the server may run in another time zone (UTC on Vercel).
  dateTimeIso?: string;
  date: string;
  time: string;
  rangeName: string;
  firearmId: string;
  ammoLotUuid: string;
  rounds: string;
  distance: string;
  distanceUnit: "yards" | "meters";
  drillId: string;
  cost: string;
  wentWell: string;
  needsWork: string;
  focusNext: string;
  notes: string;
}

export interface ExistingMedia {
  uuid: string; // target uuid, or "video"
  url: string | null;
  kind: "target" | "social" | "video";
}

/// Form values for an existing session row, in the member's local time.
export function valuesFromRow(s: {
  uuid: string; date_time: string; range_name: string | null; firearm_id: string | null; ammo_lot_uuid: string | null;
  round_count: number | null; distance: number | null; distance_unit: string | null; drill_id: string | null; cost: number | null;
  went_well: string | null; needs_work: string | null; focus_next: string | null; notes: string | null;
}): SessionFormValues {
  const d = new Date(s.date_time);
  return {
    sessionUuid: s.uuid,
    dateTimeIso: s.date_time,
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
    rangeName: s.range_name ?? "",
    firearmId: s.firearm_id ?? "",
    ammoLotUuid: s.ammo_lot_uuid ?? "",
    rounds: s.round_count != null ? String(s.round_count) : "",
    distance: s.distance != null ? String(s.distance) : "",
    distanceUnit: s.distance_unit === "meters" ? "meters" : "yards",
    drillId: s.drill_id ?? "",
    cost: s.cost != null ? String(s.cost) : "",
    wentWell: s.went_well ?? "",
    needsWork: s.needs_work ?? "",
    focusNext: s.focus_next ?? "",
    notes: s.notes ?? "",
  };
}

