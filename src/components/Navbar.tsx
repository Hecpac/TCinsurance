"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/tracking";
import { useScroll } from "@/hooks/useScroll";
import { runBackgroundTask } from "@/lib/schedule";

const NAV_LINKS = [
  { label: "Servicios", href: HOME_SECTION_PATHS.services },
  { label: "Sobre mí", href: HOME_SECTION_PATHS.about },
  { label: "Blog", href: HOME_SECTION_PATHS.blog },
  { label: "Contacto", href: HOME_SECTION_PATHS.contact },
];

function resolveHomeHash(pathname: string, href: string) {
  if (pathname !== "/") return href;
  if (!href.startsWith("/#")) return href;
  return href.slice(1);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAtTop } = useScroll({ threshold: 10 });

  const contactHref = pathname === "/" ? "#contacto" : HOME_SECTION_PATHS.contact;
  const navLinks = NAV_LINKS.map((link) => {
    if (link.href === HOME_SECTION_PATHS.contact) {
      return { ...link, href: contactHref };
    }
    return { ...link, href: resolveHomeHash(pathname, link.href) };
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (top) {
        window.scrollTo(0, Number.parseInt(top || "0", 10) * -1);
      }
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !isMenuOpen) return;

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    runBackgroundTask(() => {
      void (async () => {
        const { default: gsap } = await import("gsap");
        if (!isMounted) return;

        const ctx = gsap.context(() => {
          gsap.from("[data-mobile-nav-link]", {
            y: 16,
            opacity: 0,
            duration: 0.38,
            stagger: 0.05,
            ease: "power3.out",
          });
        });

        cleanup = () => ctx.revert();
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [isMenuOpen]);

  const stickyStyle = isAtTop
    ? {
        backgroundColor: "rgb(17 19 24 / 0.94)",
        boxShadow: "none",
      }
    : {
        backgroundColor: "rgb(12 14 19 / 0.96)",
        boxShadow: "0 12px 28px -16px rgb(0 0 0 / 0.72)",
      };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 h-20 border-b border-[var(--color-border-soft)] backdrop-blur-md"
        style={{
          ...stickyStyle,
          transition:
            "background-color var(--transition-base), box-shadow var(--transition-base)",
        }}
      >
        <nav
          className="mx-auto h-full w-full max-w-[1440px] px-6 md:px-8 lg:px-14 xl:px-[4.5rem] 2xl:px-20"
          aria-label="Principal"
        >
          <div className="flex h-full items-center justify-between gap-4">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="tap-target inline-flex items-center"
              aria-label={siteConfig.brand.name}
            >
              <Image
                src={siteConfig.brand.logoPath}
                alt="TC Insurance"
                width={siteConfig.brand.logoWidth}
                height={siteConfig.brand.logoHeight}
                priority
                sizes="(min-width: 768px) 150px, 128px"
                className="h-[2.7rem] w-auto object-contain object-center md:h-[3.1rem]"
              />
            </Link>

            <div className="hidden items-center gap-5 md:flex lg:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={`desktop-${link.href}`}
                  href={link.href}
                  className="tap-target px-2 py-1 text-meta text-swiss-black/88 hover:text-swiss-red-ink hover:underline hover:underline-offset-4 focus-visible:text-swiss-red-ink focus-visible:underline focus-visible:underline-offset-4"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden min-w-0 shrink-0 items-center justify-end gap-2.5 md:flex lg:gap-3 xl:gap-4">
              <p className="hidden whitespace-nowrap text-meta text-swiss-gray 2xl:block">
                {siteConfig.location.short}
              </p>
              <Link
                href={contactHref}
                onClick={() =>
                  trackEvent(
                    "cta_click_header",
                    {
                      placement: "desktop",
                      path: pathname,
                    },
                    {
                      dedupeKey: `header:${pathname}:desktop`,
                    }
                  )
                }
                className="primary-cta tap-target min-w-[164px] shrink-0 items-center justify-center border px-4 py-2 text-meta whitespace-nowrap md:inline-flex xl:min-w-[168px] xl:px-5"
              >
                Agenda asesoría
              </Link>
            </div>

            <button
              type="button"
              aria-controls="mobile-nav-panel"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              data-testid="mobile-nav-toggle"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="tap-target flex h-11 w-11 items-center justify-center border border-[var(--color-border-soft)] text-swiss-black md:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={`spring-transform h-0.5 w-5 bg-current ${
                    isMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`spring-transform h-0.5 w-5 bg-current ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`spring-transform h-0.5 w-5 bg-current ${
                    isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-20 z-50 border-b border-[var(--color-border-soft)] bg-swiss-paper/95 px-6 py-5 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={`mobile-${link.href}`}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                data-mobile-nav-link
                className="tap-target px-1 text-body text-swiss-black hover:text-swiss-red-ink focus-visible:text-swiss-red-ink"
              >
                {link.label}
              </Link>
            ))}
            <p className="pt-1 text-meta text-swiss-gray" data-mobile-nav-link>
              {siteConfig.location.short}
            </p>
            <Link
              href={contactHref}
              onClick={() => {
                setIsMenuOpen(false);
                trackEvent(
                  "cta_click_header",
                  {
                    placement: "mobile",
                    path: pathname,
                  },
                  {
                    dedupeKey: `header:${pathname}:mobile`,
                  }
                );
              }}
              data-mobile-nav-link
              className="primary-cta tap-target mt-1 inline-flex w-fit border px-4 py-2 text-meta"
            >
              Agenda asesoría
            </Link>
          </div>
        </div>
      ) : null}

      <div
        className={`fixed inset-0 top-20 bg-swiss-paper/68 backdrop-blur-sm transition-opacity md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
        style={{
          transitionDuration: "var(--transition-base)",
          transitionTimingFunction: "var(--spring-ease)",
          zIndex: 49,
        }}
      />
    </>
  );
}
