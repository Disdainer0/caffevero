"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";

interface PhilosophyProps {
  philosophy: string;
  partners: string[];
}

/**
 * Pinned brand section: the image stays sticky and slowly settles
 * (scale + parallax) while the manifesto text scrolls past it.
 */
export default function Philosophy({ philosophy, partners }: PhilosophyProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  return (
    <section ref={ref} className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-44">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden bg-carbon lg:sticky lg:top-28 aspect-[4/5]">
            <motion.div style={{ scale, y }} className="relative h-full w-full">
              <Image
                src="/img/categories/kavovar.png"
                alt="Kávovar Caffè Vero — remeselná tradícia a moderná technológia"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        <div className="order-1 flex flex-col justify-center lg:order-2">
          <Reveal>
            <p className="eyebrow">Filozofia značky</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-cream md:text-6xl">
              Remeslo a <span className="accent-word">technológia</span> v rovnováhe
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="prose-col mt-8 text-lg font-light leading-relaxed text-smoke">
              {philosophy}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-14 border-t hairline pt-8">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-smoke">
                Značky, ktoré zastupujeme
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {partners.map((partner) => (
                  <li
                    key={partner}
                    className="text-lg font-light tracking-wide text-cream/80"
                  >
                    {partner}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
