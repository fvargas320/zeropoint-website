import type { Metadata } from "next";
import { GetPage } from "@/components/pages/get-page";
import { getDefault } from "@/content/get";
import { foundersLive, matchesLive } from "@/lib/release";

export const metadata: Metadata = {
  title: { absolute: "Get ZeroPoint — Your range days, logged" },
  description:
    "ZeroPoint is the shooting range log for iPhone and Android: log a session in seconds, track every firearm and round, see what you spend, and plan range days with your crew. Free to start.",
  alternates: { canonical: "/get" },
  openGraph: { title: "Your range days, logged.", url: "/get" },
};

// Re-check the App Store hourly so Matches go live with app 1.5.0.
export const revalidate = 3600;

// Where ads and social posts send people. An ad whose campaign names a sport
// or feature gets the matching version (middleware.ts → /get/[variant]).
export default async function Get() {
  const [live, founders] = await Promise.all([matchesLive(), foundersLive()]);
  return <GetPage variant={getDefault} live={live} founders={founders} />;
}
