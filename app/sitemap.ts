import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const pages = ["", "/get", "/shooting-log-app", "/ammo-inventory-app", "/uspsa", "/idpa", "/support", "/privacy", "/terms", "/your-data"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : p === "/idpa" || p === "/uspsa" ? 0.8 : 0.6 }));
}
