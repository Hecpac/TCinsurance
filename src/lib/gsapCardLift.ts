type GsapInstance = typeof import("gsap").default;

interface CardLiftOptions {
  offsetY?: number;
  scale?: number;
  enterDuration?: number;
  leaveDuration?: number;
  scope?: ParentNode;
}

interface CardLiftDefaults {
  offsetY: number;
  scale: number;
  enterDuration: number;
  leaveDuration: number;
}

const DEFAULTS: CardLiftDefaults = {
  offsetY: 6,
  scale: 1.01,
  enterDuration: 0.28,
  leaveDuration: 0.42,
};

export function addCardHoverLift(
  gsap: GsapInstance,
  selector: string,
  options: CardLiftOptions = {}
) {
  if (typeof window === "undefined") return () => {};

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (prefersReducedMotion || !supportsHover) {
    return () => {};
  }

  const scope = options.scope ?? document;
  const offsetY = options.offsetY ?? DEFAULTS.offsetY;
  const scale = options.scale ?? DEFAULTS.scale;
  const enterDuration = options.enterDuration ?? DEFAULTS.enterDuration;
  const leaveDuration = options.leaveDuration ?? DEFAULTS.leaveDuration;
  const cards = Array.from(scope.querySelectorAll<HTMLElement>(selector));
  const removeListeners: Array<() => void> = [];

  cards.forEach((card) => {
    card.style.willChange = "transform";

    const onEnter = () => {
      gsap.to(card, {
        y: -offsetY,
        scale,
        duration: enterDuration,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: leaveDuration,
        ease: "power3.out",
        overwrite: true,
      });
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);
    card.addEventListener("pointercancel", onLeave);
    card.addEventListener("blur", onLeave, true);

    removeListeners.push(() => {
      card.style.willChange = "";
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("pointercancel", onLeave);
      card.removeEventListener("blur", onLeave, true);
    });
  });

  return () => {
    removeListeners.forEach((removeListener) => removeListener());
  };
}
