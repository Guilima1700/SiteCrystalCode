"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { SITE } from "../lib/site";
import { FAQ } from "../data/content";

import {
  m,
  LazyMotion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Layout,
  Smartphone,
  Zap,
  Globe,
  Database,
  Boxes,
  Workflow,
  ShoppingCart,
  LayoutDashboard,
  Plug,
  Search,
  Palette,
  Code2,
  FlaskConical,
  Rocket,
  TrendingUp,
  BarChart3,
  Lock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  siDocker,
  siFirebase,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSpringboot,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { PROJETOS, type Projeto } from "../data/projetos";

const loadFeatures = () =>
  import("./motion-features").then((module) => module.default);

const SOLUCOES = [
  {
    numero: "01",
    titulo: "Websites",
    slug: "criacao-de-sites",
    desc: "Sites institucionais e landing pages de alta conversão, construídos com performance e identidade visual sob medida.",
    icon: Layout,
  },
  {
    numero: "02",
    titulo: "Sistemas",
    slug: "sistemas-sob-medida",
    desc: "Painéis administrativos, ERPs, CRMs e ferramentas internas para organizar e escalar operações.",
    icon: LayoutDashboard,
  },
  {
    numero: "03",
    titulo: "Plataformas",
    slug: "plataformas-web",
    desc: "Marketplaces, portais e produtos digitais com múltiplos perfis de usuário e regras de negócio complexas.",
    icon: Boxes,
  },
  {
    numero: "04",
    titulo: "SaaS",
    slug: "desenvolvimento-saas",
    desc: "Produtos recorrentes, multi-tenant e escaláveis, prontos para crescer junto com a base de clientes.",
    icon: Database,
  },
  {
    numero: "05",
    titulo: "E-commerce",
    slug: "e-commerce",
    desc: "Lojas virtuais com experiência de compra personalizada, do catálogo ao checkout.",
    icon: ShoppingCart,
  },
  {
    numero: "06",
    titulo: "Automação & Integrações",
    slug: "automacao-e-integracoes",
    desc: "Conexão entre sistemas, APIs e fluxos automatizados que eliminam trabalho manual.",
    icon: Workflow,
  },
];

const PROCESSO = [
  {
    numero: "01",
    titulo: "Estratégia",
    desc: "Entendemos o negócio, o problema real e os objetivos antes de qualquer linha de código.",
    icon: Search,
  },
  {
    numero: "02",
    titulo: "UX/UI",
    desc: "Transformamos requisitos em uma experiência clara, com arquitetura de informação pensada para o usuário final.",
    icon: Palette,
  },
  {
    numero: "03",
    titulo: "Desenvolvimento",
    desc: "Construímos a solução com tecnologias modernas, código organizado e arquitetura preparada para escalar.",
    icon: Code2,
  },
  {
    numero: "04",
    titulo: "Testes",
    desc: "Validamos performance, segurança e comportamento em diferentes dispositivos e cenários de uso.",
    icon: FlaskConical,
  },
  {
    numero: "05",
    titulo: "Lançamento",
    desc: "Colocamos o produto em produção com monitoramento e critérios claros de qualidade.",
    icon: Rocket,
  },
  {
    numero: "06",
    titulo: "Evolução",
    desc: "Acompanhamos métricas de uso e evoluímos a solução conforme o negócio cresce.",
    icon: TrendingUp,
  },
];

const ENGENHARIA = [
  {
    titulo: "Performance",
    desc: "Carregamento rápido e otimizado, medido — não estimado.",
    icon: Zap,
  },
  {
    titulo: "Escalabilidade",
    desc: "Arquitetura preparada para crescer em usuários e dados.",
    icon: TrendingUp,
  },
  {
    titulo: "Segurança",
    desc: "Autenticação, permissões e boas práticas desde a fundação.",
    icon: Lock,
  },
  {
    titulo: "Integrações & APIs",
    desc: "Sistemas que conversam entre si, sem retrabalho manual.",
    icon: Plug,
  },
  {
    titulo: "Responsividade real",
    desc: "Experiência pensada para cada tamanho de tela, não apenas redimensionada.",
    icon: Smartphone,
  },
  {
    titulo: "Arquitetura",
    desc: "Código organizado, documentado e sustentável a longo prazo.",
    icon: Globe,
  },
];

const TECNOLOGIAS = [
  { nome: "JavaScript", icon: siJavascript },
  { nome: "React", icon: siReact },
  { nome: "Next.js", icon: siNextdotjs },
  { nome: "TypeScript", icon: siTypescript },
  { nome: "Tailwind CSS", icon: siTailwindcss },
  { nome: "Docker", icon: siDocker },
  { nome: "Java", icon: null },
  { nome: "Spring Boot", icon: siSpringboot },
  { nome: "PostgreSQL", icon: siPostgresql },
  { nome: "Node.js", icon: siNodedotjs },
  { nome: "Firebase", icon: siFirebase },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function useMotionSafe() {
  const reduce = useReducedMotion();
  return reduce;
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useMotionSafe();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 1, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="badge">
    <span className="badge-dot">
      <span className="badge-ping" />
      <span className="badge-circle" />
    </span>
    {children}
  </div>
);

const BotaoPrincipal = ({ texto, href }: { texto: string; href: string }) => (
  <a
    className="btn-primary"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="btn-content">
      {texto} <ArrowRight size={18} className="icon-arrow" />
    </span>
  </a>
);

const BotaoSecundario = ({ texto, href }: { texto: string; href: string }) => (
  <a className="btn-secondary" href={href}>
    {texto}
  </a>
);

function SolucaoCard({
  numero,
  titulo,
  slug,
  desc,
  icon: Icon,
  index,
}: {
  numero: string;
  titulo: string;
  slug: string;
  desc: string;
  icon: LucideIcon;
  index: number;
}) {
  const reduce = useMotionSafe();
  return (
    <m.div
      className="solucao-card"
      initial={reduce ? { opacity: 1 } : { opacity: 1, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
      whileHover={reduce ? {} : { y: -6 }}
    >
      <div className="solucao-top">
        <span className="solucao-numero">{numero}</span>
        <div className="solucao-icon">
          <Icon size={20} />
        </div>
      </div>
      <h3 className="solucao-titulo">{titulo}</h3>
      <p className="solucao-desc">{desc}</p>
      <Link className="service-detail-link" href={`/servicos/${slug}`}>
        Conhecer {titulo.toLowerCase()} <ArrowRight size={15} />
      </Link>
      <div className="solucao-line" />
    </m.div>
  );
}

function ProjetoCard({
  projeto,
  index,
  total,
}: {
  projeto: Projeto;
  index: number;
  total: number;
}) {
  const reduce = useMotionSafe();
  const [imagemFalhou, setImagemFalhou] = React.useState(false);
  const temImagem = Boolean(projeto.imagem) && !imagemFalhou;
  const temLink = Boolean(projeto.url);

  return (
    <m.div
      className="projeto-card"
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} de ${total}: ${projeto.nome}`}
      initial={reduce ? { opacity: 1 } : { opacity: 1, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
      whileHover={reduce ? {} : { y: -6 }}
    >
      <div className="projeto-preview">
        <div className="projeto-browser" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="browser-url projeto-url">
            {projeto.url
              ? projeto.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : "em breve"}
          </span>
        </div>
        <div className="projeto-shot">
          {temImagem ? (
            <Image
              src={projeto.imagem!}
              fill
              sizes="(max-width: 699px) 80vw, (max-width: 999px) 55vw, 360px"
              alt={`Prévia do site ${projeto.nome}`}
              className="projeto-img"
              loading="lazy"
              draggable={false}
              onError={() => setImagemFalhou(true)}
            />
          ) : (
            <div className="projeto-placeholder" aria-hidden="true">
              <Globe size={28} />
              <span>{projeto.nome}</span>
            </div>
          )}
          <div className="projeto-img-overlay" />
        </div>
      </div>

      <div className="projeto-body">
        <span className="projeto-categoria">{projeto.categoria}</span>
        <h3 className="projeto-titulo">{projeto.nome}</h3>
        <p className="projeto-desc">{projeto.descricao}</p>
        {temLink ? (
          <a
            className="projeto-link"
            href={projeto.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar projeto ${projeto.nome} (abre em nova aba)`}
          >
            Visitar projeto <ArrowUpRight size={16} className="icon-arrow-up" />
          </a>
        ) : (
          <span
            className="projeto-link projeto-link-disabled"
            aria-disabled="true"
          >
            Em breve
          </span>
        )}
      </div>
      <div className="solucao-line" />
    </m.div>
  );
}

function CarrosselProjetos() {
  const reduce = useMotionSafe();
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const [dragging, setDragging] = React.useState(false);
  const [estado, setEstado] = React.useState({
    prev: false,
    next: false,
    ativo: 0,
  });

  const atualizar = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const prev = el.scrollLeft > 2;
    const next = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    let ativo = 0;
    if (prev && !next) {
      ativo = cards.length - 1;
    } else {
      let menor = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - el.scrollLeft);
        if (d < menor) {
          menor = d;
          ativo = i;
        }
      });
    }
    setEstado((atual) =>
      atual.prev === prev && atual.next === next && atual.ativo === ativo
        ? atual
        : { prev, next, ativo },
    );
  }, []);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    atualizar();
    el.addEventListener("scroll", atualizar, { passive: true });
    const ro = new ResizeObserver(atualizar);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", atualizar);
      ro.disconnect();
    };
  }, [atualizar]);

  const behavior = reduce ? "auto" : "smooth";

  const mover = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const passo =
      cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : el.clientWidth;
    el.scrollBy({ left: dir * passo, behavior });
  };

  const irPara = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft, behavior });
  };

  const aoPressionar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
    };
  };

  const aoArrastar = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = trackRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.startLeft - dx;
  };

  const aoSoltar = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = trackRef.current;
    if (!d.active) return;
    d.active = false;
    if (d.moved) {
      setDragging(false);
      if (el?.hasPointerCapture(e.pointerId))
        el.releasePointerCapture(e.pointerId);
    }
  };

  const aoClicar = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const rolavel = estado.prev || estado.next;

  return (
    <div
      className={`projetos-carousel${estado.prev ? " has-prev" : ""}${estado.next ? " has-next" : ""}`}
    >
      <div
        ref={trackRef}
        className={`projetos-track${dragging ? " is-dragging" : ""}`}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Projetos desenvolvidos"
        onPointerDown={aoPressionar}
        onPointerMove={aoArrastar}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onClickCapture={aoClicar}
      >
        {PROJETOS.map((p, i) => (
          <ProjetoCard
            key={p.id}
            projeto={p}
            index={i}
            total={PROJETOS.length}
          />
        ))}
      </div>

      {rolavel && (
        <div className="projetos-controls">
          <div
            className="projetos-dots"
            role="group"
            aria-label="Indicadores de projeto"
          >
            {PROJETOS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`projetos-dot${i === estado.ativo ? " active" : ""}`}
                aria-label={`Ir para o projeto ${p.nome}`}
                aria-current={i === estado.ativo ? "true" : undefined}
                onClick={() => irPara(i)}
              />
            ))}
          </div>
          <div className="projetos-arrows">
            <button
              type="button"
              className="projetos-arrow"
              aria-label="Projeto anterior"
              disabled={!estado.prev}
              onClick={() => mover(-1)}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="projetos-arrow"
              aria-label="Próximo projeto"
              disabled={!estado.next}
              onClick={() => mover(1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProcessoStep({
  item,
  index,
  total,
}: {
  item: (typeof PROCESSO)[number];
  index: number;
  total: number;
}) {
  const reduce = useMotionSafe();
  const Icon = item.icon;
  return (
    <m.div
      className="processo-step"
      initial={reduce ? { opacity: 1 } : { opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
    >
      <div className="processo-marker">
        <div className="processo-dot" />
        {index < total - 1 && <div className="processo-connector" />}
      </div>
      <div className="processo-content">
        <div className="processo-icon">
          <Icon size={20} />
        </div>
        <span className="processo-numero">{item.numero}</span>
        <h3 className="processo-titulo">{item.titulo}</h3>
        <p className="processo-desc">{item.desc}</p>
      </div>
    </m.div>
  );
}

export default function SiteCrystalCode() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduce ? 1 : 0.4],
  );

  return (
    <LazyMotion features={loadFeatures} strict>
      <div className="main-wrapper">
        <nav className="navbar-container" aria-label="Navegação principal">
          <div className="navbar">
            <Link
              href="/"
              className="logo"
              aria-label="CrystalCode — página inicial"
            >
              <Image
                className="logo-img"
                src="/cc.png"
                alt="CrystalCode"
                width={48}
                height={60}
                sizes="48px"
              />
            </Link>

            <ul className="menu-desktop">
              {[
                { name: "Soluções", id: "solucoes" },
                { name: "O que fazemos", id: "construimos" },
                { name: "Projetos", id: "projetos" },
                { name: "Processo", id: "processos" },
                { name: "Sobre", id: "sobre" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={`#${item.id}`}>{item.name}</a>
                </li>
              ))}
            </ul>

            <a
              className="btn-nav"
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar sobre meu projeto
            </a>
          </div>
        </nav>

        <div className="hero-bg-glow" aria-hidden="true" />
        <div className="hero-grid-lines" aria-hidden="true" />

        <main id="conteudo" tabIndex={-1}>
          <section className="hero-section" ref={heroRef}>
            <m.div
              style={{ y: heroY, opacity: heroOpacity }}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Badge>Desenvolvimento de software sob medida</Badge>
              <h1>
                Sites, sistemas e produtos digitais{" "}
                <br className="hide-mobile" />
                <span className="text-gradient">
                  construídos para o seu negócio
                </span>
              </h1>
              <p className="hero-desc">
                A CrystalCode é uma empresa de desenvolvimento de software de
                Aracaju, Sergipe. Criamos sistemas sob medida, sites
                profissionais, plataformas web, SaaS e automações, com design e
                engenharia para a operação do seu negócio.
              </p>
              <div className="hero-buttons">
                <BotaoPrincipal
                  texto="Vamos construir seu projeto"
                  href={SITE.whatsapp}
                />
                <BotaoSecundario
                  texto="Conhecer nossas soluções"
                  href="#solucoes"
                />
              </div>
            </m.div>
          </section>

          <section className="clients-section">
            <p className="clients-label">
              Do primeiro clique ao sistema completo
            </p>
            <div className="logos-wrapper">
              {[
                "Websites",
                "Sistemas",
                "Plataformas",
                "SaaS",
                "E-commerce",
                "Automação",
              ].map((item) => (
                <span key={item} className="client-logo">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="alem-section">
            <div className="max-w-container">
              <FadeUp>
                <Badge>Nosso posicionamento</Badge>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2 className="alem-title">
                  Não criamos apenas páginas.
                  <br />
                  <span className="text-gradient">
                    Construímos produtos digitais.
                  </span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="alem-desc">
                  Um site é apenas o ponto de entrada. Por trás dele,
                  desenvolvemos sistemas administrativos, dashboards,
                  plataformas web, automações e integrações que sustentam a
                  operação real de uma empresa — não só a sua presença online.
                </p>
              </FadeUp>

              <div className="alem-grid">
                {[
                  {
                    titulo: "Sites & experiências institucionais",
                    icon: Layout,
                  },
                  { titulo: "Landing pages de alta conversão", icon: Zap },
                  { titulo: "Sistemas administrativos", icon: LayoutDashboard },
                  { titulo: "Dashboards & indicadores", icon: BarChart3 },
                  { titulo: "Plataformas web & SaaS", icon: Boxes },
                  { titulo: "E-commerce sob medida", icon: ShoppingCart },
                  { titulo: "Automação de processos", icon: Workflow },
                  { titulo: "Integrações & APIs", icon: Plug },
                ].map((item, i) => (
                  <m.div
                    className="alem-item"
                    key={item.titulo}
                    initial={reduce ? { opacity: 1 } : { opacity: 1, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      ease: EASE,
                      delay: (i % 4) * 0.06,
                    }}
                    whileHover={
                      reduce
                        ? {}
                        : { y: -4, borderColor: "rgba(99,185,193,0.5)" }
                    }
                  >
                    <item.icon size={18} className="alem-item-icon" />
                    <span>{item.titulo}</span>
                  </m.div>
                ))}
              </div>
            </div>
          </section>

          <section id="construimos" className="construimos-section">
            <div className="max-w-container">
              <div className="text-center">
                <FadeUp>
                  <Badge>O que podemos construir</Badge>
                </FadeUp>
                <FadeUp delay={0.05}>
                  <h2 className="section-title">
                    Da ideia simples ao sistema complexo
                  </h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <p className="section-desc">
                    Cada categoria abaixo representa um nível diferente de
                    complexidade — e estamos preparados para todos eles.
                  </p>
                </FadeUp>
              </div>

              <div id="solucoes" className="solucoes-grid">
                {SOLUCOES.map((s, i) => (
                  <SolucaoCard key={s.titulo} {...s} index={i} />
                ))}
              </div>
            </div>
          </section>

          <section id="projetos" className="projetos-section">
            <div className="max-w-container">
              <div className="text-center">
                <FadeUp>
                  <Badge>Portfólio</Badge>
                </FadeUp>
                <FadeUp delay={0.05}>
                  <h2 className="section-title">Últimos Projetos</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <p className="section-desc">
                    Sites e soluções entregues com design sob medida e
                    engenharia real. Explore cada projeto diretamente no ar.
                  </p>
                </FadeUp>
              </div>

              <CarrosselProjetos />
              <Link
                className="service-detail-link portfolio-more"
                href="/projetos"
              >
                Conhecer todos os projetos <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          <section className="engenharia-section">
            <div className="max-w-container">
              <div className="engenharia-grid-layout">
                <div>
                  <FadeUp>
                    <Badge>Engenharia por trás do design</Badge>
                  </FadeUp>
                  <FadeUp delay={0.05}>
                    <h2 className="engenharia-title">
                      Por trás de uma interface bonita existe uma engenharia bem
                      construída.
                    </h2>
                  </FadeUp>
                  <FadeUp delay={0.1}>
                    <p className="engenharia-desc">
                      Design é só a superfície. O que garante que um sistema
                      funcione sob uso real é a arquitetura, a segurança e a
                      performance construídas desde a primeira decisão técnica.
                    </p>
                  </FadeUp>
                </div>

                <div className="engenharia-list">
                  {ENGENHARIA.map((item, i) => (
                    <m.div
                      className="engenharia-item"
                      key={item.titulo}
                      initial={reduce ? { opacity: 1 } : { opacity: 1, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.5,
                        ease: EASE,
                        delay: i * 0.06,
                      }}
                    >
                      <div className="engenharia-icon">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <h3>{item.titulo}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="story-section" id="sobre">
            <div className="story-container">
              <div className="story-image-wrapper">
                <Image
                  src="/lindos.png"
                  alt="Equipe da CrystalCode"
                  className="story-img"
                  fill
                  sizes="(min-width: 900px) 520px, 90vw"
                />
                <div className="story-img-overlay" />
              </div>

              <div className="story-text-col">
                <Badge>Sobre a CrystalCode</Badge>
                <h2 className="story-title">
                  Não somos apenas <br /> desenvolvedores.
                </h2>
                <p className="story-desc">
                  A {SITE.name} ({SITE.alternateName}) nasceu para atender
                  negócios que precisavam de mais do que um site padrão.
                  Começamos com sistemas para operações reais e, a partir disso,
                  estruturamos uma forma de trabalhar que combina design,
                  engenharia e atenção ao que cada cliente realmente precisa.
                </p>
                <p className="story-desc">
                  Hoje unimos <strong>design de interface</strong> com{" "}
                  <strong>engenharia de software</strong> para construir
                  soluções que funcionam na prática — não apenas no protótipo.
                </p>
                <Link className="service-detail-link" href="/sobre">
                  Conheça a CrystalCode <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </section>

          <section id="processos" className="process-section">
            <div className="max-w-container">
              <div className="text-center">
                <FadeUp>
                  <Badge>Como trabalhamos</Badge>
                </FadeUp>
                <FadeUp delay={0.05}>
                  <h2 className="section-title">Do conceito ao produto</h2>
                </FadeUp>
                <FadeUp delay={0.1}>
                  <p className="section-desc">
                    Um processo estruturado para transformar um problema de
                    negócio em uma solução digital funcional.
                  </p>
                </FadeUp>
              </div>

              <div className="processo-timeline">
                {PROCESSO.map((item, i) => (
                  <ProcessoStep
                    key={item.titulo}
                    item={item}
                    index={i}
                    total={PROCESSO.length}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="tech-section">
            <div className="max-w-container">
              <div className="text-center">
                <FadeUp>
                  <Badge>Stack tecnológica</Badge>
                </FadeUp>
                <FadeUp delay={0.05}>
                  <h2 className="section-title">
                    Tecnologia moderna, sem exageros
                  </h2>
                </FadeUp>
              </div>
            </div>

            <div className="tech-marquee-wrapper">
              <div className="tech-marquee-gradient tech-marquee-gradient-left" />
              <div className="tech-marquee-gradient tech-marquee-gradient-right" />
              <m.div
                className="tech-marquee-track"
                animate={reduce ? {} : { x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
              >
                {[0, 1].map((group) => (
                  <div
                    className="tech-marquee-group"
                    key={group}
                    aria-hidden={group === 1}
                  >
                    {TECNOLOGIAS.map((tech) => (
                      <div
                        className="tech-chip"
                        key={tech.nome}
                        title={tech.nome}
                        role="img"
                        aria-label={group === 0 ? tech.nome : undefined}
                      >
                        {tech.icon ? (
                          <svg
                            viewBox="0 0 24 24"
                            className="tech-icon"
                            aria-hidden="true"
                          >
                            <path
                              d={tech.icon.path}
                              fill={`#${tech.icon.hex}`}
                            />
                          </svg>
                        ) : (
                          <Image
                            src="/brand/java.webp"
                            width={30}
                            height={30}
                            alt=""
                            className="tech-icon"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </m.div>
            </div>
          </section>

          <section
            className="faq-section max-w-container"
            aria-labelledby="faq-title"
          >
            <h2 id="faq-title" className="section-title">
              Dúvidas sobre desenvolvimento de software
            </h2>
            {FAQ.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
            <Link className="service-detail-link" href="/servicos">
              Explore nossos serviços <ArrowRight size={15} />
            </Link>
          </section>

          <section className="cta-final-section">
            <div className="cta-final-glow" aria-hidden="true" />
            <FadeUp>
              <h2 className="cta-final-title">
                Seu próximo produto digital começa aqui.
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="cta-final-desc">
                Seja uma landing page, um sistema interno ou uma plataforma
                completa, transformamos ideias e necessidades de negócio em
                soluções digitais funcionais.
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <BotaoPrincipal texto="Vamos conversar" href={SITE.whatsapp} />
            </FadeUp>
          </section>
        </main>
        <footer className="site-footer">
          <div className="footer-container">
            <div className="footer-col footer-brand">
              <Image
                className="footer-logo"
                src="/cc.png"
                alt="CrystalCode"
                width={128}
                height={160}
                sizes="128px"
              />
              <p className="footer-tagline">
                Sites, sistemas e produtos digitais construídos para o seu
                negócio.
              </p>
            </div>

            <div className="footer-col">
              <h2>Empresa</h2>
              <Link href="/sobre">Sobre</Link>
              <a href="#processos">Processo</a>
              <Link href="/projetos">Projetos</Link>
            </div>

            <div className="footer-col">
              <h2>Soluções</h2>
              <Link href="/servicos/criacao-de-sites">Websites</Link>
              <Link href="/servicos/sistemas-sob-medida">Sistemas</Link>
              <Link href="/servicos/plataformas-web">Plataformas & SaaS</Link>
              <Link href="/servicos/e-commerce">E-commerce</Link>
            </div>

            <div className="footer-col">
              <h2>Contato</h2>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp: {SITE.phoneLabel}
              </a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram @crystallcode
              </a>
              <Link href="/contato">Contato · Aracaju, Sergipe</Link>
              <Link href="/privacidade">Privacidade e cookies</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} CrystalCode. Todos os direitos
              reservados.
            </p>
            <p className="footer-signature">
              Tecnologia sob medida, do primeiro clique ao sistema completo.
            </p>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}
