import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { Analytics } from "@/components/analytics/analytics";
import "./globals.css";

const jakarta = localFont({
  src: [
    { path: "../assets/fonts/jakarta-regular.woff2", weight: "400" },
    { path: "../assets/fonts/jakarta-bold.woff2", weight: "700" },
    { path: "../assets/fonts/jakarta-extrabold.woff2", weight: "800" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ZeroPoint: Shooting Log App for Range Days, Ammo & Matches", template: "%s — ZeroPoint" },
  description:
    "Log range sessions, track ammo, firearms and round counts, and import USPSA and IDPA results. The shooting log app for iPhone and Android. Free to start.",
  applicationName: site.name,
  itunes: { appId: "6757300865" },
  openGraph: { type: "website", siteName: site.name },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#ece3d1", viewportFit: "cover" };

// Before first paint: mark that JS runs (media fades in only then) and tag the
// platform so the visitor's own store button leads without a jump.
const platformScript = `(()=>{var u=navigator.userAgent,d=document.documentElement;d.classList.add("js");d.dataset.platform=/iPhone|iPad|iPod/.test(u)||(/Macintosh/.test(u)&&navigator.maxTouchPoints>1)?"ios":/Android/.test(u)?"android":"desktop"})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: platformScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
