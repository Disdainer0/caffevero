"use client";

import CategoryCard from "@/components/CategoryCard";
import Reveal from "@/components/Reveal";
import type { ShowcaseCard } from "@/lib/content";

interface CategoryShowcaseProps {
  heading: { before: string; accent: string; after: string };
  cards: ShowcaseCard[];
}

export default function CategoryShowcase({ heading, cards }: CategoryShowcaseProps) {
  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-[1920px] px-5 md:px-10">
        <Reveal className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <p className="eyebrow">Sortiment</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-cream md:text-6xl">
            {heading.before}
            <span className="accent-word">{heading.accent}</span>
            {heading.after}
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 grid w-full max-w-[1600px] grid-cols-1 gap-3 px-5 sm:mt-12 sm:grid-cols-2 sm:gap-4 md:px-10 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {cards.map((card, i) => (
            <div key={card.href}>
              <CategoryCard {...card} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
