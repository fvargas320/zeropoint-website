import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TimeZoneCookie } from "@/components/time-zone-cookie";

const jakarta = localFont({
  src: [
    { path: "./fonts/jakarta-regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/jakarta-bold.ttf", weight: "700 800", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZeroPoint",
  description: "Your season, on a big screen.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        {children}
        <TimeZoneCookie />
      </body>
    </html>
  );
}
