"use client";

import { useRef, useEffect } from "react";
import { runBackgroundTask } from "@/lib/schedule";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.body;
    const cursor = cursorRef.current;
    if (!cursor) return;
    let isMounted = true;
    let cleanup: (() => void) | undefined;

    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      cursor.style.display = "none";
      body.classList.remove("has-custom-cursor");
      return;
    }

    runBackgroundTask(() => {
      if (!isMounted) return;

      void (async () => {
        const { default: gsap } = await import("gsap");
        if (!isMounted) return;

        body.classList.add("has-custom-cursor");
        cursor.style.display = "block";
        gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

        const interactiveSelector =
          "a, button, input, textarea, select, summary, [role='button']";
        const moveX = gsap.quickTo(cursor, "x", {
          duration: 0.18,
          ease: "expo.out",
        });
        const moveY = gsap.quickTo(cursor, "y", {
          duration: 0.18,
          ease: "expo.out",
        });
        const scaleTo = gsap.quickTo(cursor, "scale", {
          duration: 0.32,
          ease: "elastic.out(0.8, 0.65)",
        });

        function onPointerMove(e: PointerEvent) {
          moveX(e.clientX);
          moveY(e.clientY);
        }

        function onPointerOver(e: PointerEvent) {
          const target = e.target as HTMLElement | null;
          if (!target) return;
          if (target.closest(interactiveSelector)) scaleTo(3);
        }

        function onPointerOut(e: PointerEvent) {
          const target = e.target as HTMLElement | null;
          if (!target) return;
          if (target.closest(interactiveSelector)) scaleTo(1);
        }

        window.addEventListener("pointermove", onPointerMove, {
          passive: true,
        });
        document.addEventListener("pointerover", onPointerOver);
        document.addEventListener("pointerout", onPointerOut);

        cleanup = () => {
          window.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("pointerover", onPointerOver);
          document.removeEventListener("pointerout", onPointerOut);
          body.classList.remove("has-custom-cursor");
        };
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
      body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 bg-swiss-red mix-blend-difference"
      style={{ display: "none" }}
    />
  );
}
