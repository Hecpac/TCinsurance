"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { runBackgroundTask } from "@/lib/schedule";
import { addCardHoverLift } from "@/lib/gsapCardLift";
import { trackEvent } from "@/lib/tracking";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

interface CTAButton {
  label: string;
  href: string;
}

interface CTAInlineProps {
  title: string;
  subtitle: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  trackingId: string;
}

export default function CTAInline({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  trackingId,
}: CTAInlineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eventBase = `cta_click_inline_${trackingId}`;

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
        const card = sectionRef.current.querySelector<HTMLElement>("[data-cta-inline-card]");
        if (!card) return;
        const actions = Array.from(
          sectionRef.current.querySelectorAll<HTMLElement>("[data-cta-inline-action]")
        );

        gsap.registerPlugin(ScrollTrigger);
        const detachHoverLift = addCardHoverLift(gsap, "[data-cta-inline-card]", {
          offsetY: 5,
          scale: 1.008,
          scope: sectionRef.current,
        });

        const ctx = gsap.context(() => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
            y: 20,
            opacity: 0,
            duration: 0.62,
            ease: "expo.out",
          });

          if (actions.length) {
            gsap.from(actions, {
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true,
              },
              y: 14,
              opacity: 0,
              duration: 0.56,
              stagger: 0.08,
              ease: "power3.out",
            });
          }
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

  return (
    <div
      ref={sectionRef}
      data-testid={`cta-inline-${trackingId}`}
      data-agent-context={`cta-inline-${trackingId}`}
      className="col-span-12"
    >
      <div
        data-cta-inline-card
        className="border border-m3-outline-variant bg-m3-surface-container-low p-6 md:p-8"
      >
        <p className="text-headline font-semibold tracking-tight text-swiss-black">{title}</p>
        <p className="mt-3 max-w-[68ch] text-body text-m3-on-surface-variant">{subtitle}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <HoverBorderGradient
            as="div"
            duration={1.1}
            containerClassName="rounded-none"
            className="!bg-transparent !p-0"
          >
            <Link
              href={primaryButton.href}
              data-cta-inline-action
              onClick={() =>
                trackEvent(eventBase, {
                  slot: "primary",
                  label: primaryButton.label,
                  tracking_id: trackingId,
                }, {
                  dedupeKey: `${trackingId}:primary`,
                })
              }
              className="primary-cta tap-target inline-flex items-center border px-5 py-3 text-meta"
            >
              {primaryButton.label}
            </Link>
          </HoverBorderGradient>

          {secondaryButton ? (
            <Link
              href={secondaryButton.href}
              data-cta-inline-action
              onClick={() =>
                trackEvent(eventBase, {
                  slot: "secondary",
                  label: secondaryButton.label,
                  tracking_id: trackingId,
                }, {
                  dedupeKey: `${trackingId}:secondary`,
                })
              }
              className="tap-target inline-flex items-center border border-m3-outline-variant px-5 py-3 text-meta text-swiss-black hover:border-m3-outline-variant-strong hover:text-swiss-red-ink"
            >
              {secondaryButton.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
