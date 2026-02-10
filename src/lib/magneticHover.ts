/**
 * Magnetic Hover Effect Utility
 * Creates a premium 3D tilt effect where cards follow the cursor position
 */

type GsapInstance = typeof import("gsap").default;

interface MagneticHoverOptions {
  /**
   * Maximum rotation angle in degrees
   * @default 8
   */
  maxRotation?: number;

  /**
   * Speed of the magnetic effect (0-1, lower is slower/smoother)
   * @default 0.3
   */
  speed?: number;

  /**
   * Strength of the 3D perspective effect
   * @default 1000
   */
  perspective?: number;

  /**
   * Scale factor on hover
   * @default 1.02
   */
  scale?: number;

  /**
   * Scope element to search within
   * @default document
   */
  scope?: Element | Document;
}

/**
 * Adds magnetic hover effect to elements matching the selector
 * The element will tilt following the cursor position with smooth GSAP animation
 *
 * @param gsap - GSAP instance
 * @param selector - CSS selector for target elements
 * @param options - Configuration options
 * @returns Cleanup function to remove event listeners
 */
export function addMagneticHover(
  gsap: GsapInstance,
  selector: string,
  options: MagneticHoverOptions = {}
): () => void {
  // Skip on touch devices or reduced motion
  if (
    typeof window === "undefined" ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return () => {};
  }

  const {
    maxRotation = 8,
    speed = 0.3,
    perspective = 1000,
    scale = 1.02,
    scope = document,
  } = options;

  const elements = scope.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) return () => {};

  const cleanupFunctions: Array<() => void> = [];

  elements.forEach((element) => {
    // Set up 3D perspective on parent
    element.style.perspective = `${perspective}px`;
    element.style.transformStyle = "preserve-3d";

    // Create quickTo instances for smooth animation
    const quickRotateX = gsap.quickTo(element, "rotateX", {
      duration: speed,
      ease: "power2.out",
    });

    const quickRotateY = gsap.quickTo(element, "rotateY", {
      duration: speed,
      ease: "power2.out",
    });

    const quickScale = gsap.quickTo(element, "scale", {
      duration: 0.3,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      // Calculate cursor position relative to element center (-1 to 1)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Apply rotation (inverted Y for natural feel)
      const rotateY = deltaX * maxRotation;
      const rotateX = -deltaY * maxRotation;

      quickRotateX(rotateX);
      quickRotateY(rotateY);
      quickScale(scale);
    };

    const handleMouseLeave = () => {
      // Reset to default position
      quickRotateX(0);
      quickRotateY(0);
      quickScale(1);
    };

    // Add event listeners
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Add cleanup
    cleanupFunctions.push(() => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);

      // Reset styles
      gsap.set(element, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        clearProps: "transform,perspective",
      });
    });
  });

  // Return master cleanup function
  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}

/**
 * Adds a subtle glow/shadow effect that follows cursor position
 * Works great in combination with magnetic hover
 *
 * @param gsap - GSAP instance
 * @param selector - CSS selector for target elements
 * @returns Cleanup function
 */
export function addMagneticGlow(
  gsap: GsapInstance,
  selector: string
): () => void {
  if (
    typeof window === "undefined" ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    return () => {};
  }

  const elements = document.querySelectorAll<HTMLElement>(selector);
  if (!elements.length) return () => {};

  const cleanupFunctions: Array<() => void> = [];

  elements.forEach((element) => {
    // Create glow overlay
    const glowOverlay = document.createElement("div");
    glowOverlay.className = "magnetic-glow";
    glowOverlay.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(164, 201, 254, 0.08),
        transparent 40%
      );
      z-index: 1;
    `;

    // Ensure element has position relative
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    element.appendChild(glowOverlay);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      glowOverlay.style.setProperty("--mouse-x", `${x}%`);
      glowOverlay.style.setProperty("--mouse-y", `${y}%`);
      glowOverlay.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      glowOverlay.style.opacity = "0";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    cleanupFunctions.push(() => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      glowOverlay.remove();
    });
  });

  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}
