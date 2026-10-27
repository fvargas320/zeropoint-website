import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader ctaHref="/get" />
      <main id="main" className="wrap" style={{ padding: "clamp(56px, 12vw, 140px) 0" }}>
        <p className="eyebrow">404</p>
        <h1>Off target.</h1>
        <p className="lede">That page isn&apos;t here. Try the home page instead.</p>
        <p style={{ marginTop: 28, fontWeight: 700 }}><Link href="/">Back to ZeroPoint →</Link></p>
      </main>
      <SiteFooter />
    </>
  );
}
