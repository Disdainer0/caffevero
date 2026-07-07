"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface StoryChapter {
  id: string;
  heading: string;
  body: string;
  image: string;
}

/**
 * Porsche-style pinned storytelling: the image column sticks and
 * crossfades between chapters while the text scrolls. On mobile it
 * degrades to a plain vertical flow with inline images.
 */
export default function AboutStory({ chapters }: { chapters: StoryChapter[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = refs.current.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const el of refs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
      {/* sticky crossfading image — desktop only */}
      <div className="hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-carbon">
          {chapters.map((chapter, i) => (
            <Image
              key={chapter.id}
              src={chapter.image}
              alt={chapter.heading}
              fill
              sizes="45vw"
              className={`object-cover transition-opacity duration-700 ease-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent"
          />
          <p className="absolute bottom-6 left-6 text-xs font-light tracking-[0.25em] uppercase text-smoke">
            {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="space-y-24 lg:space-y-[45vh] lg:py-[20vh]">
        {chapters.map((chapter, i) => (
          <section
            key={chapter.id}
            id={chapter.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-cream md:text-5xl">
              {chapter.heading}
            </h2>
            <div className="relative mt-6 aspect-[3/2] overflow-hidden bg-carbon lg:hidden">
              <Image
                src={chapter.image}
                alt={chapter.heading}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
            <p className="prose-col mt-6 text-lg font-light leading-relaxed text-smoke">
              {chapter.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
