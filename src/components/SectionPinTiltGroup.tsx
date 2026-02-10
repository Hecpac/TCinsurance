"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { runBackgroundTask } from "@/lib/schedule";

type KillableTrigger = {
  kill: () => void;
};

interface SectionPinTiltGroupProps {
  children: ReactNode;
  sectionSelector?: string;
  minWidth?: number;
  parallaxDistance?: number;
  scrubValue?: number;
}

export default function SectionPinTiltGroup({
  children,
  sectionSelector = "[data-pin-tilt-section='true']",
  minWidth = 1024,
  parallaxDistance = 110,
  scrubValue = 0.7,
}: SectionPinTiltGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    runBackgroundTask(() => {
      if (!isMounted || !containerRef.current) return;

      void (async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (!isMounted || !containerRef.current) return;

        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        mm.add(
          {
            allowMotion: "(prefers-reduced-motion: no-preference)",
            desktop: `(min-width: ${minWidth}px)`,
          },
          (context) => {
            const { allowMotion, desktop } = context.conditions as {
              allowMotion?: boolean;
              desktop?: boolean;
            };

            if (!allowMotion || !desktop || !containerRef.current) return;

            const localTriggers: KillableTrigger[] = [];

            const ctx = gsap.context(() => {
              const sections = Array.from(
                containerRef.current!.querySelectorAll<HTMLElement>(sectionSelector)
              );

              sections.forEach((section, index) => {
                const direction = index % 2 === 0 ? -1 : 1;
                const startY = direction * parallaxDistance;
                const endY = direction * -parallaxDistance;

                const parallaxTween = gsap.fromTo(
                  section,
                  {
                    y: startY,
                    scale: 0.985,
                    transformOrigin: "center center",
                    willChange: "transform",
                  },
                  {
                    y: endY,
                    scale: 1.015,
                    ease: "none",
                    scrollTrigger: {
                      trigger: section,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: scrubValue,
                      invalidateOnRefresh: true,
                    },
                  }
                );

                if (parallaxTween.scrollTrigger) {
                  localTriggers.push(parallaxTween.scrollTrigger as KillableTrigger);
                }
              });
            }, containerRef);

            const refreshScrollTriggers = () => ScrollTrigger.refresh();
            window.addEventListener("resize", refreshScrollTriggers);
            ScrollTrigger.refresh();

            return () => {
              window.removeEventListener("resize", refreshScrollTriggers);
              localTriggers.forEach((trigger) => trigger.kill());
              ctx.revert();
            };
          }
        );

        cleanup = () => {
          mm.revert();
        };
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [minWidth, parallaxDistance, scrubValue, sectionSelector]);

  return <div ref={containerRef}>{children}</div>;
}
