import { notFound } from "next/navigation";

/// Design previews of the signed-in pages with sample data. Local dev only:
/// a production build answers 404, so they can never show real or fake data
/// to visitors.
export function devOnly() {
  if (process.env.NODE_ENV !== "development") notFound();
}

export const previewAccount = { email: "alex@example.com", provider: "Apple" };
