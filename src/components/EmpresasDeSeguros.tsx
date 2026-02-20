"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GridContainer from "@/components/GridContainer";

const CARRIERS = [
  { name: "Ambetter", logo: "/logos/ambetter.png" },
  { name: "Blue Cross Blue Shield", logo: "/logos/bcbs.png" },
  { name: "Cigna", logo: "/logos/cigna.png" },
  { name: "Molina Healthcare", logo: "/logos/molina.png" },
  { name: "United Healthcare", logo: "/logos/uhc.png" },
  { name: "Mutual of Omaha", logo: "/logos/mutual-of-omaha.png" },
  { name: "Aetna", logo: "/logos/aetna.png" },
  { name: "Oscar Health", logo: "/logos/oscar.png" },
];

function MarqueeRow({
  direction = "left",
  speed = 50,
}: {
  direction?: "left" | "right";
  speed?: number;
}) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className="flex w-max items-center gap-4"
        style={{
          animationName: reducedMotion ? "none" : "marquee",
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-hidden="true"
      >
        {[...CARRIERS, ...CARRIERS].map((carrier, i) => (
          <div
            key={`${carrier.name}-${i}`}
            className="relative flex shrink-0 items-center justify-center border border-m3-outline-variant bg-m3-surface-container px-6 py-3"
            style={{ width: 180, height: 72 }}
          >
            <Image
              src={carrier.logo}
              alt={carrier.name}
              width={180}
              height={72}
              className="h-full w-full object-contain grayscale invert opacity-60 transition-opacity duration-300 hover:opacity-100"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmpresasDeSeguros() {
  return (
    <section
      id="empresas"
      data-testid="empresas-section"
      data-agent-context="insurance-carriers"
      className="pt-20 pb-16"
    >
      <GridContainer>
        <p className="col-span-12 text-meta section-kicker">
          Alianzas
        </p>

        <h2 className="col-span-12 pt-4 text-headline text-swiss-black">
          Empresas de seguros con las que trabajamos
        </h2>

        <p className="col-span-12 max-w-[var(--measure-body)] pt-4 pb-8 text-body text-m3-on-surface-variant">
          Comparamos opciones de múltiples aseguradoras para encontrar la
          cobertura que mejor se adapta a tu situación y presupuesto.
        </p>

        <div className="col-span-12 border-t section-rule" />
      </GridContainer>

      <div className="flex flex-col gap-4 pt-10">
        <MarqueeRow direction="left" speed={50} />
        <MarqueeRow direction="right" speed={55} />
      </div>

      <div className="sr-only">
        <ul>
          {CARRIERS.map((c) => (
            <li key={c.name}>{c.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
