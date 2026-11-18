import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentShell } from "../../components/content-shell";
import { PageSchema } from "../../components/json-ld";
import { SERVICES } from "../../data/content";
import { pageMetadata } from "../../lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}
async function getService(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  return service;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const s = await getService(params);
  return pageMetadata(s.title, s.description, `/servicos/${s.slug}`);
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const s = await getService(params);
  const path = `/servicos/${s.slug}`;
  const breadcrumbs = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: s.name, path },
  ];
  return (
    <ContentShell breadcrumbs={breadcrumbs}>
      <PageSchema
        title={s.title}
        description={s.description}
        path={path}
        service
        breadcrumbs={breadcrumbs}
      />
      <p className="eyebrow">Desenvolvimento sob medida</p>
      <h1>{s.title}</h1>
      <p className="inner-lead">{s.intro}</p>
      {s.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
      <section>
        <h2>Desenvolvimento em Aracaju, Sergipe</h2>
        <p>
          A CrystalCode é uma equipe de Aracaju que une design e engenharia de
          software. O contato sobre escopo, investimento e prazo é feito por{" "}
          <Link href="/contato">WhatsApp ou e-mail</Link>, sem sede de
          atendimento presencial.
        </p>
      </section>
      <section>
        <h2>Soluções relacionadas</h2>
        <ul className="related-links">
          {SERVICES.filter((item) => item.slug !== s.slug).map((item) => (
            <li key={item.slug}>
              <Link href={`/servicos/${item.slug}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <Link href="/projetos">
          Conheça os projetos publicados no portfólio
        </Link>
      </section>
      <section className="inner-cta">
        <h2>Conte o que você precisa construir</h2>
        <p>Vamos entender seu contexto antes de definir a solução.</p>
        <Link href="/contato" className="btn-primary">
          Conversar sobre meu projeto
        </Link>
      </section>
    </ContentShell>
  );
}
