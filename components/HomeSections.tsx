"use client";

import dynamic from "next/dynamic";
import type { ShowcaseCard, Testimonial } from "@/lib/content";

// below-the-fold sections carry gsap/framer-motion — keep them out of
// the critical bundle so the hero (LCP) isn't gated on them
const CategoryShowcase = dynamic(() => import("@/components/CategoryShowcase"));
const Philosophy = dynamic(() => import("@/components/Philosophy"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));

interface HomeSectionsProps {
  heading: { before: string; accent: string; after: string };
  cards: ShowcaseCard[];
  philosophy: string;
  partners: string[];
  testimonials: Testimonial[];
}

export default function HomeSections({
  heading,
  cards,
  philosophy,
  partners,
  testimonials,
}: HomeSectionsProps) {
  return (
    <>
      <CategoryShowcase heading={heading} cards={cards} />
      <Philosophy philosophy={philosophy} partners={partners} />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
