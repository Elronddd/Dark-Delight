import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://darkdelight.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu", "/reservations"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
