"use client";

import { useEffect, useState } from "react";
import { salePhase, type SalePhase } from "@/content/site";

/** The sale phase in the visitor's own time zone. `initial` is what the page
    was rendered with, so the first paint matches the server. */
export function useSalePhase(initial: SalePhase) {
  const [phase, setPhase] = useState(initial);
  useEffect(() => setPhase(salePhase(new Date())), []);
  return phase;
}
