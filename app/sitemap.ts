import type { MetadataRoute } from "next";
import { categoryPages } from "@/lib/content";

const BASE = "https://caffevero.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/o-kave", "/kontakt"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categories = categoryPages.map((page) => ({
    url: `${BASE}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categories];
}
