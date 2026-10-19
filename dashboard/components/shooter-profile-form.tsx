"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

const BODY_LABEL: Record<string, string> = { uspsa: "USPSA number", idpa: "IDPA number", ipsc: "IPSC number", steelChallenge: "SCSA number", icore: "ICORE number" };

function SaveButton() {
  const { pending } = useFormStatus();
  return <button className="pill brand" disabled={pending}>{pending ? "Saving…" : "Save"}</button>;
}

export function ShooterProfileForm({ division, officialClass, memberNumbers, disciplines, action }: {
  division: string; officialClass: string; memberNumbers: Record<string, string>; disciplines: string[];
  action?: (form: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const bodies = [...new Set([...Object.keys(memberNumbers), ...disciplines.filter((d) => BODY_LABEL[d])])];
  if (!bodies.length) bodies.push("uspsa");

  if (!editing) {
    return (
      <>
        <div className="line"><span className="label">Division</span><span>{division || "—"}</span><button className="textbutton" onClick={() => setEditing(true)} disabled={!action}>Edit</button></div>
        <div className="line"><span className="label">Class</span><span>{officialClass || "—"}</span><span /></div>
        {bodies.map((b) => (
          <div key={b} className="line"><span className="label">{BODY_LABEL[b] ?? `${b} number`}</span><span>{memberNumbers[b] || "—"}</span><span /></div>
        ))}
      </>
    );
  }
  return (
    <form action={action} style={{ padding: "8px 0 16px" }}>
      <div className="fields" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        <div className="field"><label htmlFor="division">Division</label><input id="division" name="division" defaultValue={division} maxLength={40} /></div>
        <div className="field"><label htmlFor="officialClass">Class</label><input id="officialClass" name="officialClass" defaultValue={officialClass} maxLength={12} /></div>
        {bodies.map((b) => (
          <div key={b} className="field">
            <label htmlFor={`m-${b}`}>{BODY_LABEL[b] ?? `${b} number`}</label>
            <input id={`m-${b}`} name={`member:${b}`} defaultValue={memberNumbers[b] ?? ""} maxLength={20} autoComplete="off" />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <SaveButton />
        <button type="button" className="pill" onClick={() => setEditing(false)}>Cancel</button>
      </div>
    </form>
  );
}
