import { useEffect, useState } from "react";

export interface ScrollState {
  scrollY: number;
  scrollDirection: "up" | "down" | null;
  isAtTop: boolean;
  scrollProgress: number; // 0-1 ratio of scroll position
}

interface UseScrollOptions {
  threshold?: number; // Minimum scroll distance to trigger direction change
  debounce?: number;  // Debounce delay in ms
}

/**
 * Custom hook for tracking scroll position and direction
 *
 * Returns scroll state including Y position, direction (up/down),
 * whether at top of page, and scroll progress (0-1).
 *
 * Uses requestAnimationFrame for performance and debouncing to prevent
 * excessive state updates.
 *
 * @param options - Configuration options
 * @param options.threshold - Minimum scroll pixels to trigger direction change (default: 5)
 * @param options.debounce - Debounce delay in milliseconds (default: 100)
 *
 * @example
 * ```tsx
 * const { scrollY, scrollDirection, isAtTop } = useScroll({ threshold: 10 });
 *
 * // Hide navbar when scrolling down
 * const shouldHideNav = scrollY > 100 && scrollDirection === "down";
 * ```
 */
export function useScroll(options: UseScrollOptions = {}): ScrollState {
  const { threshold = 5, debounce = 100 } = options;

  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: null,
    isAtTop: true,
    scrollProgress: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let timeoutId: NodeJS.Timeout;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? currentScrollY / maxScroll : 0;

      let direction: "up" | "down" | null = null;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Only update direction if scroll distance exceeds threshold
      if (scrollDelta > threshold) {
        direction = currentScrollY > lastScrollY ? "down" : "up";
      }

      setState({
        scrollY: currentScrollY,
        scrollDirection: direction,
        isAtTop: currentScrollY < 10,
        scrollProgress,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        window.requestAnimationFrame(updateScrollState);
      }, debounce);
    };

    // Set initial state
    updateScrollState();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [threshold, debounce]);

  return state;
}
