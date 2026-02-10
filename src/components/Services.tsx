"use client";

import { useRef, useEffect, useState } from "react";
import GridContainer from "@/components/GridContainer";
import GlareCard from "@/components/ui/glare-card";
import ServicesCarousel from "@/components/ServicesCarousel";
import ServiceCard from "@/components/ServiceCard";
import { runBackgroundTask } from "@/lib/schedule";
import { servicesCatalog } from "@/data/services";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [layoutMode, setLayoutMode] = useState<"desktop" | "mobile" | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncLayoutMode = () => {
      setLayoutMode(mediaQuery.matches ? "desktop" : "mobile");
    };

    syncLayoutMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncLayoutMode);
      return () => mediaQuery.removeEventListener("change", syncLayoutMode);
    }

    mediaQuery.addListener(syncLayoutMode);
    return () => mediaQuery.removeListener(syncLayoutMode);
  }, []);

  useEffect(() => {
    if (layoutMode === null) return;
    if (layoutMode !== "desktop") return;
    if (!sectionRef.current) return;

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
          const mm = gsap.matchMedia();

          mm.add("(prefers-reduced-motion: reduce)", () => {
            const reduceTargets = sectionRef.current?.querySelectorAll<HTMLElement>(
              "[data-services-header], [data-services-title], [data-services-intro], [data-services-rule], [data-services-grid], [data-services-carousel], [data-service-card]"
            );

            if (!reduceTargets?.length) return;
            gsap.set(reduceTargets, { clearProps: "all" });
          });

          mm.add("(prefers-reduced-motion: no-preference)", () => {
            const header = sectionRef.current?.querySelector<HTMLElement>("[data-services-header]");
            const title = sectionRef.current?.querySelector<HTMLElement>("[data-services-title]");
            const intro = sectionRef.current?.querySelector<HTMLElement>("[data-services-intro]");
            const ruleTarget = sectionRef.current?.querySelector<HTMLElement>("[data-services-rule]");
            const desktopCards = gsap.utils.toArray<HTMLElement>(
              "[data-services-grid] [data-service-card]",
              sectionRef.current
            );

            const headerTargets = [header, title, intro].filter(
              (node): node is HTMLElement => Boolean(node)
            );

            if (!headerTargets.length || !ruleTarget) return;

            // Usar from() en lugar de set() + to() para evitar flash de contenido invisible
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
                once: true,
                invalidateOnRefresh: true,
              },
            });
            if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

            tl.from(headerTargets, {
              autoAlpha: 0,
              y: 18,
              duration: 0.65,
              ease: "expo.out",
              stagger: 0.08,
            }).from(
              ruleTarget,
              {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.9,
                ease: "elastic.out(0.8, 0.65)",
              },
              "-=0.22"
            );

            if (layoutMode === "desktop" && desktopCards.length) {
              tl.from(
                desktopCards,
                {
                  autoAlpha: 0,
                  y: 20,
                  duration: 0.5,
                  ease: "power2.out",
                  stagger: 0.08,
                },
                "-=0.12"
              );

              desktopCards.forEach((card, index) => {
                gsap.set(card, {
                  position: "relative",
                  zIndex: index + 1,
                  transformOrigin: "top center",
                  willChange: "transform",
                });

                const nextCard = desktopCards[index + 1];
                if (!nextCard) return;

                const pinTrigger = ScrollTrigger.create({
                  trigger: card,
                  start: "top top+=152",
                  endTrigger: nextCard,
                  end: "top top+=152",
                  pin: true,
                  pinSpacing: false,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                });
                triggers.push(pinTrigger);

                const scaleTween = gsap.to(card, {
                  scale: 0.94,
                  y: -20,
                  ease: "none",
                  scrollTrigger: {
                    trigger: nextCard,
                    start: "top top+=192",
                    end: "top top+=152",
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                });
                if (scaleTween.scrollTrigger) triggers.push(scaleTween.scrollTrigger);
              });
            }
          });

          cleanup = () => {
            triggers.forEach((trigger) => trigger.kill());
            mm?.revert();
            ctx.revert();
          };
        }, sectionRef);
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [layoutMode]);

  return (
    <div ref={sectionRef}>
      <GridContainer
        as="section"
        id="servicios"
        data-testid="services-section"
        data-agent-context="insurance-catalog"
      >
        <p
          data-services-header
          className="col-span-12 text-meta section-kicker pt-20"
        >
          Coberturas
        </p>

        <h2
          data-services-title
          className="col-span-12 pt-4 text-headline text-swiss-black"
        >
          Servicios para cada etapa de vida
        </h2>

        <p
          data-services-intro
          className="col-span-12 max-w-[70ch] pt-4 pb-8 text-body text-m3-on-surface-variant"
        >
          Elige el tipo de cobertura que quieres comparar. Te guiamos para tomar una decisión clara.
        </p>

        <div data-services-rule className="col-span-12 border-t section-rule" />

        {layoutMode === null ? (
          <div className="col-span-12 pt-10 pb-20" aria-hidden />
        ) : null}

        {layoutMode === "desktop" ? (
          <div
            data-services-grid
            className="services-sticky-grid col-span-12 pt-10 pb-20"
          >
            {servicesCatalog.map((service) => (
              <div
                key={service.slug}
                className="service-card-stack-item"
              >
                <GlareCard data-service-card maxTilt={6}>
                  <ServiceCard service={service} />
                </GlareCard>
              </div>
            ))}
          </div>
        ) : null}

        {layoutMode === "mobile" ? (
          <div data-services-carousel className="col-span-12 pt-8 pb-20">
            <ServicesCarousel services={servicesCatalog} />
          </div>
        ) : null}
      </GridContainer>
    </div>
  );
}
