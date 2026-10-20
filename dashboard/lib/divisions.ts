// The phone stores a match's division as a code ("PROD") and shows its name
// ("Production"). Same tables as rangeai packages/zp_core
// lib/competition/models/discipline.dart (Discipline.divisions); keep them in step.

const USPSA: Record<string, string> = {
  OPEN: "Open", LTD: "Limited", LO: "Limited Optics", CO: "Carry Optics", PROD: "Production",
  PCC: "PCC", SS: "Single Stack", REV: "Revolver", L10: "Limited 10",
};
const SCSA: Record<string, string> = {
  CO: "Carry Optics", OPN: "Open", LTD: "Limited", LO: "Limited Optics", PROD: "Production",
  SS: "Single Stack", ISR: "Iron Sight Revolver", OSR: "Optical Sight Revolver", PCCO: "PCC Optic",
  PCCI: "PCC Iron", RFPO: "Rimfire Pistol Optics", RFPI: "Rimfire Pistol Iron", RFRO: "Rimfire Rifle Optics",
  RFRI: "Rimfire Rifle Iron", RRI: "Rimfire Revolver Iron", RRO: "Rimfire Revolver Optic",
};
const PRS: Record<string, string> = { OPEN: "Open", TAC: "Tactical", PROD: "Production", GAS: "Gas Gun", SPORT: "Sportsman" };
const NRL22: Record<string, string> = {
  BASE: "Base", OPEN: "Open", AIR: "Air Rifle", LADIES: "Ladies", YG: "Young Guns", OG: "Old Guns", ADAPT: "Adaptive",
};
const MULTIGUN: Record<string, string> = { OPEN: "Open", TAC: "Tactical Optics", LTD: "Limited", HM: "Heavy Metal", PCC: "PCC" };
const BULLSEYE: Record<string, string> = { RIMFIRE: ".22", CF: "Centerfire", "45": ".45" };

const BY_DISCIPLINE: Record<string, Record<string, string>> = {
  uspsa: USPSA, pcsl: USPSA, steelChallenge: SCSA, prs: PRS, nrl22: NRL22, multigun: MULTIGUN, bullseye: BULLSEYE,
};

/// Display name for a stored division code; the stored text itself when it
/// isn't a known code (free text, IDPA codes, older imports with full names).
export function divisionName(discipline: string | null | undefined, code: string | null | undefined): string | null {
  if (!code) return null;
  return BY_DISCIPLINE[discipline ?? ""]?.[code] ?? code;
}
