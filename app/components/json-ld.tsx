import { absoluteUrl, SITE } from "../lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function IdentitySchema() {
  return (
    <JsonLd
      data={{
        "@graph": [
          {
            "@type": "Organization",
            "@id": absoluteUrl("/#organization"),
            name: SITE.name,
            alternateName: SITE.alternateName,
            url: absoluteUrl(),
            description: SITE.description,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/brand/icon-512.png"),
              width: 512,
              height: 512,
            },
            email: SITE.email,
            telephone: SITE.phone,
            sameAs: [SITE.instagram],
            areaServed: [
              { "@type": "City", name: "Aracaju" },
              { "@type": "State", name: "Sergipe" },
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Atendimento comercial",
              email: SITE.email,
              telephone: SITE.phone,
              availableLanguage: "pt-BR",
            },
          },
          {
            "@type": "WebSite",
            "@id": absoluteUrl("/#website"),
            name: SITE.name,
            alternateName: SITE.alternateName,
            url: absoluteUrl(),
            inLanguage: "pt-BR",
            publisher: { "@id": absoluteUrl("/#organization") },
          },
        ],
      }}
    />
  );
}

export function PageSchema({
  title,
  description,
  path,
  service,
  breadcrumbs,
}: {
  title: string;
  description: string;
  path: string;
  service?: boolean;
  breadcrumbs: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`${path}#webpage`),
            name: title,
            description,
            url: absoluteUrl(path),
            inLanguage: "pt-BR",
            isPartOf: { "@id": absoluteUrl("/#website") },
            about: { "@id": absoluteUrl("/#organization") },
            breadcrumb: { "@id": absoluteUrl(`${path}#breadcrumb`) },
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`${path}#breadcrumb`),
            itemListElement: breadcrumbs.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              item: absoluteUrl(item.path),
            })),
          },
          ...(service
            ? [
                {
                  "@type": "Service",
                  "@id": absoluteUrl(`${path}#service`),
                  name: title,
                  serviceType: title,
                  description,
                  url: absoluteUrl(path),
                  provider: { "@id": absoluteUrl("/#organization") },
                  areaServed: [
                    { "@type": "City", name: "Aracaju" },
                    { "@type": "State", name: "Sergipe" },
                  ],
                },
              ]
            : []),
        ],
      }}
    />
  );
}
