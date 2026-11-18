import type { MetadataRoute } from "next";
import { PAGES } from "./data/content";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // No artificial lastmod: only add dates backed by actual editorial changes.
  return PAGES.map((page) => ({ url: absoluteUrl(page.path) }));
}
