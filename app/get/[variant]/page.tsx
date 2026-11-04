import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GetPage } from "@/components/pages/get-page";
import { getVariants } from "@/content/get";
import { matchesLive } from "@/lib/release";

// /get opened with the promise of the ad that sent the visitor. Ads link to
// /get?utm_campaign=… and middleware.ts rewrites here; the URL stays /get.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return getVariants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant: slug } = await params;
  const v = getVariants.find((x) => x.slug === slug);
  return {
    title: { absolute: `Get ZeroPoint — ${v?.h1 ?? "Ditch the notebook"}` },
    description: v?.lede,
    alternates: { canonical: "/get" },
    robots: { index: false },
  };
}

export default async function GetVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant: slug } = await params;
  const variant = getVariants.find((v) => v.slug === slug);
  if (!variant) notFound();
  return <GetPage variant={variant} live={await matchesLive()} />;
}
