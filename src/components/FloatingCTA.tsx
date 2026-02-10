"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOME_SECTION_PATHS } from "@/config/site";
import { trackEvent } from "@/lib/tracking";

export default function FloatingCTA() {
  const pathname = usePathname();
  return <FloatingCTAInner key={pathname} />;
}

function FloatingCTAInner() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const contactTarget =
      document.getElementById("contacto") ?? document.getElementById("asesoria");
    const targets = [contactTarget, document.querySelector("footer")].filter(
      (node): node is HTMLElement => Boolean(node)
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hasVisibleTarget = entries.some((entry) => entry.isIntersecting);
        setIsHidden(hasVisibleTarget);
      },
      {
        threshold: 0.2,
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <aside aria-label="Acción rápida">
      <Link
        href={HOME_SECTION_PATHS.contact}
        onClick={() =>
          trackEvent("cta_click_inline_floating_mobile", {
            slot: "primary",
            label: "Agenda asesoría gratuita",
            tracking_id: "floating_mobile",
          }, {
            dedupeKey: "floating_mobile:primary",
          })
        }
        className={`primary-cta tap-target fixed right-6 bottom-6 z-[70] inline-flex border px-5 py-3 text-meta transition-[transform,opacity] lg:hidden ${
          isHidden ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
        }`}
        style={{
          transitionDuration: "var(--transition-base)",
          transitionTimingFunction: "var(--spring-ease)",
        }}
      >
        Agenda asesoría gratuita
      </Link>
    </aside>
  );
}
