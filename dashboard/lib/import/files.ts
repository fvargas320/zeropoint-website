"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import { CORE_VERSION, type DroppedFile, type PlanMatch, type PlanReply } from "./types";

/// Formats the import page takes. Photos and scans go through the phone's
/// AI reader for now.
export const ACCEPT = ".psc,.html,.htm,.pdf,.json,.txt";
export const MAX_FILE_BYTES = 8 * 1024 * 1024;

async function sha256Hex(data: BufferSource): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function toBase64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

export async function readDropped(file: File): Promise<DroppedFile> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  return { name: file.name, size: file.size, base64: toBase64(bytes), sha256: await sha256Hex(bytes) };
}

/// `match_sources.content_hash` of these files: sha256 over each file's
/// sha256, sorted and comma-joined (MatchArchiveRules.hashOfHashes).
export function contentHash(fileHashes: string[]): Promise<string> {
  return sha256Hex(new TextEncoder().encode([...fileHashes].sort().join(",")));
}

let worker: Worker | null = null;
let seq = 0;
const waiting = new Map<number, (r: PlanReply) => void>();

/// ImportApi.plan in a Web Worker, so 30 files don't freeze the page.
export function planInWorker(request: Record<string, unknown>): Promise<PlanReply> {
  if (!worker) {
    worker = new Worker("/import-worker.js");
    worker.onmessage = (e: MessageEvent<{ id: number; reply: PlanReply }>) => {
      waiting.get(e.data.id)?.(e.data.reply);
      waiting.delete(e.data.id);
    };
    worker.onerror = (e) => {
      for (const done of waiting.values()) done({ error: e.message || "The reader failed to start", code: "failed" });
      waiting.clear();
      worker = null;
    };
  }
  const id = ++seq;
  return new Promise((resolve) => {
    waiting.set(id, resolve);
    worker!.postMessage({ id, request });
  });
}

/// Which of [hashes] (per-file content hashes) the user already imported.
/// Content hashes among [hashes] whose match is still in ZeroPoint. A source
/// alone isn't enough: the server keeps a deleted match's field and sources
/// for a few minutes (match_entries_drop_orphan_field's grace), and that
/// match must be importable again, so its field needs an entry too.
export async function knownSources(supabase: SupabaseClient, uid: string, hashes: string[]): Promise<Set<string>> {
  if (!hashes.length) return new Set();
  const { data, error } = await supabase.from("match_sources").select("content_hash, field_uuid").eq("user_id", uid).in("content_hash", hashes);
  if (error) throw error;
  const fields = [...new Set((data ?? []).map((r) => r.field_uuid as string).filter(Boolean))];
  if (!fields.length) return new Set();
  const { data: entries, error: e2 } = await supabase.from("match_entries").select("field_uuid").eq("user_id", uid).in("field_uuid", fields);
  if (e2) throw e2;
  const held = new Set((entries ?? []).map((r) => r.field_uuid as string));
  return new Set((data ?? []).filter((r) => held.has(r.field_uuid as string)).map((r) => r.content_hash as string));
}

/// A session that already holds [m]'s match: its field by match id, else
/// by match key, then an entry whose session still exists
/// (MatchArchiveService.sessionsForMatch).
export async function heldBy(supabase: SupabaseClient, uid: string, m: PlanMatch): Promise<string | null> {
  let fieldUuid: string | null = null;
  if (m.matchId?.trim()) {
    const { data } = await supabase.from("match_fields").select("uuid").eq("user_id", uid).eq("match_id", m.matchId.trim()).limit(1);
    fieldUuid = data?.[0]?.uuid ?? null;
  }
  if (!fieldUuid) {
    const { data } = await supabase.from("match_fields").select("uuid").eq("user_id", uid).eq("match_key", m.key).limit(1);
    fieldUuid = data?.[0]?.uuid ?? null;
  }
  if (!fieldUuid) return null;
  const { data: entries } = await supabase.from("match_entries").select("session_uuid").eq("user_id", uid).eq("field_uuid", fieldUuid);
  const uuids = (entries ?? []).map((e) => e.session_uuid as string);
  if (!uuids.length) return null;
  const { data: sessions } = await supabase.from("sessions").select("uuid").eq("user_id", uid).in("uuid", uuids).limit(1);
  return sessions?.[0]?.uuid ?? null;
}

/// The browser's UTC offset at 09:00 on the match day (DST-correct): the
/// phone stores a past match at 09:00 local.
export function offsetOn(matchDate: string | null): number {
  const [y, m, d] = (matchDate ?? "").split("-").map(Number);
  const at = y && m && d ? new Date(y, m - 1, d, 9) : new Date();
  return -at.getTimezoneOffset();
}

export type AddResult =
  | { ok: true; sessionUuid: string }
  | { ok: false; status: number; error: string; duplicate?: string; sessionUuid?: string };

/// One match through the import-match edge function (auth, Pro, re-read
/// from the files, one transaction).
export async function addMatch(supabase: SupabaseClient, files: DroppedFile[], shooterKey: string, division: string | null, rounds: number, matchDate: string | null, rememberMember: boolean): Promise<AddResult> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return { ok: false, status: 401, error: "unauthenticated" };
  const res = await fetch(`${env.supabaseUrl()}/functions/v1/import-match`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, apikey: env.supabaseAnonKey(), "Content-Type": "application/json" },
    body: JSON.stringify({
      version: CORE_VERSION,
      files: files.map((f) => ({ name: f.name, base64: f.base64 })),
      shooterKey,
      division,
      rounds,
      utcOffsetMinutes: offsetOn(matchDate),
      rememberMember,
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (res.ok) return { ok: true, sessionUuid: json.sessionUuid };
  return { ok: false, status: res.status, error: json.error ?? "failed", duplicate: json.duplicate, sessionUuid: json.sessionUuid };
}
