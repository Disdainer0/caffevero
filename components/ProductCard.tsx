import Image from "next/image";
import type { Product } from "@/lib/content";

export default function ProductCard({ product }: { product: Product }) {
  // legacy .jpg shots come on white backgrounds — give them a deliberate
  // warm-light plate instead of a ragged white rectangle on black;
  // transparent .png packshots sit directly on the dark surface
  const lightPlate = product.localImage.endsWith(".jpg");
  const card = (
    <article className="group flex h-full flex-col border hairline bg-carbon/60 transition-colors duration-500 hover:bg-graphite/70">
      <div
        className={`relative flex h-60 items-center justify-center overflow-hidden p-6 ${
          lightPlate ? "bg-[#edeae4]" : ""
        }`}
      >
        <Image
          src={product.localImage}
          alt={product.name}
          width={200}
          height={340}
          className={`product-img max-h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05] ${
            lightPlate ? "mix-blend-multiply" : ""
          }`}
        />
      </div>
      <div className="mt-auto border-t hairline p-5">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-bronze/80">
          {product.subcategoryLabel}
        </p>
        <h3 className="mt-1.5 text-sm font-normal leading-snug text-cream">
          {product.name}
          {product.externalUrl && (
            <span aria-hidden className="ml-1.5 inline-block text-bronze">
              ↗
            </span>
          )}
        </h3>
      </div>
    </article>
  );

  if (product.externalUrl) {
    return (
      <a
        href={product.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
        aria-label={`${product.name} — detail na kavovaryfiorenzato.sk`}
      >
        {card}
      </a>
    );
  }
  return card;
}
