import Image from "next/image";

interface AvatarImageProps {
  photo: string | null;  // Path to customer photo, or null for fallback
  photoAlt: string;      // Alt text for accessibility
  name: string;          // Full name for generating initials
  size?: number;         // Size in pixels (default: 64)
}

/**
 * Avatar Image Component
 *
 * Displays customer photo or falls back to initials.
 * Server Component (no "use client" needed).
 *
 * @example
 * ```tsx
 * <AvatarImage
 *   photo="/photos/mariela.jpg"
 *   photoAlt="Mariela R."
 *   name="Mariela R."
 *   size={56}
 * />
 * ```
 */
export default function AvatarImage({
  photo,
  photoAlt,
  name,
  size = 64,
}: AvatarImageProps) {
  // Generate initials from name (e.g., "Mariela R." → "MR")
  const getInitials = (fullName: string) => {
    return fullName
      .trim()
      .split(" ")
      .filter((word) => word.length > 0)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  // If photo exists, render next/image
  if (photo) {
    return (
      <div
        className="relative shrink-0 overflow-hidden bg-m3-surface-container"
        style={{ width: size, height: size }}
      >
        <Image
          src={photo}
          alt={photoAlt}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>
    );
  }

  // Fallback: Render initials
  const initials = getInitials(name);

  return (
    <div
      className="flex shrink-0 items-center justify-center bg-m3-surface-container-high text-swiss-black"
      style={{ width: size, height: size }}
      aria-label={`Avatar para ${name}`}
    >
      <span
        className="font-bold uppercase tracking-tight"
        style={{ fontSize: size * 0.4 }}
      >
        {initials}
      </span>
    </div>
  );
}
