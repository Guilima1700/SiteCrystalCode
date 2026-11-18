import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentShell } from "../components/content-shell";
import { PageSchema } from "../components/json-ld";
import { FAQ, PAGES, SERVICES } from "../data/content";
import { PROJETOS } from "../data/projetos";
import { pageMetadata } from "../lib/seo";
import { SITE } from "../lib/site";

const pages = PAGES.filter(
  (p) => p.path !== "/" && !p.path.slice(1).includes("/"),
);
export const dynamicParams = false;
export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.path.slice(1) }));
}
async function getPage(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const page = pages.find((p) => p.path === `/${slug}`);
  if (!page) notFound();
  return page;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = await getPage(params);
  return pageMetadata(page.title, page.description, page.path);
}

export default async function InformationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const page = await getPage(params);
  const breadcrumbs = [
    { name: "Início", path: "/" },
    { name: page.title, path: page.path },
  ];
  return (
    <ContentShell breadcrumbs={breadcrumbs}>
      <PageSchema {...page} breadcrumbs={breadcrumbs} />
      <p className="eyebrow">CrystalCode</p>
      <h1>{page.title}</h1>
      {page.path === "/sobre" && (
        <>
          <p className="inner-lead">
            A {SITE.name} ({SITE.alternateName}) é uma equipe de desenvolvimento
            de software de Aracaju, Sergipe. Unimos design de interface e
            engenharia para construir sistemas e produtos digitais sob medida.
          </p>
          <section>
            <h2>Software que acompanha a operação</h2>
            <p>
              A CrystalCode nasceu para atender negócios que precisavam de mais
              do que um site padrão. Trabalhamos com sistemas administrativos,
              dashboards, plataformas web, SaaS, automações e integrações, além
              da presença institucional na internet.
            </p>
            <p>
              O projeto começa pela compreensão do problema e das pessoas que
              utilizarão a solução. Esse entendimento orienta requisitos,
              arquitetura e interface, com atenção à segurança, à manutenção e à
              evolução do produto.
            </p>
          </section>
          <section>
            <h2>Da estratégia à evolução</h2>
            <p>
              Nosso processo passa por estratégia, UX/UI, desenvolvimento,
              testes, lançamento e evolução. Organizamos as etapas para que as
              decisões técnicas estejam ligadas aos objetivos do negócio e aos
              critérios acordados para a entrega.
            </p>
            <p>
              Conheça nossos{" "}
              <Link href="/servicos">serviços de desenvolvimento</Link> e os{" "}
              <Link href="/projetos">projetos publicados no portfólio</Link>.
            </p>
          </section>
          <section>
            <h2>Uma equipe de Aracaju</h2>
            <p>
              Somos de Aracaju, Sergipe, sem sede de atendimento presencial. A
              conversa sobre seu projeto pode começar pelos nossos{" "}
              <Link href="/contato">canais de contato</Link>.
            </p>
          </section>
        </>
      )}
      {page.path === "/servicos" && (
        <>
          <p className="inner-lead">
            Desenvolvemos soluções digitais para apresentar empresas, organizar
            operações e criar produtos. O escopo de cada projeto é definido a
            partir do problema, dos usuários e das integrações necessárias.
          </p>
          <section>
            <h2>O que podemos construir</h2>
            <div className="service-links">
              {SERVICES.map((s) => (
                <article key={s.slug}>
                  <h3>
                    <Link href={`/servicos/${s.slug}`}>{s.name}</Link>
                  </h3>
                  <p>{s.intro}</p>
                </article>
              ))}
            </div>
          </section>
          <section>
            <h2>Como escolher a solução para sua empresa?</h2>
            <p>
              Um site institucional atende à apresentação da marca. Sistemas
              personalizados organizam a operação interna; plataformas conectam
              diferentes perfis de usuário. Produtos SaaS acrescentam um modelo
              de serviço recorrente. Automações podem integrar essas ferramentas
              e reduzir etapas manuais.
            </p>
            <p>
              Se ainda não há uma definição, comece descrevendo a rotina atual,
              as dificuldades e o que precisa mudar. Essa conversa ajuda a
              delimitar a solução e suas prioridades.
            </p>
          </section>
          <section className="faq-section">
            <h2>Perguntas sobre desenvolvimento de software</h2>
            {FAQ.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </section>
        </>
      )}
      {page.path === "/projetos" && (
        <>
          <p className="inner-lead">
            Uma seleção de projetos publicados pela CrystalCode. As descrições
            apresentam o contexto de cada site; não atribuímos métricas ou
            resultados comerciais que não foram documentados.
          </p>
          <section>
            <h2>Projetos publicados</h2>
            <div className="portfolio-list">
              {PROJETOS.map((p) => (
                <article key={p.id}>
                  {p.imagem && (
                    <Image
                      src={p.imagem}
                      alt={`Página inicial do projeto ${p.nome}`}
                      width={p.largura}
                      height={p.altura}
                      sizes="(max-width: 700px) 90vw, 850px"
                      className="portfolio-image"
                    />
                  )}
                  <p className="eyebrow">{p.categoria}</p>
                  <h3>{p.nome}</h3>
                  <p>{p.descricao}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    Visitar {p.nome}{" "}
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </article>
              ))}
            </div>
          </section>
          <section>
            <h2>Seu projeto pode exigir outra estrutura</h2>
            <p>
              O portfólio acima apresenta sites institucionais. Nosso escopo de
              serviços também inclui{" "}
              <Link href="/servicos/sistemas-sob-medida">
                sistemas empresariais personalizados
              </Link>
              , <Link href="/servicos/plataformas-web">plataformas web</Link> e{" "}
              <Link href="/servicos/desenvolvimento-saas">produtos SaaS</Link>.
              Converse conosco sobre o problema que você precisa resolver.
            </p>
          </section>
        </>
      )}
      {page.path === "/contato" && (
        <>
          <p className="inner-lead">
            Conte o que sua empresa precisa construir ou melhorar. Somos de
            Aracaju, Sergipe, e atendemos o contato comercial pelos canais
            abaixo, sem sede de atendimento presencial.
          </p>
          <section>
            <h2>Fale com a equipe</h2>
            <ul className="contact-list">
              <li>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {SITE.phoneLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>E-mail: {SITE.email}</a>
              </li>
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: @crystallcode
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>O que compartilhar na primeira conversa?</h2>
            <p>
              Explique o contexto do negócio, quem utilizará a solução e quais
              tarefas precisam ser resolvidas. Se já existem sistemas,
              integrações, referências ou uma data desejada, essas informações
              ajudam a avaliar o escopo.
            </p>
            <p>
              Não envie senhas, credenciais ou dados pessoais de clientes no
              primeiro contato. Podemos começar pela descrição dos processos e
              dos objetivos.
            </p>
          </section>
          <section>
            <h2>Investimento e prazo</h2>
            <p>
              O valor e o cronograma variam conforme funcionalidades,
              integrações e complexidade. A proposta depende do entendimento
              dessas necessidades. Consulte os{" "}
              <Link href="/servicos">serviços e perguntas frequentes</Link> para
              conhecer as possibilidades.
            </p>
          </section>
        </>
      )}
      {page.path === "/privacidade" && (
        <>
          <p className="inner-lead">
            Esta página explica a medição de uso do site da CrystalCode e as
            escolhas disponíveis para o visitante.
          </p>
          <section>
            <h2>Google Analytics e sua escolha</h2>
            <p>
              Usamos o Google Analytics 4 para entender visitas às páginas e
              cliques nos nossos canais de contato. A tag de medição só é
              carregada depois que você seleciona “Permitir medição”. Recusar
              mantém o site disponível e não carrega a tag do Analytics.
            </p>
            <p>
              A preferência é salva no armazenamento local deste navegador por
              até 180 dias, sem nome ou e-mail do visitante. Você pode rever sua
              decisão pelo botão “Preferências de cookies”. Se o navegador
              bloquear esse armazenamento, a escolha vale apenas para a página
              aberta.
            </p>
          </section>
          <section>
            <h2>O que é medido</h2>
            <p>
              Após a permissão, enviamos visualizações de páginas e o tipo de
              canal de contato clicado: WhatsApp, e-mail ou Instagram. Os
              eventos implementados não incluem o conteúdo de mensagens, dados
              de formulários ou a URL completa do link de contato. Os endereços
              de página enviados por esses eventos excluem parâmetros de
              consulta e fragmentos.
            </p>
            <p>
              Ao carregar a tag, seu navegador se comunica com o Google, que
              também pode processar informações técnicas da conexão, do
              navegador e do dispositivo. O Analytics pode criar cookies com
              nomes como _ga e _ga_ para distinguir acessos. A retenção dos
              dados no serviço depende da configuração da propriedade do
              Analytics.
            </p>
            <p>
              Esta integração mantém negadas as permissões de armazenamento
              publicitário, uso de dados para anúncios e personalização de
              anúncios. Não ativamos Google Signals nem identificação por nome,
              e-mail ou User-ID.
            </p>
          </section>
          <section>
            <h2>Como recusar ou retirar a permissão</h2>
            <p>
              Abra “Preferências de cookies” e selecione “Recusar medição”. A
              integração desativa os próximos eventos e remove os cookies de
              Analytics acessíveis neste domínio. Essa escolha não apaga
              automaticamente dados já enviados ao Google.
            </p>
            <p>
              Você também pode limpar os dados do site nas configurações do
              navegador. Nesse caso, uma nova escolha será solicitada na próxima
              visita. Bloqueadores de conteúdo podem impedir a medição mesmo
              quando há permissão.
            </p>
          </section>
          <section>
            <h2>Serviços externos e contato</h2>
            <p>
              Ao escolher um canal de contato ou abrir um link externo, você
              passa a utilizar o serviço de destino, sujeito às políticas dele.
              Consulte{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites?hl=pt-BR"
                target="_blank"
                rel="noopener noreferrer"
              >
                como o Google usa informações de sites que utilizam seus
                serviços
              </a>
              .
            </p>
            <p>
              Para dúvidas sobre a medição no site da CrystalCode ou
              solicitações relacionadas aos seus dados, entre em contato pelo
              e-mail <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </section>
        </>
      )}
      {page.path !== "/contato" && page.path !== "/privacidade" && (
        <section className="inner-cta">
          <h2>Vamos conversar sobre seu projeto?</h2>
          <p>Compartilhe seu contexto para avaliarmos a solução adequada.</p>
          <Link className="btn-primary" href="/contato">
            Falar com a CrystalCode
          </Link>
        </section>
      )}
    </ContentShell>
  );
}
