"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import GlareCard from "@/components/ui/glare-card";
import { processSteps } from "@/data/process";
import { runBackgroundTask } from "@/lib/schedule";
import { HOME_SECTION_PATHS } from "@/config/site";

export default function Process() {
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
        const triggers: ScrollTrigger[] = [];
        const ctx = gsap.context(() => {
          const headerAnim = gsap.from("[data-process-header]", {
            scrollTrigger: { trigger: "[data-process-header]", start: "top 88%", once: true },
            y: 24,
            opacity: 0,
            duration: 0.65,
            ease: "expo.out",
          });
          if (headerAnim.scrollTrigger) triggers.push(headerAnim.scrollTrigger);

          const lineAnim = gsap.from("[data-process-line]", {
            scrollTrigger: { trigger: "[data-process-line]", start: "top 90%", once: true },
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "elastic.out(0.8, 0.65)",
          });
          if (lineAnim.scrollTrigger) triggers.push(lineAnim.scrollTrigger);

          const cardsAnim = gsap.from("[data-process-card]", {
            scrollTrigger: { trigger: "[data-process-grid]", start: "top 86%", once: true },
            y: 26,
            opacity: 0,
            duration: 0.72,
            stagger: 0.12,
            ease: "expo.out",
          });
          if (cardsAnim.scrollTrigger) triggers.push(cardsAnim.scrollTrigger);
        }, sectionRef);

        cleanup = () => {
          triggers.forEach((trigger) => trigger.kill());
          ctx.revert();
        };
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
        id="como-funciona"
        data-testid="process-section"
        data-agent-context="consulting-process"
        className="pt-6"
      >
        <span id="proceso" className="sr-only" aria-hidden />
        <p data-process-header className="col-span-12 text-meta section-kicker pt-20 pb-4">
          Proceso
        </p>

        <h2 className="col-span-12 text-headline text-swiss-black pb-8">Cómo funciona</h2>

        <hr data-process-line className="col-span-12 border-t section-rule" />

        <div data-process-grid className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 pt-10 pb-8">
          {processSteps.map((step) => (
            <GlareCard
              key={step.number}
              data-process-card
              className="flex flex-col items-start justify-end py-6 px-5 md:py-8 md:px-6"
              containerClassName="w-full"
            >
              <p className="font-bold text-m3-primary text-meta mb-2">{step.number}</p>
              <p className="font-bold text-swiss-black text-lg">{step.title}</p>
              <p className="font-normal text-base text-muted mt-3 md:mt-4">{step.description}</p>
            </GlareCard>
          ))}
        </div>

        <div className="col-span-12 md:col-start-8 md:col-span-5 pb-20">
          <Link
            href={HOME_SECTION_PATHS.contact}
            className="tap-target text-meta text-swiss-black hover:text-swiss-red-ink"
          >
            Inicia tu estrategia de cobertura &rarr;
          </Link>
          <p className="mt-4 text-body text-m3-on-surface-variant">
            Te acompañamos antes, durante y después. No desaparecemos tras la póliza.
          </p>
        </div>
      </GridContainer>
    </div>
  );
}
