import Reveal from "@/components/Reveal";

interface Variety {
  name: string;
  traits: string[];
  stats: Record<string, string>;
}

const STAT_LABELS: Record<string, string> = {
  kofein: "Kofeín",
  etericke_oleje: "Éterické oleje",
  cukor: "Cukor",
};

export default function VarietyCompare({ varieties }: { varieties: Variety[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {varieties.map((variety, i) => (
        <Reveal key={variety.name} delay={i * 0.1}>
          <article className="h-full border hairline bg-carbon/60 p-8 md:p-12">
            <h3 className="font-serif text-4xl italic text-bronze md:text-5xl">
              {variety.name}
            </h3>
            <ul className="mt-6 space-y-2">
              {variety.traits.map((trait) => (
                <li key={trait} className="text-base font-light text-cream/85">
                  {trait}
                </li>
              ))}
            </ul>
            <dl className="mt-8 space-y-4 border-t hairline pt-6">
              {Object.entries(variety.stats).map(([key, value]) => (
                <div key={key} className="flex items-baseline justify-between gap-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.2em] text-smoke">
                    {STAT_LABELS[key] ?? key}
                  </dt>
                  <dd className="text-lg font-normal text-cream">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
