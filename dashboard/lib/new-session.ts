// Shared between the Log-a-session form (client) and its save action (server).

export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif"];
export const VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/x-m4v"];
export const PHOTO_MAX = 15 * 1024 * 1024; // target-images bucket limit
export const VIDEO_MAX = 50 * 1024 * 1024; // video-vault bucket limit

export interface UploadedMedia {
  kind: "target" | "social" | "video";
  uuid: string; // target row uuid (photos) or the session uuid (video)
  path: string; // storage object path, always "<uid>/…"
  durationSeconds?: number;
}

export interface NewSessionInput {
  sessionUuid: string;
  date: string; // yyyy-mm-dd (member's local date)
  time: string; // HH:mm
  tzOffsetMinutes: number; // from the browser, so the stored instant is right
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
  media: UploadedMedia[];
}

export const extOf = (file: File) => {
  const fromName = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png", "heic", "heif", "mp4", "mov", "m4v"].includes(fromName)) return fromName === "jpeg" ? "jpg" : fromName;
  return file.type === "image/png" ? "png" : file.type.startsWith("video/") ? "mp4" : "jpg";
};
