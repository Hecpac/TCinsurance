"use client";

import { useRef, useEffect } from "react";
import GridContainer from "@/components/GridContainer";
import GlareCard from "@/components/ui/GlareCard";
import { runBackgroundTask } from "@/lib/schedule";

const STATS = [
  {
    value: "<24h",
    label: "Tiempo típico de primera respuesta",
  },
  {
    value: "1:1",
    label: "Acompañamiento humano",
  },
  {
    value: "ES/EN",
    label: "Atención bilingüe",
  },
  {
    value: "TX",
    label: "Cobertura con contexto local",
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    runBackgroundTask(() => {
      if (!isMounted) return;

      void (async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (!isMounted || !sectionRef.current) return;

        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.from("[data-stats-rule]", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "elastic.out(0.8, 0.65)",
            scrollTrigger: {
              trigger: "[data-stats-rule]",
              start: "top 90%",
              once: true,
              invalidateOnRefresh: true,
            },
          });

          gsap.from("[data-stats-item]", {
            y: 24,
            autoAlpha: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: "[data-stats-grid]",
              start: "top 86%",
              once: true,
              invalidateOnRefresh: true,
            },
          });

          gsap.from("[data-stats-note]", {
            y: 20,
            autoAlpha: 0,
            duration: 0.65,
            ease: "expo.out",
            scrollTrigger: {
              trigger: "[data-stats-note]",
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
        }, sectionRef);

        cleanup = () => ctx.revert();
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <GridContainer
        as="section"
        id="cifras"
        data-testid="stats-section"
        data-agent-context="service-metrics"
        className="pb-4"
      >
        <p className="col-span-12 text-meta section-kicker pt-24 pb-6">
          Confianza
        </p>

        <hr data-stats-rule className="col-span-12 border-t section-rule" />

        <div
          data-stats-grid
          className="col-span-12 grid grid-cols-1 gap-4 pt-10 pb-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <GlareCard key={stat.label} data-stats-item>
              <article className="flex min-h-[9.5rem] flex-col justify-between border border-m3-outline-variant bg-m3-surface-container px-5 py-6 md:min-h-[11rem]">
                <p className="text-headline font-bold leading-[1.05] tracking-tight text-swiss-black">
                  {stat.value}
                </p>
                <p className="pt-5 text-body leading-relaxed text-m3-on-surface-variant">
                  {stat.label}
                </p>
              </article>
            </GlareCard>
          ))}
        </div>

        <p
          data-stats-note
          className="col-span-12 md:col-start-1 md:col-span-8 text-body text-m3-on-surface-variant pb-20"
        >
          La prioridad es reducir incertidumbre y darte un siguiente paso claro desde la primera conversación.
        </p>
      </GridContainer>
    </div>
  );
}
