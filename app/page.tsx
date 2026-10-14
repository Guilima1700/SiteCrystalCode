"use client";

import React, { useRef } from "react";
import {
  motion,
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
  Shield,
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
  Users,
  BarChart3,
  Lock,
  ArrowUpRight,
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
import { PROJETOS, type Projeto } from "./data/projetos";


const SOLUCOES = [
  {
    numero: "01",
    titulo: "Websites",
    desc: "Sites institucionais e landing pages de alta conversão, construídos com performance e identidade visual sob medida.",
    icon: Layout,
  },
  {
    numero: "02",
    titulo: "Sistemas",
    desc: "Painéis administrativos, ERPs, CRMs e ferramentas internas para organizar e escalar operações.",
    icon: LayoutDashboard,
  },
  {
    numero: "03",
    titulo: "Plataformas",
    desc: "Marketplaces, portais e produtos digitais com múltiplos perfis de usuário e regras de negócio complexas.",
    icon: Boxes,
  },
  {
    numero: "04",
    titulo: "SaaS",
    desc: "Produtos recorrentes, multi-tenant e escaláveis, prontos para crescer junto com a base de clientes.",
    icon: Database,
  },
  {
    numero: "05",
    titulo: "E-commerce",
    desc: "Lojas virtuais com experiência de compra personalizada, do catálogo ao checkout.",
    icon: ShoppingCart,
  },
  {
    numero: "06",
    titulo: "Automação & Integrações",
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
  { titulo: "Performance", desc: "Carregamento rápido e otimizado, medido — não estimado.", icon: Zap },
  { titulo: "Escalabilidade", desc: "Arquitetura preparada para crescer em usuários e dados.", icon: TrendingUp },
  { titulo: "Segurança", desc: "Autenticação, permissões e boas práticas desde a fundação.", icon: Lock },
  { titulo: "Integrações & APIs", desc: "Sistemas que conversam entre si, sem retrabalho manual.", icon: Plug },
  { titulo: "Responsividade real", desc: "Experiência pensada para cada tamanho de tela, não apenas redimensionada.", icon: Smartphone },
  { titulo: "Arquitetura", desc: "Código organizado, documentado e sustentável a longo prazo.", icon: Globe },
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
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
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

const BotaoPrincipal = ({
  texto,
  onClick,
}: {
  texto: string;
  onClick?: () => void;
}) => (
  <button className="btn-primary" onClick={onClick}>
    <span className="btn-content">
      {texto} <ArrowRight size={18} className="icon-arrow" />
    </span>
  </button>
);

const BotaoSecundario = ({
  texto,
  onClick,
}: {
  texto: string;
  onClick?: () => void;
}) => (
  <button className="btn-secondary" onClick={onClick}>
    {texto}
  </button>
);

function SolucaoCard({
  numero,
  titulo,
  desc,
  icon: Icon,
  index,
}: {
  numero: string;
  titulo: string;
  desc: string;
  icon: any;
  index: number;
}) {
  const reduce = useMotionSafe();
  return (
    <motion.div
      className="solucao-card"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 32 }}
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
      <div className="solucao-line" />
    </motion.div>
  );
}

function ProjetoCard({ projeto, index }: { projeto: Projeto; index: number }) {
  const reduce = useMotionSafe();
  const [imagemFalhou, setImagemFalhou] = React.useState(false);
  const temImagem = Boolean(projeto.imagem) && !imagemFalhou;
  const temLink = Boolean(projeto.url);

  return (
    <motion.article
      className="projeto-card"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
      whileHover={reduce ? {} : { y: -6 }}
    >
      <div className="projeto-preview">
        <div className="projeto-browser" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="browser-url projeto-url">
            {projeto.url ? projeto.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "em breve"}
          </span>
        </div>
        <div className="projeto-shot">
          {temImagem ? (
            <img
              src={projeto.imagem}
              alt={`Prévia do site ${projeto.nome}`}
              className="projeto-img"
              loading="lazy"
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
          <span className="projeto-link projeto-link-disabled" aria-disabled="true">
            Em breve
          </span>
        )}
      </div>
      <div className="solucao-line" />
    </motion.article>
  );
}

function ProcessoStep({
  item,
  index,
  total,
}: {
  item: typeof PROCESSO[number];
  index: number;
  total: number;
}) {
  const reduce = useMotionSafe();
  const Icon = item.icon;
  return (
    <motion.div
      className="processo-step"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
    >
      <div className="processo-marker">
        <div className="processo-dot" />
        {index < total - 1 && <div className="processo-connector" />}
      </div>
      <div className="processo-content">
        <div className="processo-icon"><Icon size={20} /></div>
        <span className="processo-numero">{item.numero}</span>
        <h3 className="processo-titulo">{item.titulo}</h3>
        <p className="processo-desc">{item.desc}</p>
      </div>
    </motion.div>
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
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const handleContact = (mensagem?: string) => {
    const texto =
      mensagem ??
      "Olá, gostaria de conversar sobre um projeto com a CrystalCode.";
    const url = `https://api.whatsapp.com/send?phone=5579999666089&text=${encodeURIComponent(
      texto
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="main-wrapper">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav className="navbar-container">
        <div className="navbar">
          <div className="logo">
            <img className="logo-img" src="/cc.png" alt="CrystalCode" />
          </div>

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

          <button className="btn-nav" onClick={() => handleContact()}>
            Falar sobre meu projeto
          </button>
        </div>
      </nav>

      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <section className="hero-section" ref={heroRef}>
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Badge>Desenvolvimento de software sob medida</Badge>
          <h1>
            Sites, sistemas e produtos digitais <br className="hide-mobile" />
            <span className="text-gradient">construídos para o seu negócio</span>
          </h1>
          <p className="hero-desc">
            Da landing page ao sistema completo. Projetamos e desenvolvemos
            soluções digitais — sites, plataformas, dashboards e integrações —
            com engenharia de software real por trás de cada interface.
          </p>
          <div className="hero-buttons">
            <BotaoPrincipal
              texto="Vamos construir seu projeto"
              onClick={() => handleContact()}
            />
            <BotaoSecundario
              texto="Conhecer nossas soluções"
              onClick={() =>
                document
                  .getElementById("solucoes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
        </motion.div>

      </section>

      <section className="clients-section">
        <p className="clients-label">
          Do primeiro clique ao sistema completo
        </p>
        <div className="logos-wrapper">
          {["Websites", "Sistemas", "Plataformas", "SaaS", "E-commerce", "Automação"].map(
            (item) => (
              <span key={item} className="client-logo">
                {item}
              </span>
            )
          )}
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
              <span className="text-gradient">Construímos produtos digitais.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="alem-desc">
              Um site é apenas o ponto de entrada. Por trás dele, desenvolvemos
              sistemas administrativos, dashboards, plataformas web,
              automações e integrações que sustentam a operação real de uma
              empresa — não só a sua presença online.
            </p>
          </FadeUp>

          <div className="alem-grid">
            {[
              { titulo: "Sites & experiências institucionais", icon: Layout },
              { titulo: "Landing pages de alta conversão", icon: Zap },
              { titulo: "Sistemas administrativos", icon: LayoutDashboard },
              { titulo: "Dashboards & indicadores", icon: BarChart3 },
              { titulo: "Plataformas web & SaaS", icon: Boxes },
              { titulo: "E-commerce sob medida", icon: ShoppingCart },
              { titulo: "Automação de processos", icon: Workflow },
              { titulo: "Integrações & APIs", icon: Plug },
            ].map((item, i) => (
              <motion.div
                className="alem-item"
                key={item.titulo}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.06 }}
                whileHover={reduce ? {} : { y: -4, borderColor: "rgba(99,185,193,0.5)" }}
              >
                <item.icon size={18} className="alem-item-icon" />
                <span>{item.titulo}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="construimos" className="construimos-section">
        <div className="max-w-container">
          <div className="text-center">
            <FadeUp><Badge>O que podemos construir</Badge></FadeUp>
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
            <FadeUp><Badge>Portfólio</Badge></FadeUp>
            <FadeUp delay={0.05}>
              <h2 className="section-title">Últimos Projetos</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="section-desc">
                Sites e soluções entregues com design sob medida e engenharia
                real. Explore cada projeto diretamente no ar.
              </p>
            </FadeUp>
          </div>

          <div className="projetos-grid">
            {PROJETOS.map((p, i) => (
              <ProjetoCard key={p.id} projeto={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="engenharia-section">
        <div className="max-w-container">
          <div className="engenharia-grid-layout">
            <div>
              <FadeUp><Badge>Engenharia por trás do design</Badge></FadeUp>
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
                <motion.div
                  className="engenharia-item"
                  key={item.titulo}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                >
                  <div className="engenharia-icon"><item.icon size={18} /></div>
                  <div>
                    <h4>{item.titulo}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="story-section" id="sobre">
        <div className="story-container">
          <div className="story-image-wrapper">
            <img src="/lindos.png" alt="Equipe CrystalCode" className="story-img" />
            <div className="story-img-overlay" />
          </div>

          <div className="story-text-col">
            <Badge>Sobre a CrystalCode</Badge>
            <h2 className="story-title">
              Não somos apenas <br /> desenvolvedores.
            </h2>
            <p className="story-desc">
              A CrystalCode nasceu para atender negócios que precisavam de
              mais do que um site padrão. Começamos com sistemas para
              operações reais e, a partir disso, estruturamos uma forma de
              trabalhar que combina design, engenharia e atenção ao que cada
              cliente realmente precisa.
            </p>
            <p className="story-desc">
              Hoje unimos <strong>design de interface</strong> com{" "}
              <strong>engenharia de software</strong> para construir soluções
              que funcionam na prática — não apenas no protótipo.
            </p>
          </div>
        </div>
      </section>

      <section id="processos" className="process-section">
        <div className="max-w-container">
          <div className="text-center">
            <FadeUp><Badge>Como trabalhamos</Badge></FadeUp>
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
            <FadeUp><Badge>Stack tecnológica</Badge></FadeUp>
            <FadeUp delay={0.05}>
              <h2 className="section-title">Tecnologia moderna, sem exageros</h2>
            </FadeUp>
          </div>
        </div>

        <div className="tech-marquee-wrapper">
          <div className="tech-marquee-gradient tech-marquee-gradient-left" />
          <div className="tech-marquee-gradient tech-marquee-gradient-right" />
          <motion.div
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
                        <path d={tech.icon.path} fill={`#${tech.icon.hex}`} />
                      </svg>
                    ) : (
                      <img
                        src="/java.png"
                        alt=""
                        className="tech-icon"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
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
          <BotaoPrincipal texto="Vamos conversar" onClick={() => handleContact()} />
        </FadeUp>
      </section>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-col footer-brand">
            <img className="footer-logo" src="/cc.png" alt="CrystalCode" />
            <p className="footer-tagline">
              Sites, sistemas e produtos digitais construídos para o seu
              negócio.
            </p>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <a href="#sobre">Sobre</a>
            <a href="#processos">Processo</a>
            <a href="#projetos">Projetos</a>
          </div>

          <div className="footer-col">
            <h4>Soluções</h4>
            <a href="#solucoes">Websites</a>
            <a href="#solucoes">Sistemas</a>
            <a href="#solucoes">Plataformas & SaaS</a>
            <a href="#solucoes">E-commerce</a>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <a onClick={() => handleContact()} href="#" role="button">
              Falar via WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CrystalCode. Todos os direitos reservados.</p>
          <p className="footer-signature">Tecnologia sob medida, do primeiro clique ao sistema completo.</p>
        </div>
      </footer>
    </div>
  );
}


const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }

  body { background-color: #0c1e28; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; }
  a { color: inherit; }
  img { max-width: 100%; }
  button { font-family: inherit; }

  :focus-visible { outline: 2px solid #63b9c1; outline-offset: 3px; border-radius: 4px; }

  .main-wrapper { position: relative; }
  .max-w-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
  .text-center { text-align: center; margin-bottom: 64px; }
  .text-gradient { background: linear-gradient(to right, #63b9c1, #ffffff); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .hide-mobile { display: none; } @media (min-width: 768px) { .hide-mobile { display: inline; } }

  .section-title { font-size: 34px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 16px; color: white; }
  @media (min-width: 768px) { .section-title { font-size: 44px; } }
  .section-desc { font-size: 17px; color: #9ca3af; max-width: 560px; margin: 0 auto; line-height: 1.6; }

  /* ---------- NAVBAR ---------- */
  .navbar-container { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; justify-content: center; padding: 20px 16px 0 16px; }
  .navbar { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1080px; padding: 10px 12px 10px 24px; background: rgba(12, 30, 40, 0.75); border: 1px solid rgba(99, 185, 193, 0.18); border-radius: 999px; backdrop-filter: blur(14px); }
  .logo { display: flex; align-items: center; }
  .logo-img { height: 60px; width: 55px; display: block; }
  .menu-desktop { display: none; gap: 32px; list-style: none; font-size: 14px; color: #b8c4c8; font-weight: 500; }
  @media (min-width: 900px) { .menu-desktop { display: flex; } }
  .menu-desktop a { text-decoration: none; transition: color 0.2s; }
  .menu-desktop a:hover { color: #63b9c1; }
  .btn-nav { padding: 10px 22px; background: #63b9c1; color: #0c1e28; border: none; border-radius: 99px; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
  .btn-nav:hover { transform: scale(1.03); box-shadow: 0 0 30px -8px rgba(99,185,193,0.6); }

  /* ---------- HERO ---------- */
  .hero-bg-glow { position: fixed; top: -100px; left: 50%; transform: translateX(-50%); width: 1100px; height: 650px; background: rgba(99, 185, 193, 0.13); filter: blur(130px); border-radius: 100%; pointer-events: none; z-index: 0; }
  .hero-grid-lines { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 64px 64px; mask-image: linear-gradient(to bottom, black 0%, transparent 45%); }
  .hero-section { position: relative; z-index: 10; padding: 168px 24px 90px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 1200px; margin: 0 auto; }
  h1 { font-size: 38px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 28px; line-height: 1.12; color: white; }
  @media (min-width: 640px) { h1 { font-size: 54px; } }
  @media (min-width: 900px) { h1 { font-size: 60px; } }
  .hero-desc { font-size: 17px; color: #9ca3af; max-width: 620px; margin: 0 auto 40px auto; line-height: 1.65; }
  @media (min-width: 768px) { .hero-desc { font-size: 16px; } }
  .hero-buttons { display: flex; flex-direction: column; gap: 14px; justify-content: center; margin-bottom: 72px; width: 100%; }
  @media (min-width: 560px) { .hero-buttons { flex-direction: row; width: auto; } }

  /* ---------- BADGE / BOTÕES ---------- */
  .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 99px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); font-size: 12px; font-weight: 600; color: #63b9c1; margin-bottom: 20px; backdrop-filter: blur(4px); letter-spacing: 0.02em; }
  .badge-dot { position: relative; display: flex; width: 8px; height: 8px; }
  .badge-ping { position: absolute; width: 100%; height: 100%; border-radius: 50%; background: #63b9c1; opacity: 0.75; animation: ping 1.6s cubic-bezier(0,0,0.2,1) infinite; }
  .badge-circle { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #63b9c1; }
  @keyframes ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }

  .btn-primary { position: relative; padding: 16px 30px; background: #63b9c1; color: #0c1e28; font-weight: 700; font-size: 15px; border: none; border-radius: 99px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; width: 100%; }
  @media (min-width: 560px) { .btn-primary { width: auto; } }
  .btn-primary:hover { transform: scale(1.035); box-shadow: 0 0 40px -10px rgba(99,185,193,0.6); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-content { position: relative; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .icon-arrow { transition: transform 0.2s; }
  .btn-primary:hover .icon-arrow { transform: translateX(4px); }

  .btn-secondary { padding: 16px 30px; background: rgba(255,255,255,0.04); color: white; border: 1px solid rgba(255,255,255,0.12); border-radius: 99px; font-weight: 500; font-size: 15px; cursor: pointer; backdrop-filter: blur(4px); transition: background 0.2s, border-color 0.2s; width: 100%; }
  @media (min-width: 560px) { .btn-secondary { width: auto; } }
  .btn-secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.22); }

  /* ---------- DASHBOARD MOCKUP (HERO) ---------- */
  .dashboard-container { position: relative; width: 100%; max-width: 920px; background: #0f1b22; border: 1px solid rgba(99,185,193,0.18); border-radius: 18px; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.55); overflow: hidden; }
  .browser-header { height: 42px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; padding: 0 16px; gap: 10px; }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-red { background: #ef4444; } .dot-yellow { background: #eab308; } .dot-green { background: #22c55e; }
  .browser-url { margin-left: 12px; font-size: 12px; color: #6b7280; }
  .dashboard-content { display: grid; grid-template-columns: 56px 1fr; min-height: 320px; }
  @media (min-width: 768px) { .dashboard-content { min-height: 380px; } }
  .dash-sidebar { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 20px 0; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.015); }
  .dash-logo-mini { width: 22px; height: 22px; border-radius: 6px; background: linear-gradient(135deg, #63b9c1, #2d6b72); margin-bottom: 8px; }
  .dash-nav-item { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #6b7280; }
  .dash-nav-item.active { background: rgba(99,185,193,0.15); color: #63b9c1; }
  .dash-main { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
  @media (min-width: 768px) { .dash-main { padding: 28px; } }
  .dash-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .dash-kpi { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 12px; }
  .dash-kpi-label { font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px; }
  .dash-kpi-bar { width: 100%; height: 5px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
  .dash-kpi-fill { height: 100%; background: #63b9c1; border-radius: 3px; }
  .dash-chart-row { display: grid; grid-template-columns: 1fr; gap: 14px; flex: 1; }
  @media (min-width: 768px) { .dash-chart-row { grid-template-columns: 1.4fr 1fr; } }
  .dash-chart-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px; display: flex; align-items: flex-end; }
  .dash-chart-bars { display: flex; align-items: flex-end; gap: 8px; width: 100%; height: 100px; }
  .dash-bar { flex: 1; background: linear-gradient(to top, #63b9c1, rgba(99,185,193,0.3)); border-radius: 4px 4px 0 0; }
  .dash-table-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px; justify-content: center; }
  .dash-table-row { display: flex; align-items: center; gap: 8px; }
  .dash-table-dot { width: 6px; height: 6px; border-radius: 50%; background: #63b9c1; flex-shrink: 0; }
  .dash-table-line { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; flex: 1; }
  .dash-table-line.short { flex: 0.4; }

  .float-chip { position: absolute; display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: rgba(12,30,40,0.92); border: 1px solid rgba(99,185,193,0.3); border-radius: 12px; font-size: 12px; font-weight: 600; color: #d1eef0; box-shadow: 0 10px 30px rgba(0,0,0,0.5); backdrop-filter: blur(10px); }
  .chip-api { top: -18px; right: 24px; }
  .chip-db { bottom: -18px; left: 24px; }
  @media (max-width: 700px) { .float-chip { display: none; } }

  /* ---------- FAIXA DE POSICIONAMENTO ---------- */
  .clients-section { padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); text-align: center; position: relative; z-index: 10; }
  .clients-label { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 28px; }
  .logos-wrapper { display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; padding: 0 24px; }
  .client-logo { font-size: 15px; font-weight: 600; color: #7a8b90; letter-spacing: 0.02em; }

  /* ---------- MUITO ALÉM DE UM SITE ---------- */
  .alem-section { padding: 120px 24px 100px; position: relative; z-index: 10; text-align: center; }
  .alem-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 24px; }
  @media (min-width: 768px) { .alem-title { font-size: 46px; } }
  .alem-desc { font-size: 17px; color: #9ca3af; max-width: 640px; margin: 0 auto 56px auto; line-height: 1.7; }
  .alem-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; max-width: 900px; margin: 0 auto; }
  @media (min-width: 768px) { .alem-grid { grid-template-columns: repeat(4, 1fr); } }
  .alem-item { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 22px 12px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; font-size: 13px; font-weight: 600; color: #cbd5d8; text-align: center; transition: border-color 0.25s, transform 0.25s; }
  .alem-item-icon { color: #63b9c1; }

  /* ---------- SOLUÇÕES / O QUE PODEMOS CONSTRUIR ---------- */
  .construimos-section { padding: 60px 24px 128px; position: relative; z-index: 10; }
  .solucoes-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
  @media (min-width: 768px) { .solucoes-grid { grid-template-columns: repeat(3, 1fr); } }
  .solucao-card { position: relative; padding: 28px; border-radius: 20px; background: linear-gradient(160deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01)); border: 1px solid rgba(255,255,255,0.07); transition: border-color 0.3s, transform 0.3s; overflow: hidden; }
  .solucao-card:hover { border-color: rgba(99,185,193,0.45); }
  .solucao-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .solucao-numero { font-size: 13px; font-weight: 700; color: #4b5f64; letter-spacing: 0.05em; }
  .solucao-icon { display: inline-flex; padding: 10px; border-radius: 10px; background: rgba(99,185,193,0.1); border: 1px solid rgba(99,185,193,0.2); color: #63b9c1; }
  .solucao-titulo { font-size: 19px; font-weight: 700; margin-bottom: 10px; color: white; }
  .solucao-desc { color: #9ca3af; font-size: 14px; line-height: 1.6; }
  .solucao-line { position: absolute; bottom: 0; left: 0; height: 2px; width: 0; background: #63b9c1; transition: width 0.4s ease; }
  .solucao-card:hover .solucao-line { width: 100%; }

  /* ---------- PROJETOS / PORTFÓLIO ---------- */
  .projetos-section { padding: 60px 24px 128px; position: relative; z-index: 10; }
  .projetos-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
  @media (min-width: 700px) { .projetos-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1000px) { .projetos-grid { grid-template-columns: repeat(3, 1fr); } }
  .projeto-card { position: relative; display: flex; flex-direction: column; padding: 14px 14px 28px; border-radius: 20px; background: linear-gradient(160deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01)); border: 1px solid rgba(255,255,255,0.07); transition: border-color 0.3s, transform 0.3s; overflow: hidden; }
  .projeto-card:hover, .projeto-card:focus-within { border-color: rgba(99,185,193,0.45); }
  .projeto-card:hover .solucao-line, .projeto-card:focus-within .solucao-line { width: 100%; }
  .projeto-preview { border-radius: 14px; overflow: hidden; background: #0f1b22; border: 1px solid rgba(99,185,193,0.18); box-shadow: 0 20px 45px -15px rgba(0,0,0,0.55); }
  .projeto-browser { height: 32px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; padding: 0 12px; gap: 7px; }
  .projeto-browser .dot { width: 8px; height: 8px; }
  .projeto-url { margin-left: 8px; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .projeto-shot { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #0c1e28; }
  .projeto-img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; transition: transform 0.6s ease; }
  .projeto-card:hover .projeto-img { transform: scale(1.04); }
  .projeto-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%); pointer-events: none; }
  .projeto-placeholder { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: #63b9c1; font-size: 14px; font-weight: 600; background: radial-gradient(circle at 50% 40%, rgba(99,185,193,0.14), transparent 70%); }
  .projeto-body { display: flex; flex-direction: column; align-items: flex-start; flex: 1; padding: 22px 14px 0; }
  .projeto-categoria { font-size: 12px; font-weight: 700; color: #4b5f64; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 8px; }
  .projeto-titulo { font-size: 19px; font-weight: 700; margin-bottom: 10px; color: white; }
  .projeto-desc { color: #9ca3af; font-size: 14px; line-height: 1.6; margin-bottom: 22px; flex: 1; }
  .projeto-link { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; background: #63b9c1; color: #0c1e28; font-weight: 700; font-size: 14px; border-radius: 99px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
  .projeto-link:hover { transform: scale(1.035); box-shadow: 0 0 40px -10px rgba(99,185,193,0.6); }
  .projeto-link:active { transform: scale(0.98); }
  .projeto-link:focus-visible { outline-offset: 4px; border-radius: 99px; box-shadow: 0 0 40px -10px rgba(99,185,193,0.6); }
  .icon-arrow-up { transition: transform 0.2s; }
  .projeto-link:hover .icon-arrow-up, .projeto-link:focus-visible .icon-arrow-up { transform: translate(3px, -3px); }
  .projeto-link-disabled { background: rgba(255,255,255,0.04); color: #7a8b90; border: 1px solid rgba(255,255,255,0.12); cursor: default; }
  .projeto-link-disabled:hover { transform: none; box-shadow: none; }

  /* ---------- ENGENHARIA / PROVA DE CAPACIDADE ---------- */
  .engenharia-section { padding: 100px 24px; background: linear-gradient(to bottom, #0c1e28, #09161e); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); position: relative; z-index: 10; }
  .engenharia-grid-layout { display: grid; grid-template-columns: 1fr; gap: 48px; }
  @media (min-width: 900px) { .engenharia-grid-layout { grid-template-columns: 0.9fr 1.1fr; gap: 64px; } }
  .engenharia-title { font-size: 28px; font-weight: 800; line-height: 1.25; margin-bottom: 18px; }
  @media (min-width: 768px) { .engenharia-title { font-size: 34px; } }
  .engenharia-desc { color: #9ca3af; font-size: 16px; line-height: 1.65; }
  .engenharia-list { display: flex; flex-direction: column; gap: 4px; }
  .engenharia-item { display: flex; gap: 16px; padding: 18px 4px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .engenharia-item:last-child { border-bottom: none; }
  .engenharia-icon { flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px; background: rgba(99,185,193,0.1); border: 1px solid rgba(99,185,193,0.2); color: #63b9c1; display: flex; align-items: center; justify-content: center; }
  .engenharia-item h4 { font-size: 16px; font-weight: 700; color: white; margin-bottom: 4px; }
  .engenharia-item p { font-size: 14px; color: #9ca3af; line-height: 1.5; }

  /* ---------- SOBRE / STORY ---------- */
.story-section { padding: 110px 24px; position: relative; z-index: 10; display: flex; justify-content: center; }
.story-container {
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  align-items: center;
}

/* Mobile: texto (badge + título + descrição) aparece antes da foto */
.story-text-col { order: 1; }
.story-image-wrapper { order: 2; }

@media (min-width: 900px) {
  .story-container { grid-template-columns: 1fr 1fr; }
  /* Desktop: volta à ordem original do HTML (imagem à esquerda, texto à direita) */
  .story-text-col { order: 0; }
  .story-image-wrapper { order: 0; }
}

.story-image-wrapper {
  position: relative;
  height: 380px;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(99,185,193,0.18);
  box-shadow: 0 20px 45px rgba(0,0,0,0.5);
}
.story-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.story-image-wrapper:hover .story-img { transform: scale(1.04); }
.story-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%); }

.story-text-col { display: flex; flex-direction: column; gap: 22px; }
.story-title { font-size: 32px; font-weight: 800; line-height: 1.2; color: white; }
@media (min-width: 768px) { .story-title { font-size: 42px; } }
.story-desc { font-size: 16px; color: #9ca3af; line-height: 1.65; }

  /* ---------- PROCESSO ---------- */
  .process-section { padding: 60px 24px 128px; position: relative; z-index: 10; }
  .processo-timeline { display: flex; flex-direction: column; gap: 0; max-width: 720px; margin: 60px auto 0; }
  .processo-step { display: flex; gap: 24px; }
  .processo-marker { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
  .processo-dot { width: 14px; height: 14px; border-radius: 50%; background: #63b9c1; box-shadow: 0 0 0 4px rgba(99,185,193,0.15); flex-shrink: 0; margin-top: 6px; }
  .processo-connector { width: 2px; flex: 1; background: linear-gradient(to bottom, rgba(99,185,193,0.4), rgba(99,185,193,0.05)); margin: 4px 0; min-height: 60px; }
  .processo-content { padding-bottom: 44px; }
  .processo-icon { display: inline-flex; padding: 8px; border-radius: 8px; background: rgba(99,185,193,0.1); color: #63b9c1; margin-bottom: 10px; }
  .processo-numero { font-size: 12px; font-weight: 700; color: #4b5f64; letter-spacing: 0.05em; display: block; margin-bottom: 4px; }
  .processo-titulo { font-size: 20px; font-weight: 700; color: white; margin-bottom: 8px; }
  .processo-desc { color: #9ca3af; font-size: 15px; line-height: 1.6; max-width: 480px; }

  /* ---------- TECNOLOGIAS ---------- */
  .tech-section { padding: 42px 0 100px; position: relative; z-index: 10; }
  .tech-marquee-wrapper { position: relative; margin-top: 48px; overflow: hidden; }
  .tech-marquee-gradient { position: absolute; top: 0; bottom: 0; width: 100px; z-index: 5; pointer-events: none; }
  .tech-marquee-gradient-left { left: 0; background: linear-gradient(to right, #0c1e28, transparent); }
  .tech-marquee-gradient-right { right: 0; background: linear-gradient(to left, #0c1e28, transparent); }
  .tech-marquee-track { display: flex; width: max-content; }
  .tech-marquee-group { display: flex; flex-shrink: 0; gap: 16px; padding-right: 16px; }
  .tech-chip { width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 50%; }
  .tech-icon { width: 30px; height: 30px; object-fit: contain; }

  /* ---------- CTA FINAL ---------- */
  .cta-final-section { padding: 140px 24px; position: relative; z-index: 10; text-align: center; overflow: hidden; }
  .cta-final-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 700px; height: 400px; background: rgba(99,185,193,0.12); filter: blur(120px); border-radius: 100%; pointer-events: none; }
  .cta-final-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 20px; position: relative; z-index: 2; }
  @media (min-width: 768px) { .cta-final-title { font-size: 48px; } }
  .cta-final-desc { font-size: 17px; color: #9ca3af; max-width: 560px; margin: 0 auto 36px auto; line-height: 1.65; position: relative; z-index: 2; }

  /* ---------- FOOTER ---------- */
  .site-footer { padding: 72px 24px 32px; border-top: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 10; }
  .footer-container { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 40px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  @media (min-width: 768px) { .footer-container { grid-template-columns: 1.5fr 1fr 1fr 1fr; } }
  .footer-col { display: flex; flex-direction: column; gap: 12px; }
  .footer-col h4 { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .footer-col a { font-size: 14px; color: #9ca3af; text-decoration: none; transition: color 0.2s; cursor: pointer; }
  .footer-col a:hover { color: #63b9c1; }
  .footer-logo { margin-left: -30px; height: 160px; width: 145px; }
  .footer-tagline { font-size: 14px; color: #6b7280; line-height: 1.6; max-width: 260px; }
  .footer-bottom { max-width: 1100px; margin: 0 auto; padding-top: 28px; display: flex; flex-direction: column; gap: 8px; text-align: center; color: #4b5563; font-size: 13px; }
  @media (min-width: 768px) { .footer-bottom { flex-direction: row; justify-content: space-between; text-align: left; } }
  .footer-signature { color: #4b5f64; }
`;