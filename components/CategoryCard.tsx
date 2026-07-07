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
  const imagePositionClass = href === "/kava?filter=zrnkova" ? "object-left" : "object-center";

  return (
    <Link
      href={href}
      className="group relative block aspect-square min-h-[150px] w-full overflow-hidden bg-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze sm:min-h-[180px] lg:min-h-[195px]"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className={`${imagePositionClass} object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/25 to-transparent"
      />
      <span
        aria-hidden
        className="absolute right-3 top-3 text-[0.6rem] font-light tracking-[0.18em] text-smoke/80"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-bronze">
          {accentLabel}
        </p>
        <h3 className="mt-1 text-base font-medium tracking-tight text-cream sm:text-lg md:text-xl">
          {title}
        </h3>
        <span className="mt-2 block h-px w-0 bg-bronze transition-[width] duration-500 ease-out group-hover:w-10" />
      </div>
    </Link>
  );
}
