"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { CategoryFilter, Product } from "@/lib/content";

interface CatalogGridProps {
  products: Product[];
  filters: CategoryFilter[];
}

export default function CatalogGrid({ products, filters }: CatalogGridProps) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("filter");
  const [active, setActive] = useState<string | null>(
    initial && filters.some((f) => f.id === initial) ? initial : null
  );

  const visible = useMemo(
    () => (active ? products.filter((p) => p.subcategory === active) : products),
    [active, products]
  );

  return (
    <div>
      {filters.length > 1 && (
        <div
          role="group"
          aria-label="Filter produktov"
          className="flex flex-wrap gap-2 border-b hairline pb-8"
        >
          <FilterButton
            label={`Všetko · ${products.length}`}
            active={active === null}
            onClick={() => setActive(null)}
          />
          {filters.map((f) => {
            const count = products.filter((p) => p.subcategory === f.id).length;
            if (count === 0) return null; // e.g. Mlynce Fiorenzato — awaiting client data
            return (
              <FilterButton
                key={f.id}
                label={`${f.label} · ${count}`}
                active={active === f.id}
                onClick={() => setActive(f.id)}
              />
            );
          })}
        </div>
      )}

      <motion.ul layout className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.li
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${
        active
          ? "border-bronze bg-bronze text-espresso"
          : "hairline text-smoke hover:border-bronze/60 hover:text-cream"
      }`}
    >
      {label}
    </button>
  );
}
