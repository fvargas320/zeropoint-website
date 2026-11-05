import { NextResponse } from "next/server";
import { contactTopics } from "@/content/contact";

// The phone app's public project URL and anon key. The anon role can only
// insert into public.feedback here, which alerts the team on Telegram.
const SUPABASE_URL = "https://oxilkmjmtnslhhbcyamx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aWxrbWptdG5zbGhoYmN5YW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NzM4ODEsImV4cCI6MjA4MjU0OTg4MX0.C5U6VyFsDSceU4-c3x-zhhTtFGsXCgIUCRfsD0tJYnk";

const MAX_MESSAGE = 2000;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { topic?: unknown; email?: unknown; message?: unknown; company?: unknown } | null;
  // A hidden field only bots fill in: they get a thank-you and nothing is sent.
  if (body?.company) return NextResponse.json({ ok: true });

  const topic = contactTopics.find((t) => t.value === body?.topic);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!topic || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320 || !message || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Check your email and message, then try again." }, { status: 400 });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/feedback`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ type: topic.type, message: `[${topic.label}] ${message}`, reply_email: email, platform: "website" }),
    cache: "no-store",
  }).catch(() => null);
  if (!res?.ok) {
    console.error("contact form failed", res?.status);
    return NextResponse.json({ error: "That didn't send." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
