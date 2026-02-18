"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import GridContainer from "@/components/GridContainer";
import Link from "next/link";
import { HOME_SECTION_PATHS } from "@/config/site";
import { runBackgroundTask } from "@/lib/schedule";
import { trackEvent } from "@/lib/tracking";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    runBackgroundTask(() => {
      if (!isMounted) return;

      void (async () => {
        const { default: gsap } = await import("gsap");
        if (!isMounted || !sectionRef.current) return;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            defaults: { ease: "expo.out" },
          });

          tl.from("[data-hero-kicker]", {
            y: 24,
            opacity: 0,
            duration: 0.55,
          })
            .from(
              "[data-hero-rule]",
              {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.9,
                ease: "elastic.out(0.8, 0.65)",
              },
              0.1
            )
            .from(
              "[data-hero-title-line]",
              {
                yPercent: 115,
                duration: 0.95,
                stagger: 0.12,
              },
              0.18
            )
            .from(
              "[data-hero-subtitle]",
              {
                y: 20,
                opacity: 0,
                duration: 0.55,
              },
              0.5
            )
            .from(
              "[data-hero-copy], [data-hero-cta], [data-hero-meta]",
              {
                y: 24,
                opacity: 0,
                duration: 0.62,
                stagger: 0.08,
              },
              0.62
            )
            .from(
              "[data-hero-image]",
              {
                y: 28,
                opacity: 0,
                duration: 0.9,
              },
              0.34
            );
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
        as="header"
        id="inicio"
        data-testid="hero-section"
        data-agent-context="value-proposition"
        className="pt-6 md:pt-8"
      >
        <p
          data-hero-kicker
          className="col-span-12 text-meta section-kicker pt-4 md:pt-6"
        >
          Est. 2024 - Texas, USA
        </p>

        <hr
          data-hero-rule
          className="col-span-12 border-t section-rule mt-3 md:mt-5"
        />

        <div className="col-span-12 md:col-span-7 mt-5 md:mt-8 z-10">
          <h1 className="text-display font-bold leading-[0.95] text-swiss-black">
            <span className="block overflow-hidden pt-[0.06em]">
              <span data-hero-title-line className="block">
                Tu familia merece claridad,{" "}
              </span>
            </span>
            <span className="block overflow-hidden pt-[0.06em]">
              <span data-hero-title-line className="block text-swiss-red">
                no otro formulario.
              </span>
            </span>
          </h1>
        </div>

        <figure
          data-hero-image
          className="order-5 col-span-12 md:order-none md:col-start-8 md:col-span-5 md:row-start-3 md:row-end-8 mt-6 md:mt-0"
        >
          <div className="hero-depth relative h-[320px] md:h-[520px] w-full border border-m3-outline-variant bg-m3-surface-container-low">
            <Image
              src="/hero-portrait.jpg"
              alt="Retrato profesional de Tatiana Castañeda en blanco y negro"
              fill
              priority
              quality={72}
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 38vw, 82vw"
              className="object-cover grayscale contrast-125 saturate-0"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute -right-5 -top-5 h-full w-full border border-m3-outline-variant-strong"
            />
          </div>
        </figure>

        <p
          data-hero-subtitle
          className="col-span-12 md:col-span-6 mt-5 md:mt-6 text-subheadline text-swiss-black/80 max-w-[var(--measure-body)]"
        >
          Seguros de salud, vida y gastos finales en Texas. Comparamos
          opciones y te entregamos una recomendación clara para tu caso.
        </p>
        <p
          data-hero-copy
          className="col-span-12 md:col-span-5 mt-3 text-body text-m3-on-surface-variant"
        >
          Para familias, trabajadores independientes y dueños de negocio
          que necesitan cobertura sin perder tiempo ni dinero.
        </p>

        <p
          data-hero-copy
          className="order-2 col-span-12 md:order-none md:col-span-5 text-body text-m3-on-surface-variant mt-5 md:mt-6"
        >
          Asesoría bilingüe 1:1 para proteger tu ingreso, tu familia y tu
          legado con una estrategia que realmente entiendas.
        </p>

        <div
          data-hero-cta
          className="order-3 col-span-12 md:order-none md:col-span-7 mt-6 pb-3"
        >
          <div className="flex flex-wrap items-center gap-3">
            <HoverBorderGradient
              as="div"
              duration={1.1}
              containerClassName="rounded-none"
              className="!bg-transparent !p-0"
            >
              <Link
                href={HOME_SECTION_PATHS.contact}
                onClick={() =>
                  trackEvent(
                    "cta_click_inline_hero",
                    {
                      slot: "primary",
                      label: "Agenda asesoría gratuita",
                      tracking_id: "hero",
                    },
                    {
                      dedupeKey: "hero:primary",
                    }
                  )
                }
                className="primary-cta tap-target inline-flex items-center border px-5 py-3 text-meta"
              >
                Agenda asesoría gratuita
              </Link>
            </HoverBorderGradient>
            <Link
              href={HOME_SECTION_PATHS.services}
              onClick={() =>
                trackEvent(
                  "cta_click_inline_hero",
                  {
                    slot: "secondary",
                    label: "Ver servicios",
                    tracking_id: "hero",
                  },
                  {
                    dedupeKey: "hero:secondary",
                  }
                )
              }
              className="tap-target inline-flex items-center border border-m3-outline-variant px-5 py-3 text-meta text-swiss-black hover:border-m3-outline-variant-strong hover:text-swiss-red-ink"
            >
              Ver servicios
            </Link>
          </div>
          <ul
            aria-label="Indicadores de confianza"
            className="mt-3 flex flex-wrap gap-2"
          >
            <li className="border border-m3-outline-variant bg-m3-surface-container-low px-3 py-1.5 text-[0.73rem] font-medium tracking-[0.03em] text-m3-secondary-ink">
              Agencia con licencia en Texas
            </li>
            <li className="border border-m3-outline-variant bg-m3-surface-container-low px-3 py-1.5 text-[0.73rem] font-medium tracking-[0.03em] text-m3-secondary-ink">
              Respuesta inicial &lt; 24h
            </li>
            <li className="border border-m3-outline-variant bg-m3-surface-container-low px-3 py-1.5 text-[0.73rem] font-medium tracking-[0.03em] text-m3-secondary-ink">
              Atención bilingüe ES / EN
            </li>
          </ul>
        </div>

        <p
          data-hero-meta
          className="order-4 col-span-12 md:order-none md:col-span-7 text-meta text-m3-on-surface-variant pb-12 md:pb-16"
        >
          15 minutos • Sin compromiso • Español/English
        </p>
      </GridContainer>
    </div>
  );
}
