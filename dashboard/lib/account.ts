import type { User } from "@supabase/supabase-js";

/// "alex@example.com with Apple". Shown on the paywall and the account menu so
/// people can match the account they use on their phone (Apple Hide My Email
/// users otherwise create a second, empty account on the web).
export function accountLabel(user: User): { email: string; provider: string } {
  const provider = String(user.app_metadata?.provider ?? "email");
  const email = user.email ?? "your account";
  const relay = email.endsWith("@privaterelay.appleid.com");
  const name =
    provider === "apple" ? (relay ? "Apple (hidden email)" : "Apple") : provider === "google" ? "Google" : "email";
  return { email: relay ? "a hidden Apple email" : email, provider: name };
}
