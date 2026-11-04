import type { Metadata } from "next";
import { GetPage } from "@/components/pages/get-page";
import { getDefault } from "@/content/get";
import { matchesLive } from "@/lib/release";

export const metadata: Metadata = {
  title: { absolute: "Get ZeroPoint — Ditch the notebook" },
  description:
    "ZeroPoint is the shooting range log for iPhone and Android: log a session in seconds, track every firearm and round, see what you spend, and plan range days with your crew. Free to start.",
  alternates: { canonical: "/get" },
  openGraph: { title: "Ditch the notebook. Every range day, logged.", url: "/get" },
};

// Re-check the App Store hourly so Matches go live with app 1.5.0.
export const revalidate = 3600;

// Where ads and social posts send people. An ad whose campaign names a sport
// or feature gets the matching version (middleware.ts → /get/[variant]).
export default async function Get() {
  return <GetPage variant={getDefault} live={await matchesLive()} />;
}
