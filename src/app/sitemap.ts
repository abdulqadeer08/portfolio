import type { MetadataRoute } from "next";
import { projects, site } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
