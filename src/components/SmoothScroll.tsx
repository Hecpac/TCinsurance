"use client";

import { useEffect } from "react";
import { runBackgroundTask } from "@/lib/schedule";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktopViewport = window.matchMedia("(min-width: 768px)").matches;

    if (prefersReducedMotion || !isDesktopViewport) return;

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    runBackgroundTask(() => {
      if (!isMounted) return;

      void (async () => {
        const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
          await Promise.all([
            import("lenis"),
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);

        if (!isMounted) return;

        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
