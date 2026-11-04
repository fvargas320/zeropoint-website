"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { capture, page, utm, withCampaign } from "@/lib/analytics";

/**
 * Page views on every route change, store_click for any link marked
 * data-store (the campaign is added to the store URL at tap time), and
 * section_view the first time a [data-track-view] block reaches the middle
 * of the screen (tall blocks count too),
 * so a funnel can show how far down a page visitors get.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    capture("$pageview");
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const section = (e.target as HTMLElement).dataset.trackView!;
          if (!e.isIntersecting || seen.has(section)) continue;
          seen.add(section);
          io.unobserve(e.target);
          capture("section_view", { section });
        }
      },
      { rootMargin: "0px 0px -45% 0px" },
    );
    document.querySelectorAll("[data-track-view]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[data-store]");
      if (!link) return;
      const store = link.dataset.store!;
      link.href = withCampaign(link.href, store);
      const placement = link.closest<HTMLElement>("[data-placement]")?.dataset.placement ?? "page";
      capture("store_click", { store, placement, campaign: utm().utm_campaign || page() });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
