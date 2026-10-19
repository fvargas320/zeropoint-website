"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { env } from "@/lib/env";

export function SignInOptions({ next }: { next: string }) {
  const [mode, setMode] = useState<"buttons" | "email" | "sent">("buttons");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectTo = `${env.siteUrl()}/auth/callback?next=${encodeURIComponent(next)}`;

  async function oauth(provider: "apple" | "google") {
    setBusy(true);
    setError(null);
    const { error } = await createClient().auth.signInWithOAuth({ provider, options: { redirectTo } });
    if (error) {
      setError("That didn't work. Try again, or use another way to sign in.");
      setBusy(false);
    }
  }

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      // Never create a web-only account: people must sign up in the app, so
      // their purchases and data live on one account.
      options: { emailRedirectTo: redirectTo, shouldCreateUser: false },
    });
    setBusy(false);
    if (error) setError("We couldn't send a link to that address. Is it the one you use in the app?");
    else setMode("sent");
  }

  if (mode === "sent") {
    return (
      <div className="notice" role="status">
        Check <b>{email}</b> for a sign-in link. It opens this page signed in.
      </div>
    );
  }

  return (
    <>
      {mode === "buttons" ? (
        <>
          <button className="pill light block" onClick={() => oauth("apple")} disabled={busy}>
            Continue with Apple
          </button>
          <button className="pill block" onClick={() => oauth("google")} disabled={busy}>
            Continue with Google
          </button>
          <button className="pill block" onClick={() => setMode("email")} disabled={busy}>
            Continue with email
          </button>
        </>
      ) : (
        <form className="email" onSubmit={sendLink}>
          <label className="muted" htmlFor="email">The email you use in the ZeroPoint app</label>
          <input
            id="email"
            className="input"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="pill brand block" disabled={busy || !email}>
            Email me a sign-in link
          </button>
          <button type="button" className="textbutton" onClick={() => setMode("buttons")}>
            Other ways to sign in
          </button>
        </form>
      )}
      {error && <div className="notice warn" role="alert">{error}</div>}
    </>
  );
}
