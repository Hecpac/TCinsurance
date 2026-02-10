"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import { aboutProfile } from "@/data/about";
import { runBackgroundTask } from "@/lib/schedule";

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
          const lineTween = gsap.from("[data-philosophy-line]", {
            scrollTrigger: { trigger: "[data-philosophy-line]", start: "top 90%" },
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "elastic.out(0.8, 0.65)",
          });
          if (lineTween.scrollTrigger) triggers.push(lineTween.scrollTrigger);

          const quoteTween = gsap.from("[data-philosophy-quote]", {
            scrollTrigger: { trigger: "[data-philosophy-quote]", start: "top 84%" },
            yPercent: 45,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
          });
          if (quoteTween.scrollTrigger) triggers.push(quoteTween.scrollTrigger);

          const bodyTween = gsap.from("[data-philosophy-body]", {
            scrollTrigger: { trigger: "[data-philosophy-body]", start: "top 88%" },
            y: 24,
            opacity: 0,
            duration: 0.75,
            ease: "expo.out",
          });
          if (bodyTween.scrollTrigger) triggers.push(bodyTween.scrollTrigger);

          const credentialTween = gsap.from("[data-philosophy-credential]", {
            scrollTrigger: { trigger: "[data-philosophy-credentials]", start: "top 90%" },
            y: 16,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "expo.out",
          });
          if (credentialTween.scrollTrigger) triggers.push(credentialTween.scrollTrigger);
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
        id="sobre-mi"
        data-testid="about-section"
        data-agent-context="founder-story"
      >
        <p className="col-span-12 text-meta section-kicker pt-20 pb-6">Sobre mí</p>

        <hr
          data-philosophy-line
          className="col-span-12 border-t section-rule"
        />

        <div className="col-span-12 md:col-span-8 overflow-hidden pt-12">
          <blockquote
            data-philosophy-quote
            className="text-display font-bold leading-[0.95] tracking-[-0.055em] text-swiss-black"
          >
            &ldquo;Vi familias pagando por planes que no entendían. Fundé TC Insurance
            para que eso no vuelva a pasar.&rdquo;
          </blockquote>
        </div>

        <div
          data-philosophy-body
          className="col-span-12 md:col-start-8 md:col-span-5 pt-12 pb-12"
        >
          <div className="border-t border-m3-outline-variant pt-6">
            <p className="text-headline text-swiss-black">{aboutProfile.founder}</p>
            <p className="text-meta text-m3-secondary mt-3">{aboutProfile.role}</p>
            <p className="text-body text-m3-on-surface-variant mt-8">{aboutProfile.intro}</p>
            {aboutProfile.story.map((paragraph) => (
              <p key={paragraph} className="text-body text-m3-on-surface-variant mt-5">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <figure className="col-span-12 md:col-span-5 md:row-start-4 md:row-end-6 pb-8 md:pb-20">
          <div className="relative aspect-[4/5] w-full border border-m3-outline-variant bg-m3-surface-container-low">
            <Image
              src={aboutProfile.portrait.src}
              alt={aboutProfile.portrait.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover grayscale contrast-125"
            />
          </div>
        </figure>

        <div
          data-philosophy-credentials
          className="col-span-12 md:col-start-7 md:col-span-6 pb-20"
        >
          <p className="text-meta section-kicker">Credenciales</p>
          <ul className="mt-5 space-y-3">
            {aboutProfile.credentials.map((credential) => (
              <li
                key={credential}
                data-philosophy-credential
                className="text-body text-swiss-black/85 border-b border-m3-outline-variant pb-3"
              >
                {credential}
              </li>
            ))}
          </ul>

          <Link
            href={aboutProfile.ctaHref}
            className="tap-target inline-block mt-9 text-meta text-swiss-black hover:text-swiss-red-ink"
          >
            {aboutProfile.ctaLabel} &rarr;
          </Link>
        </div>
      </GridContainer>
    </div>
  );
}
