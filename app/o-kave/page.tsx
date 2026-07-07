import type { Metadata } from "next";
import AboutStory from "@/components/AboutStory";
import VarietyCompare from "@/components/VarietyCompare";
import HistoryTimeline from "@/components/HistoryTimeline";
import YouTubeLite from "@/components/YouTubeLite";
import Reveal from "@/components/Reveal";
import { aboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Niečo o káve",
  description:
    "Čo je káva, druhy kávy Arabica a Robusta a história kávy od roku 800 p. n. l. až po dnešok. Caffè Vero, Košice.",
};

interface AboutSection {
  id: string;
  heading: string;
  body?: string;
  image?: string;
  video?: { id: string; url: string };
  varieties?: { name: string; traits: string[]; stats: Record<string, string> }[];
  timeline?: { year: string; event: string }[];
}

export default function AboutPage() {
  const sections = aboutContent.sections as AboutSection[];
  const intro = sections.find((s) => s.id === "caffe-vero");
  const varieties = sections.find((s) => s.id === "hlavne-druhy");
  const history = sections.find((s) => s.id === "historia-kavy");
  const chapters = sections.filter((s) => s.body && s.image && !s.video);

  return (
    <div className="pt-32 md:pt-44">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">Niečo o káve</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-[-0.025em] text-cream md:text-8xl">
            Od zrnka po <span className="accent-word">šálku</span>
          </h1>
          {intro && (
            <p className="prose-col mt-8 text-lg font-light text-smoke">{intro.body}</p>
          )}
        </Reveal>

        {intro?.video && (
          <Reveal delay={0.15} className="mt-16 md:mt-24">
            <YouTubeLite id={intro.video.id} title="Caffè Vero — od výroby po prípravu kávy" />
          </Reveal>
        )}

        <div className="mt-28 md:mt-44">
          <AboutStory
            chapters={chapters.map((s) => ({
              id: s.id,
              heading: s.heading,
              body: s.body!,
              image: s.image!,
            }))}
          />
        </div>

        {varieties?.varieties && (
          <section className="mt-28 md:mt-44">
            <Reveal>
              <p className="eyebrow">Porovnanie</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-cream md:text-6xl">
                {varieties.heading}
              </h2>
            </Reveal>
            <div className="mt-14">
              <VarietyCompare varieties={varieties.varieties} />
            </div>
          </section>
        )}

        {history?.timeline && (
          <section className="mt-28 pb-28 md:mt-44 md:pb-44">
            <Reveal>
              <p className="eyebrow">Od roku 800 p. n. l.</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-cream md:text-6xl">
                {history.heading}
              </h2>
              <p className="prose-col mt-6 text-lg font-light text-smoke">{history.body}</p>
            </Reveal>
            <div className="mt-16 md:mt-24">
              <HistoryTimeline entries={history.timeline} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
