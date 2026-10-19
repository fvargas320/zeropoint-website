"use client";

import { useRef, useState } from "react";

/// Delete with a confirm that says exactly what happens, like the app:
/// photos and video go too, and rounds the phone took off a lot go back.
export function DeleteSession({ name, givesBack, lotLabel, isMatch, action }: {
  name: string;
  givesBack: number;
  lotLabel: string | null;
  isMatch: boolean;
  action?: () => Promise<{ error: string } | void>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    if (!action) return;
    setBusy(true);
    setError(null);
    const res = await action();
    if (res && "error" in res) {
      setError(res.error);
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className="pill danger" onClick={() => dialog.current?.showModal()}>Delete</button>
      <dialog ref={dialog} className="confirm" aria-labelledby="del-title">
        <h2 id="del-title">Delete {name}?</h2>
        <p className="muted">
          Its photos and video are deleted too, here and on your phone.
          {givesBack > 0 && (
            <> <b>{givesBack.toLocaleString()} rounds</b> go back to {lotLabel ?? "your ammo"}, as if you&apos;d never shot them.</>
          )}
          {isMatch && <> The match&apos;s imported results go with it; you can import them again.</>}
        </p>
        <p className="quiet">This can&apos;t be undone.</p>
        {error && <div className="notice warn" role="alert">{error}</div>}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button type="button" className="pill" onClick={() => dialog.current?.close()} disabled={busy}>Cancel</button>
          <button type="button" className="pill danger-fill" onClick={confirm} disabled={busy || !action}>
            {busy ? "Deleting…" : action ? "Delete session" : "Delete (preview)"}
          </button>
        </div>
      </dialog>
    </>
  );
}
