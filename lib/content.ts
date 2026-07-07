import site from "@/content/site.json";
import categories from "@/content/categories.json";
import products from "@/content/products.json";
import about from "@/content/about.json";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  subcategoryLabel: string;
  legacyImage: string;
  localImage: string;
  externalUrl?: string;
}

export interface CategoryFilter {
  id: string;
  label: string;
}

export interface CategoryPage {
  slug: string;
  navLabel: string;
  title: string;
  filters: CategoryFilter[];
}

export interface ShowcaseCard {
  title: string;
  accentLabel: string;
  image: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company?: string;
}

export const siteContent = site;
export const showcase = categories.showcase as ShowcaseCard[];
export const categoryPages = categories.pages as CategoryPage[];
export const allProducts = products as Product[];
export const aboutContent = about;
export const testimonials = (site.testimonials ?? []) as Testimonial[];

export function getCategoryPage(slug: string): CategoryPage | undefined {
  return categoryPages.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return allProducts.filter((p) => p.category === slug);
}
