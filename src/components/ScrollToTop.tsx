"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fixed scroll-to-top button with CSS-based enter/exit transitions.
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Show button after scrolling past threshold
  useEffect(() => {
    const threshold = 400;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > threshold);
        ticking = false;
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`tap-target fixed bottom-24 right-6 z-[65] flex h-11 w-11 items-center justify-center border border-m3-outline-variant bg-m3-surface-container-high text-swiss-black transition-[opacity,transform] duration-300 hover:border-m3-outline-variant-strong hover:text-swiss-red-ink lg:bottom-6 ${
        isVisible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <span className="sr-only">Volver arriba</span>
      {/* Arrow up icon */}
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
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
