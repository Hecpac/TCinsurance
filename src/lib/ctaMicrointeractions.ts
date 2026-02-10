import type { default as GsapType } from "gsap";

type GsapInstance = typeof GsapType;

interface RippleOptions {
  color?: string;
  duration?: number;
}

/**
 * Adds ripple effect to CTA buttons on click
 *
 * Creates a temporary DOM element that expands and fades out from the click position.
 * Follows the same pattern as gsapCardLift.ts (returns cleanup function).
 *
 * @param gsap - GSAP instance
 * @param selector - CSS selector for CTA buttons
 * @param options - Ripple customization options
 * @returns Cleanup function to remove event listeners
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   let cleanup: (() => void) | undefined;
 *
 *   runBackgroundTask(() => {
 *     void (async () => {
 *       const { default: gsap } = await import("gsap");
 *       cleanup = addRippleEffect(gsap, ".primary-cta");
 *     })();
 *   });
 *
 *   return cleanup;
 * }, []);
 * ```
 */
export function addRippleEffect(
  gsap: GsapInstance,
  selector: string,
  options: RippleOptions = {}
): () => void {
  if (typeof window === "undefined") return () => {};

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    return () => {};
  }

  const { color = "rgba(255, 255, 255, 0.4)", duration = 0.6 } = options;
  const buttons = document.querySelectorAll<HTMLElement>(selector);
  const listeners: Array<() => void> = [];

  buttons.forEach((button) => {
    const handleClick = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: ${color};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 0;
      `;

      // Ensure button can contain ripple
      const originalPosition = getComputedStyle(button).position;
      if (originalPosition === "static") {
        button.style.position = "relative";
      }
      button.style.overflow = "hidden";

      button.appendChild(ripple);

      // Animate ripple
      const maxDimension = Math.max(rect.width, rect.height) * 2.5;
      gsap.to(ripple, {
        width: maxDimension,
        height: maxDimension,
        opacity: 0,
        duration,
        ease: "power3.out",
        onComplete: () => {
          ripple.remove();
        },
      });
    };

    button.addEventListener("click", handleClick);
    listeners.push(() => button.removeEventListener("click", handleClick));
  });

  // Return cleanup function
  return () => {
    listeners.forEach((cleanup) => cleanup());
  };
}

/**
 * Adds loading state animation to a CTA button
 *
 * Adds a loading spinner and reduces opacity while loading.
 *
 * @param gsap - GSAP instance
 * @param button - Button element
 * @param isLoading - Whether button is in loading state
 *
 * @example
 * ```tsx
 * const buttonRef = useRef<HTMLButtonElement>(null);
 *
 * useEffect(() => {
 *   if (!buttonRef.current) return;
 *
 *   void (async () => {
 *     const { default: gsap } = await import("gsap");
 *     addLoadingState(gsap, buttonRef.current!, isSubmitting);
 *   })();
 * }, [isSubmitting]);
 * ```
 */
export function addLoadingState(
  gsap: GsapInstance,
  button: HTMLElement,
  isLoading: boolean
): void {
  if (!button) return;

  if (isLoading) {
    // Add loading spinner
    const spinner = document.createElement("span");
    spinner.setAttribute("data-loading-spinner", "");
    spinner.innerHTML = `
      <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `;
    spinner.style.cssText = "display: inline-flex; margin-left: 8px;";
    button.appendChild(spinner);

    // Reduce opacity
    gsap.to(button, { opacity: 0.6, duration: 0.2 });

    // Disable button
    button.setAttribute("disabled", "");
  } else {
    // Remove spinner
    const spinner = button.querySelector("[data-loading-spinner]");
    if (spinner) spinner.remove();

    // Restore opacity
    gsap.to(button, { opacity: 1, duration: 0.2 });

    // Enable button
    button.removeAttribute("disabled");
  }
}
