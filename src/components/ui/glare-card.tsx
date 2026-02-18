"use client";

import {
  useCallback,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";

interface GlareCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
  foil?: boolean;
}

function canRunGlare() {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;
  return finePointer && !reducedMotion;
}

export default function GlareCard({
  children,
  className,
  containerClassName,
  maxTilt = 7.5,
  foil = true,
  style,
  ...rest
}: GlareCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateVars = useCallback(
    (x: number, y: number) => {
      const el = outerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const mx = ((x - rect.left) / rect.width).toFixed(4);
      const my = ((y - rect.top) / rect.height).toFixed(4);

      const rx = (-(parseFloat(my) - 0.5) * maxTilt * 2).toFixed(2);
      const ry = ((parseFloat(mx) - 0.5) * maxTilt * 2).toFixed(2);

      el.style.setProperty("--m-x", mx);
      el.style.setProperty("--m-y", my);
      el.style.setProperty("--r-x", `${rx}deg`);
      el.style.setProperty("--r-y", `${ry}deg`);
    },
    [maxTilt]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!canRunGlare()) return;
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateVars(e.clientX, e.clientY);
      });
    },
    [updateVars]
  );

  const handlePointerEnter = useCallback(() => {
    const el = outerRef.current;
    if (!el || !canRunGlare()) return;
    el.style.setProperty("--glare-opacity", "1");
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = outerRef.current;
    if (!el) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    el.style.setProperty("--m-x", "0.5");
    el.style.setProperty("--m-y", "0.5");
    el.style.setProperty("--r-x", "0deg");
    el.style.setProperty("--r-y", "0deg");
    el.style.setProperty("--glare-opacity", "0");
  }, []);

  const outerStyle: CSSProperties = {
    "--m-x": "0.5",
    "--m-y": "0.5",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--glare-opacity": "0",
    perspective: "600px",
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={outerRef}
      className={containerClassName ?? ""}
      style={outerStyle}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      <div
        className={`relative w-full h-full ${className ?? ""}`}
        style={{
          transform: "rotateX(var(--r-x)) rotateY(var(--r-y))",
          transition: "transform 0.3s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative z-10">{children}</div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 20,
            opacity: "var(--glare-opacity)" as unknown as number,
            transition: "opacity 0.3s ease-out",
            background:
              "radial-gradient(circle at calc(var(--m-x) * 100%) calc(var(--m-y) * 100%), rgba(164,201,254,0.22) 0%, transparent 70%)",
            mixBlendMode: "plus-lighter",
          }}
        />

        {foil && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 30,
              opacity: "var(--glare-opacity)" as unknown as number,
              transition: "opacity 0.3s ease-out",
              background:
                "linear-gradient(115deg, transparent 20%, rgba(164,201,254,0.08) 36%, rgba(211,227,255,0.10) 46%, transparent 56%), linear-gradient(245deg, transparent 50%, rgba(164,201,254,0.06) 66%, rgba(211,227,255,0.09) 76%, transparent 86%)",
              backgroundSize: "150% 150%",
              backgroundPosition:
                "calc(var(--m-x) * 100%) calc(var(--m-y) * 100%)",
              mixBlendMode: "color-dodge",
            }}
          />
        )}
      </div>
    </div>
  );
}
