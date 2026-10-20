import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// OAuth (Apple, Google) and magic links land here with ?code=… (PKCE).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  // Supabase sends expired or reused links back with ?error_code=otp_expired.
  if (searchParams.get("error_code") === "otp_expired") {
    return NextResponse.redirect(`${origin}/login?error=expired`);
  }
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${safeNext}`);
    // Usually a magic link opened in a different browser from the one that
    // asked for it, so the PKCE code verifier cookie is missing.
    console.warn("auth callback: code exchange failed:", error.message);
    return NextResponse.redirect(`${origin}/login?error=browser`);
  }
  return NextResponse.redirect(`${origin}/login?error=callback`);
}
