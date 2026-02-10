import AvatarImage from "@/components/AvatarImage";
import RatingStars from "@/components/RatingStars";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article
      data-testimonial-card
      className="flex h-full flex-col gap-4 border border-m3-outline-variant bg-m3-surface-container-low p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <AvatarImage
          photo={testimonial.photo}
          photoAlt={testimonial.photoAlt}
          name={testimonial.name}
          size={56}
        />
        <div className="min-w-0 flex-1">
          <p className="text-body font-semibold text-swiss-black">
            {testimonial.name}
          </p>
          <p className="mt-1 text-body font-medium text-swiss-black/90">
            {testimonial.profile ?? testimonial.context}
          </p>
          <p className="mt-1 text-meta text-swiss-gray">
            {testimonial.city}, TX
          </p>
          <div className="mt-2">
            <RatingStars rating={testimonial.rating} size={14} />
          </div>
        </div>
      </div>

      <blockquote className="text-body text-m3-on-surface-variant">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-m3-outline-variant pt-4">
        <span className="inline-flex items-center gap-2 border border-m3-outline-variant px-3 py-1 text-meta font-medium text-swiss-black">
          <svg
            className="h-4 w-4 text-swiss-red"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {testimonial.service}
        </span>
        <span className="text-meta text-m3-on-surface-variant">{testimonial.context}</span>
      </div>
    </article>
  );
}
