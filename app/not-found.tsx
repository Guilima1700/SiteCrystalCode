import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Página não encontrada | CrystalCode" },
  description:
    "A página solicitada não foi encontrada. Acesse os serviços, projetos e canais de contato da CrystalCode.",
};

export default function NotFound() {
  return (
    <main id="conteudo" className="not-found" tabIndex={-1}>
      <Link href="/" className="not-found-brand">
        CrystalCode
      </Link>
      <p className="not-found-code" aria-hidden="true">
        404
      </p>
      <h1>Página não encontrada</h1>
      <p>
        Este endereço não existe ou a página foi movida. Você pode continuar
        pelos caminhos abaixo.
      </p>
      <Link href="/" className="btn-primary">
        Voltar à página inicial
      </Link>
      <nav aria-label="Principais páginas">
        <Link href="/servicos">Serviços</Link>
        <Link href="/projetos">Projetos</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/contato">Contato</Link>
      </nav>
    </main>
  );
}
