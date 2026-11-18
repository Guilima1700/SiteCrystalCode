import type { Metadata } from "next";
import { absoluteUrl, SITE } from "./site";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE.name,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "CrystalCode — desenvolvimento de software e produtos digitais",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          alt: "CrystalCode — desenvolvimento de software e produtos digitais",
        },
      ],
    },
  };
}
