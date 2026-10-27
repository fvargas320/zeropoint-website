import type { NextConfig } from "next";

// The /r (invite) and /g (gift) link pages are static HTML in public/ with
// their own scripts; the app opens these URLs as universal / App Links.
const linkPages = ["r", "g"].flatMap((p) => [
  { source: `/${p}`, destination: `/${p}/index.html` },
  { source: `/${p}/:code`, destination: `/${p}/index.html` },
]);

// Pages that used to be served as .html files keep their old URLs working.
const legacyHtml = ["privacy", "terms", "support", "your-data", "get", "shooting-log-app", "ammo-inventory-app"].map((p) => ({
  source: `/${p}.html`,
  destination: `/${p}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1440, 1920],
    imageSizes: [96, 160, 240, 320],
  },
  async redirects() {
    return [
      { source: "/i/:code", destination: "/r/:code", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      ...legacyHtml,
    ];
  },
  async rewrites() {
    return linkPages;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        // No file extension, so say it's JSON explicitly (Apple's app-link check).
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        source: "/assets/:path*",
        // File names aren't hashed, so keep this short enough that a replaced
        // image shows up within a day.
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
