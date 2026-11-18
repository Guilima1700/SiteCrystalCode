import { PAGES } from "../data/content";
import { absoluteUrl, SITE } from "../lib/site";

export const dynamic = "force-static";

export function GET() {
  const content = `# CrystalCode\n\n> ${SITE.description}\n\nEquipe de Aracaju, Sergipe, sem sede de atendimento presencial.\nContato: ${SITE.email} | ${SITE.phoneLabel}\nInstagram oficial: ${SITE.instagram}\n\n## Páginas oficiais\n\n${PAGES.map((p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`).join("\n")}\n\nEste índice é complementar. Não substitui o HTML, o robots.txt ou o sitemap.xml e não garante indexação, citações por IA ou ranqueamento.\n`;
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
