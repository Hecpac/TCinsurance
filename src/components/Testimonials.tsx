"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import "swiper/css";
import GridContainer from "@/components/GridContainer";
import GlareCard from "@/components/ui/glare-card";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { runBackgroundTask } from "@/lib/schedule";

const FEATURED_TESTIMONIAL_NAMES = new Set(["Mariela R.", "Rosa G."]);
const featuredTestimonials = testimonials.filter((item) =>
  FEATURED_TESTIMONIAL_NAMES.has(item.name)
);
const carouselTestimonials = testimonials.filter(
  (item) => !FEATURED_TESTIMONIAL_NAMES.has(item.name)
);

interface SwiperComponents {
  Swiper: ComponentType<Record<string, unknown>>;
  SwiperSlide: ComponentType<Record<string, unknown>>;
  modules: unknown[];
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [swiperLoaded, setSwiperLoaded] = useState<SwiperComponents | null>(null);

  useEffect(() => {
    let isMounted = true;

    void (async () => {
      const [swiperReact, swiperModules] = await Promise.all([
        import("swiper/react"),
        import("swiper/modules"),
      ]);
      if (!isMounted) return;
      setSwiperLoaded({
        Swiper: swiperReact.Swiper as unknown as ComponentType<Record<string, unknown>>,
        SwiperSlide: swiperReact.SwiperSlide as unknown as ComponentType<Record<string, unknown>>,
        modules: [swiperModules.Navigation, swiperModules.Autoplay, swiperModules.A11y],
      });
    })();

    return () => {
      isMounted = false;
    };
  }, []);

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
          gsap.from("[data-testimonials-header]", {
            scrollTrigger: {
              trigger: "[data-testimonials-header]",
              start: "top 88%",
              once: true,
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "expo.out",
          });

          gsap.from("[data-testimonials-rule]", {
            scrollTrigger: {
              trigger: "[data-testimonials-rule]",
              start: "top 90%",
              once: true,
            },
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "elastic.out(0.8, 0.65)",
          });

          gsap.from("[data-testimonials-featured], [data-testimonials-carousel]", {
            scrollTrigger: {
              trigger: "[data-testimonials-featured], [data-testimonials-carousel]",
              start: "top 86%",
              once: true,
            },
            y: 22,
            opacity: 0,
            duration: 0.65,
            ease: "expo.out",
          });
        }, sectionRef);

        cleanup = () => {
          ctx.revert();
        };
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  const carouselItems = carouselTestimonials.length > 0 ? carouselTestimonials : testimonials;

  return (
    <div ref={sectionRef}>
      <GridContainer
        as="section"
        id="testimonios"
        data-testid="testimonials-section"
        data-agent-context="social-proof"
        className="pt-6"
      >
        <p
          data-testimonials-header
          className="col-span-12 text-meta section-kicker pt-20 pb-4"
        >
          Testimonios
        </p>

        <h2 className="col-span-12 pb-8 text-headline text-swiss-black">
          Historias de clientes en Texas
        </h2>

        <hr
          data-testimonials-rule
          className="col-span-12 border-t section-rule"
        />

        <div
          data-testimonials-featured
          className="col-span-12 grid grid-cols-1 gap-4 pt-10 md:grid-cols-2"
        >
          {featuredTestimonials.map((testimonial) => (
            <GlareCard key={`featured-${testimonial.name}-${testimonial.service}`} className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </GlareCard>
          ))}
        </div>

        <div data-testimonials-carousel className="col-span-12 pt-8 pb-20">
          {swiperLoaded ? (
            <>
              <swiperLoaded.Swiper
                modules={swiperLoaded.modules}
                spaceBetween={18}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 2, spaceBetween: 18 },
                  1280: { slidesPerView: 3, spaceBetween: 20 },
                }}
                navigation={{
                  nextEl: ".swiper-button-next-custom-testimonials",
                  prevEl: ".swiper-button-prev-custom-testimonials",
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                className="testimonials-swiper"
              >
                {carouselItems.map((testimonial) => (
                  <swiperLoaded.SwiperSlide key={`${testimonial.name}-${testimonial.service}`}>
                    <GlareCard className="h-full">
                      <TestimonialCard testimonial={testimonial} />
                    </GlareCard>
                  </swiperLoaded.SwiperSlide>
                ))}
              </swiperLoaded.Swiper>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {carouselItems.slice(0, 3).map((testimonial) => (
                <GlareCard key={`fallback-${testimonial.name}-${testimonial.service}`} className="h-full">
                  <TestimonialCard testimonial={testimonial} />
                </GlareCard>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              disabled={!swiperLoaded}
              className="swiper-button-prev-custom-testimonials tap-target flex h-11 w-11 items-center justify-center border border-m3-outline-variant bg-m3-surface-container text-swiss-black hover:border-m3-outline-variant-strong hover:text-swiss-red-ink disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Testimonio anterior"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              disabled={!swiperLoaded}
              className="swiper-button-next-custom-testimonials tap-target flex h-11 w-11 items-center justify-center border border-m3-outline-variant bg-m3-surface-container text-swiss-black hover:border-m3-outline-variant-strong hover:text-swiss-red-ink disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Siguiente testimonio"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </GridContainer>
    </div>
  );
}
