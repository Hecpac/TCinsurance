"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS } from "@/config/site";
import { faqItems } from "@/data/faq";
import { runBackgroundTask } from "@/lib/schedule";
import { trackEvent } from "@/lib/tracking";
import { addCardHoverLift } from "@/lib/gsapCardLift";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackedQuestionsRef = useRef<Set<string>>(new Set());
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
        const detachHoverLift = addCardHoverLift(gsap, "[data-faq-item]", {
          offsetY: 3,
          scale: 1.003,
          enterDuration: 0.22,
          leaveDuration: 0.32,
          scope: sectionRef.current,
        });
        const ctx = gsap.context(() => {
          gsap.from("[data-faq-header]", {
            scrollTrigger: { trigger: "[data-faq-header]", start: "top 88%" },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "expo.out",
          });

          gsap.from("[data-faq-rule]", {
            scrollTrigger: { trigger: "[data-faq-rule]", start: "top 90%" },
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "elastic.out(0.8, 0.65)",
          });

          gsap.from("[data-faq-item]", {
            scrollTrigger: { trigger: "[data-faq-list]", start: "top 88%" },
            y: 18,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "expo.out",
          });
        }, sectionRef);

        cleanup = () => {
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

  function handleToggle(index: number, question: string) {
    setOpenIndex((currentIndex) => {
      const nextIndex = currentIndex === index ? null : index;

      if (nextIndex === index && !trackedQuestionsRef.current.has(question)) {
        trackedQuestionsRef.current.add(question);
        trackEvent(`faq_open_${index + 1}`, {
          question,
          question_id: `faq_${index + 1}`,
        }, {
          dedupeKey: `faq_open:${index + 1}`,
        });
      }

      return nextIndex;
    });
  }

  return (
    <div ref={sectionRef}>
      <GridContainer
        as="section"
        id="faq"
        data-testid="faq-section"
        data-agent-context="faq-content"
        className="pt-6"
      >
        <p data-faq-header className="col-span-12 text-meta section-kicker pt-20 pb-4">
          Preguntas frecuentes
        </p>

        <h2 className="col-span-12 pb-8 text-headline text-swiss-black">
          Resolvemos dudas antes de decidir
        </h2>

        <hr data-faq-rule className="col-span-12 border-t section-rule" />

        <div data-faq-list className="col-span-12 pt-10 pb-12 md:pb-14">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <article key={item.question} data-faq-item className="border-b border-m3-outline-variant py-5">
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(index, item.question)}
                    className="tap-target flex w-full items-start justify-between gap-6 text-left"
                  >
                    <span className="text-headline font-bold tracking-tight text-swiss-black">
                      {item.question}
                    </span>
                    <span className="spring-transform text-meta text-m3-secondary">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className="pt-4"
                >
                  <p className="max-w-[85ch] text-body text-m3-on-surface-variant">
                    {item.answer}
                  </p>
                </div>
              </article>
            );
          })}

          <article data-faq-item className="border-b border-m3-outline-variant py-6">
            <p className="mt-3 max-w-[70ch] text-body text-m3-on-surface-variant">
              Si aún no estás seguro por dónde empezar, una llamada de 15 minutos es suficiente para darte claridad.
            </p>
            <div className="mt-5">
              <HoverBorderGradient
                as="div"
                duration={1.1}
                containerClassName="rounded-none"
                className="!bg-transparent !p-0"
              >
                <Link
                  href={HOME_SECTION_PATHS.contact}
                  onClick={() =>
                    trackEvent("cta_click_inline_after_faq", {
                      slot: "primary",
                      label: "Habla con un asesor",
                      tracking_id: "after_faq",
                    }, {
                      dedupeKey: "after_faq:primary",
                    })
                  }
                  className="primary-cta tap-target inline-flex items-center border px-5 py-3 text-meta"
                >
                  Habla con un asesor
                </Link>
              </HoverBorderGradient>
            </div>
          </article>
        </div>
      </GridContainer>
    </div>
  );
}
