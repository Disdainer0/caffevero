import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CatalogGrid from "@/components/CatalogGrid";
import Reveal from "@/components/Reveal";
import { categoryPages, getCategoryPage, getProductsByCategory } from "@/lib/content";

interface CategoryRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categoryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: `${page.title} — Caffè Vero, Košice. ${page.filters
      .map((f) => f.label)
      .join(", ")}.`,
  };
}

export default async function CategoryRoute({ params }: CategoryRouteProps) {
  const { slug } = await params;
  const page = getCategoryPage(slug);
  if (!page) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pb-44 md:pt-44">
      <Reveal>
        <nav aria-label="Omrvinková navigácia" className="flex items-center gap-3 text-xs font-light tracking-[0.18em] uppercase text-smoke">
          <Link href="/" className="transition-colors duration-300 hover:text-bronze">
            Domov
          </Link>
          <span aria-hidden className="text-bronze/60">
            /
          </span>
          <span className="text-cream/80">{page.navLabel}</span>
        </nav>
        <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.025em] text-cream md:text-8xl">
          {page.title}
        </h1>
      </Reveal>

      <div className="mt-16 md:mt-24">
        <Suspense>
          <CatalogGrid products={products} filters={page.filters} />
        </Suspense>
      </div>
    </div>
  );
}
