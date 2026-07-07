import Link from "next/link";
import Image from "next/image";
import type { ShowcaseCard } from "@/lib/content";

interface CategoryCardProps extends ShowcaseCard {
  index: number;
}

export default function CategoryCard({
  title,
  image,
  href,
  accentLabel,
  index,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[62svh] min-h-[420px] w-[78vw] shrink-0 overflow-hidden bg-carbon sm:w-[48vw] lg:w-[34vw] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 78vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/25 to-transparent"
      />
      <span
        aria-hidden
        className="absolute right-5 top-5 text-xs font-light tracking-[0.25em] text-smoke/80"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-bronze">
          {accentLabel}
        </p>
        <h3 className="mt-2 text-2xl font-medium tracking-tight text-cream md:text-3xl">
          {title}
        </h3>
        <span className="mt-4 block h-px w-0 bg-bronze transition-[width] duration-500 ease-out group-hover:w-16" />
      </div>
    </Link>
  );
}
