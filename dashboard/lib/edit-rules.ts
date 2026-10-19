import type { SessionRow } from "@/lib/types";

/// What the web may change on an existing session. The phone owns ammo:
/// once rounds came off a lot there (ammo_deducted, or legacy rows with a
/// lot and a round count), changing them here would leave the lot wrong.
/// Matches keep their official results and confirmed rounds read-only.
export function editLocks(s: Pick<SessionRow, "is_match" | "ammo_lot_uuid" | "ammo_deducted" | "round_count">) {
  if (s.is_match) {
    return { roundsLocked: true, reason: "Rounds and results for a match are set on your phone, so they stay as imported here." };
  }
  const deducted = s.ammo_lot_uuid ? s.ammo_deducted ?? s.round_count ?? 0 : 0;
  if (deducted > 0) {
    return {
      roundsLocked: true,
      reason: `${deducted.toLocaleString()} rounds came off your ammo on your phone. Change rounds or ammo there so your count stays right.`,
    };
  }
  return { roundsLocked: false, reason: null as string | null };
}

/// The rounds a delete gives back to the lot, exactly as the phone does.
export function roundsGivenBack(s: Pick<SessionRow, "ammo_lot_uuid" | "ammo_deducted" | "round_count">) {
  return s.ammo_lot_uuid ? s.ammo_deducted ?? s.round_count ?? 0 : 0;
}
