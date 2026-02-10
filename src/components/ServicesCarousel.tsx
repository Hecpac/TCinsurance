"use client";

import { useRef, useState, useEffect } from "react";
import { runBackgroundTask } from "@/lib/schedule";
import ServiceCard from "@/components/ServiceCard";
import type { InsuranceService } from "@/data/services";

interface ServicesCarouselProps {
  services: InsuranceService[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export default function ServicesCarousel({
  services,
  autoScroll = true,
  autoScrollInterval = 5000,
}: ServicesCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const totalSlides = services.length;
  const slidesPerPage = 1;
  const totalPages = Math.max(1, totalSlides - slidesPerPage + 1);
  const maxPage = Math.max(0, totalPages - 1);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, maxPage));
  }, [maxPage]);

  useEffect(() => {
    if (
      !autoScroll ||
      isUserInteracting ||
      isHovering ||
      totalPages <= 1 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
      return;
    }

    autoScrollTimerRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev >= maxPage ? 0 : prev + 1));
    }, autoScrollInterval);

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [autoScroll, autoScrollInterval, isUserInteracting, isHovering, maxPage, totalPages]);

  useEffect(() => {
    if (!isUserInteracting) return;

    const timeout = setTimeout(() => {
      setIsUserInteracting(false);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isUserInteracting]);

  useEffect(() => {
    if (!trackRef.current) return;

    const offset = -(currentPage * 100);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      trackRef.current.style.transform = `translateX(${offset}%)`;
      return;
    }

    runBackgroundTask(() => {
      void (async () => {
        const { default: gsap } = await import("gsap");
        if (!trackRef.current) return;

        gsap.to(trackRef.current, {
          x: `${offset}%`,
          duration: 0.5,
          ease: "power2.inOut",
        });
      })();
    });
  }, [currentPage]);

  const goToNext = () => {
    setIsUserInteracting(true);
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  const goToPrev = () => {
    setIsUserInteracting(true);
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const goToPage = (index: number) => {
    setIsUserInteracting(true);
    setCurrentPage(Math.min(Math.max(index, 0), maxPage));
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const startX = event.targetTouches[0].clientX;
    setTouchStart(startX);
    setTouchEnd(startX);
    setIsSwiping(true);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);

    const swipeThreshold = 50;
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!services.length) {
    return null;
  }

  const start = Math.min(totalSlides, currentPage + 1);
  const end = Math.min(totalSlides, start + slidesPerPage - 1);
  const counterText =
    slidesPerPage === 1
      ? `Mostrando ${start} de ${totalSlides} servicios`
      : `Mostrando ${start}\u2013${end} de ${totalSlides} servicios`;

  return (
    <div
      ref={carouselRef}
      className="services-carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="services-carousel__viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="services-carousel__track"
          style={{
            gridTemplateColumns: `repeat(${totalSlides}, 100%)`,
          }}
        >
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>

      <div className="services-carousel__controls">
        <button
          type="button"
          onClick={goToPrev}
          disabled={currentPage === 0}
          className="services-carousel__button services-carousel__button--prev"
          aria-label="Servicio anterior"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="services-carousel__dots" role="tablist" aria-label="Navegación de servicios">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToPage(index)}
              className={`services-carousel__dot ${
                index === currentPage ? "services-carousel__dot--active" : ""
              }`}
              role="tab"
              aria-selected={index === currentPage}
              aria-label={`Ir a servicio ${index + 1} de ${totalPages}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToNext}
          disabled={currentPage === maxPage}
          className="services-carousel__button services-carousel__button--next"
          aria-label="Siguiente servicio"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <p className="services-carousel__status-text mt-3 text-center" aria-live="polite">
        {counterText}
      </p>
    </div>
  );
}
