"use client";

import { useState } from "react";
import { BODY_LABEL } from "@/lib/import/queue";

/// "Found you", first step: a member number finds you in every file from
/// that body; your name is the fallback (the plan already tried it). The
/// number is saved to your profile when a match it found is added.
export function FoundYou({ bodies, onUse }: { bodies: string[]; onUse: (body: string, number: string) => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  return (
    <section className="card found-you" aria-labelledby="found-you-title">
      <h2 id="found-you-title">Find yourself in every file</h2>
      <p className="sub">Your member number matches you exactly. Without it, we look for your name.</p>
      <div className="found-you-rows">
        {bodies.map((b) => (
          <form
            key={b}
            className="found-you-row"
            onSubmit={(e) => {
              e.preventDefault();
              const v = values[b]?.trim();
              if (v) onUse(b, v);
            }}
          >
            <label className="field">
              <span>{BODY_LABEL[b] ?? b} member number</span>
              <input
                value={values[b] ?? ""}
                onChange={(e) => setValues((s) => ({ ...s, [b]: e.target.value }))}
                placeholder={b === "uspsa" ? "A123456" : b === "idpa" ? "A12345" : "Member number"}
                autoComplete="off"
                spellCheck={false}
              />
            </label>
            <button type="submit" className="pill" disabled={!values[b]?.trim()}>Find me</button>
          </form>
        ))}
      </div>
    </section>
  );
}
