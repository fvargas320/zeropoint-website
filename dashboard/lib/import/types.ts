/// What zp_core's ImportApi.plan returns (rangeai packages/zp_core/lib/web/
/// import_api.dart). Keep in step with ImportApi.version.
export const CORE_VERSION = 1;

export interface PlanShooter {
  key: string;
  name: string;
  memberNumber: string | null;
  division: string | null;
  classLetter: string | null;
  place: number | null;
  ofCompetitors: number | null;
  percent: number | null;
  dq: boolean;
  hits: number;
  /// A sanctioning body's number (not a squad entry number).
  memberLooksReal: boolean;
}

export interface PlanCheck {
  path: string;
  shooter: number | null;
  reason: string | null;
  text: string | null;
}

export interface PlanMatch {
  key: string;
  contentHash: string;
  fileHashes: string[];
  files: string[];
  byteCount: number;
  matchId: string | null;
  matchName: string;
  matchDate: string | null;
  discipline: string | null;
  disciplineLabel: string;
  body: string | null;
  sourceFormat: string | null;
  tier: string | null;
  shooterCount: number;
  stageCount: number;
  backfill: boolean;
  me: PlanShooter | null;
  matchedBy: "member number" | "name" | "the only row" | null;
  likely: PlanShooter[];
  shooters: PlanShooter[];
  rounds: { suggested: number; basis: "typed" | "minimum" | "hits" | "none"; minimum: number | null };
  checks: PlanCheck[];
}

export interface PlanFailure {
  files: string[];
  code: string;
  error: string;
}

export interface PlanReply {
  version?: number;
  matches?: PlanMatch[];
  failed?: PlanFailure[];
  error?: string;
  code?: string;
}

export interface DroppedFile {
  name: string;
  size: number;
  base64: string;
  sha256: string;
}

export type RowState =
  | { kind: "ready" }
  | { kind: "review"; why: string }
  | { kind: "duplicate"; sessionUuid: string | null; why: "file" | "match" }
  | { kind: "adding" }
  | { kind: "added"; sessionUuid: string }
  | { kind: "error"; message: string };

/// One match on the queue, with the user's choices.
export interface QueueRow {
  match: PlanMatch;
  /// The picked row: `sid(shooter)` (key + division), not the bare key.
  shooterKey: string | null;
  matchedBy: string | null;
  rounds: string;
  checked: boolean;
  /// Save the picked row's member number to the profile. Only on the
  /// user's say-so, or for a number they typed in "Find yourself".
  rememberMember: boolean;
  state: RowState;
}
