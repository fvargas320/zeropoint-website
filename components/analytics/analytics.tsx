"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { capture, page, utm, withCampaign } from "@/lib/analytics";

/**
 * Page views on every route change, and store_click for any link marked
 * data-store. The campaign is added to the store URL at tap time.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    capture("$pageview");
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
