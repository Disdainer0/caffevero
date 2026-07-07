import Reveal from "@/components/Reveal";

interface TimelineEntry {
  year: string;
  event: string;
}

export default function HistoryTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative ml-2 border-l hairline md:ml-4">
      {entries.map((entry, i) => (
        <li key={`${entry.year}-${i}`} className="relative pb-12 pl-8 last:pb-0 md:pl-14">
          <span
            aria-hidden
            className="absolute -left-[3.5px] top-2.5 h-[7px] w-[7px] rounded-full bg-bronze"
          />
          <Reveal>
            <p className="font-serif text-2xl italic text-bronze md:text-3xl">{entry.year}</p>
            <p className="prose-col mt-2 text-base font-light leading-relaxed text-smoke">
              {entry.event}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
