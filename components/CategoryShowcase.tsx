"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CategoryCard from "@/components/CategoryCard";
import Reveal from "@/components/Reveal";
import type { ShowcaseCard } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

interface CategoryShowcaseProps {
  heading: { before: string; accent: string; after: string };
  cards: ShowcaseCard[];
}

/**
 * Porsche-style model rail: on desktop the section pins and the six
 * category cards drive horizontally with scroll; on touch/small
 * screens it's a native swipeable rail.
 */
export default function CategoryShowcase({ heading, cards }: CategoryShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden py-24 md:py-0">
      <div className="flex min-h-0 flex-col justify-center lg:min-h-svh">
        <Reveal className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <p className="eyebrow">Sortiment</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-cream md:text-6xl">
            {heading.before}
            <span className="accent-word">{heading.accent}</span>
            {heading.after}
          </h2>
        </Reveal>

        <div
          ref={trackRef}
          className="rail mt-12 flex gap-4 overflow-x-auto px-5 pb-4 snap-x snap-mandatory md:mt-16 md:gap-6 md:px-10 lg:overflow-visible lg:snap-none"
        >
          {cards.map((card, i) => (
            <div key={card.href} className="snap-start">
              <CategoryCard {...card} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
