/**
 * Video Optimization Utilities
 * Handles lazy loading, device detection, and user preference checks for video content
 */

/**
 * Determines if video should be loaded based on user preferences
 * Checks for reduced motion and data saver mode
 */
export function shouldLoadVideo(): boolean {
  // Check for reduced motion preference
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return false;
  }

  // Check for data saver mode (supported in Chrome/Edge)
  if (typeof navigator !== "undefined" && "connection" in navigator) {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) {
      return false;
    }
  }

  return true;
}

/**
 * Selects appropriate video source based on device viewport
 * @param desktopSrc - Path to desktop video (16:9)
 * @param mobileSrc - Path to mobile video (4:5 portrait)
 * @returns Appropriate video source for current device
 */
export function getVideoSource(desktopSrc: string, mobileSrc: string): string {
  if (typeof window === "undefined") {
    return desktopSrc;
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return isMobile ? mobileSrc : desktopSrc;
}

/**
 * Preloads video metadata for faster playback
 * @param src - Video source URL
 * @returns Promise that resolves when metadata is loaded
 */
export function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }

    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = src;

    video.addEventListener("loadedmetadata", () => {
      resolve();
    });

    video.addEventListener("error", () => {
      reject(new Error(`Failed to preload video: ${src}`));
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      reject(new Error(`Video preload timeout: ${src}`));
    }, 10000);
  });
}

/**
 * Detects if device supports hover interactions
 * Used to disable certain features on touch devices
 */
export function supportsHover(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
