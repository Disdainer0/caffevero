import TestimonialCard from "@/components/TestimonialCard";
import Reveal from "@/components/Reveal";
import type { Testimonial } from "@/lib/content";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  // three skeleton slots until real quotes land in content/site.json
  const slots: (Testimonial | undefined)[] =
    testimonials.length > 0 ? testimonials : [undefined, undefined, undefined];

  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-44">
      <Reveal>
        <p className="eyebrow">Referencie</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-cream md:text-6xl">
          Čo hovoria naši <span className="accent-word">partneri</span>
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
        {slots.map((testimonial, i) => (
          <Reveal key={testimonial?.author ?? i} delay={i * 0.08}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
