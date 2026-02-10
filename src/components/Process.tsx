"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import { processSteps } from "@/data/process";
import { runBackgroundTask } from "@/lib/schedule";
import { addCardHoverLift } from "@/lib/gsapCardLift";
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
        const detachHoverLift = addCardHoverLift(gsap, "[data-process-step]", {
          scope: sectionRef.current,
        });
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

          const stepsAnim = gsap.from("[data-process-step]", {
            scrollTrigger: { trigger: "[data-process-list]", start: "top 86%", once: true },
            y: 26,
            opacity: 0,
            duration: 0.72,
            stagger: 0.12,
            ease: "expo.out",
          });
          if (stepsAnim.scrollTrigger) triggers.push(stepsAnim.scrollTrigger);

          const imageAnim = gsap.from("[data-process-image]", {
            scrollTrigger: { trigger: "[data-process-image]", start: "top 92%", once: true },
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
          });
          if (imageAnim.scrollTrigger) triggers.push(imageAnim.scrollTrigger);
        }, sectionRef);

        cleanup = () => {
          triggers.forEach((trigger) => trigger.kill());
          detachHoverLift();
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

        <div data-process-list className="col-span-12 md:col-span-7 grid grid-cols-12 gap-4 pt-10 pb-8">
          {processSteps.map((step) => (
            <article
              key={step.number}
              data-process-step
              className="col-span-12 border border-m3-outline-variant-strong bg-m3-surface-container p-6 md:p-7 hover:border-m3-primary/50 transition-colors"
            >
              <p className="text-meta text-m3-primary">{step.number}</p>
              <h3 className="text-headline font-semibold tracking-tight text-swiss-black mt-4">{step.title}</h3>
              <p className="text-body text-m3-secondary-ink mt-4">{step.description}</p>
            </article>
          ))}
        </div>

        <figure data-process-image className="col-span-12 md:col-start-9 md:col-span-4 pt-10 pb-8 md:pb-16">
          <div className="relative aspect-[3/4] w-full border border-m3-outline-variant bg-m3-surface-container-low">
            <Image
              src="/hero-portrait.jpg"
              alt="Consultoría personalizada en seguros para familias en Texas"
              fill
              sizes="(min-width: 768px) 24vw, 100vw"
              className="object-cover grayscale contrast-125"
            />
          </div>
        </figure>

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
