import type { Testimonial } from "@/lib/content";

interface TestimonialCardProps {
  /** Real quote from site.json; omit to render the prepared-state skeleton. */
  testimonial?: Testimonial;
}

/**
 * Partner testimonial. Until real quotes arrive in
 * content/site.json → testimonials, it renders a neutral
 * "Pripravujeme" state — no dummy copy, no code changes needed later.
 */
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col justify-between border hairline bg-carbon/60 p-8 md:p-10">
      <div>
        <span aria-hidden className="font-serif text-6xl italic leading-none text-bronze/40">
          &ldquo;
        </span>
        {testimonial ? (
          <blockquote className="mt-4 text-base font-light leading-relaxed text-cream/90">
            {testimonial.quote}
          </blockquote>
        ) : (
          <p className="mt-4 text-base font-light leading-relaxed text-smoke">
            Pripravujeme referencie našich partnerov.
          </p>
        )}
      </div>
      <figcaption className="mt-8 border-t hairline pt-5">
        {testimonial ? (
          <>
            <p className="text-sm font-medium text-cream">{testimonial.author}</p>
            {testimonial.company && (
              <p className="mt-1 text-xs font-light tracking-wide text-smoke">
                {testimonial.company}
              </p>
            )}
          </>
        ) : (
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-bronze/70">
            Pripravujeme
          </p>
        )}
      </figcaption>
    </figure>
  );
}
