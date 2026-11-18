import Image from "next/image";
import Link from "next/link";
import { SITE } from "../lib/site";
import { IdentitySchema } from "./json-ld";

export function ContentShell({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs: { name: string; path: string }[];
}) {
  return (
    <div className="main-wrapper content-page">
      <IdentitySchema />
      <header className="inner-header">
        <Link href="/" aria-label="CrystalCode — página inicial">
          <Image
            src="/cc.png"
            alt="CrystalCode"
            width={48}
            height={60}
            sizes="48px"
          />
        </Link>
        <nav aria-label="Navegação principal" className="inner-nav">
          <Link href="/servicos">Serviços</Link>
          <Link href="/projetos">Projetos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </nav>
      </header>
      <main id="conteudo" className="inner-main" tabIndex={-1}>
        <nav aria-label="Localização" className="breadcrumbs">
          <ol>
            {breadcrumbs.map((b, i) => (
              <li key={b.path}>
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page">{b.name}</span>
                ) : (
                  <Link href={b.path}>{b.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </main>
      <footer className="inner-footer">
        <p>CrystalCode · Desenvolvimento de software · Aracaju, Sergipe</p>
        <nav aria-label="Contato e redes sociais">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            Instagram @crystallcode
          </a>
        </nav>
      </footer>
    </div>
  );
}
