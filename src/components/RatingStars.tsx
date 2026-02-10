interface RatingStarsProps {
  rating: 1 | 2 | 3 | 4 | 5;  // Star rating (1-5)
  size?: number;               // Size of each star in pixels (default: 16)
}

/**
 * Rating Stars Component
 *
 * Displays a 5-star rating with filled/empty stars.
 * Server Component (no "use client" needed).
 *
 * @example
 * ```tsx
 * <RatingStars rating={5} size={14} />
 * ```
 */
export default function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={
            star <= rating
              ? "var(--color-swiss-red)"
              : "var(--color-border)"
          }
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
