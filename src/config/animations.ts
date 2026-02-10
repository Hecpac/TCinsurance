/**
 * Centralized Animation Configuration
 *
 * Provides consistent timing, easing, and animation presets across the application.
 * All GSAP animations should reference these values to maintain design consistency.
 */

// Duration presets (in seconds for GSAP)
export const ANIMATION_DURATION = {
  instant: 0.18,
  fast: 0.32,
  base: 0.62,
  slow: 0.95,
  slower: 1.2,
} as const;

// GSAP easing presets
export const ANIMATION_EASING = {
  out: "expo.out",
  in: "expo.in",
  inOut: "expo.inOut",
  elastic: "elastic.out(0.8, 0.65)",
  power2: "power2.out",
  power3: "power3.out",
} as const;

// Stagger values for sequenced animations (in seconds)
export const ANIMATION_STAGGER = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
  wide: 0.18,
} as const;

// Card lift animation presets (matches gsapCardLift.ts defaults)
export const CARD_LIFT_CONFIG = {
  offsetY: 6,
  scale: 1.01,
  enterDuration: 0.28,
  leaveDuration: 0.42,
} as const;

// Scroll reveal animation defaults
export const SCROLL_REVEAL_CONFIG = {
  y: 22,
  opacity: 0,
  duration: 0.65,
  start: "top 86%",
} as const;

// CTA microinteraction presets
export const CTA_ANIMATION_CONFIG = {
  hover: {
    scale: 1.02,
    duration: 0.32,
    ease: "power2.out",
  },
  ripple: {
    duration: 0.6,
    ease: "power3.out",
  },
  loading: {
    duration: 1.2,
    ease: "linear",
  },
} as const;

// CSS transition values (for non-GSAP animations)
// These reference CSS custom properties defined in globals.css
export const CSS_TRANSITIONS = {
  fast: "var(--transition-fast)",    // 320ms spring ease
  base: "var(--transition-base)",    // 460ms spring ease
  slow: "var(--transition-slow)",    // 640ms spring ease
} as const;

// Combined export for convenience
export const ANIMATION_CONFIG = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
  stagger: ANIMATION_STAGGER,
  cardLift: CARD_LIFT_CONFIG,
  scrollReveal: SCROLL_REVEAL_CONFIG,
  cta: CTA_ANIMATION_CONFIG,
  css: CSS_TRANSITIONS,
} as const;
