"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

const MILESTONES = [25, 50, 75, 90];

export function useScrollDepth() {
  useEffect(() => {
    const fired = new Set<number>();

    function onScroll() {
      const scrolled =
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) *
        100;

      for (const milestone of MILESTONES) {
        if (!fired.has(milestone) && scrolled >= milestone) {
          fired.add(milestone);
          trackEvent(
            "scroll_depth",
            { percent: milestone, page: window.location.pathname },
            {
              dedupeKey: `scroll_depth_${milestone}_${window.location.pathname}`,
              dedupeWindowMs: 60_000,
            }
          );
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
