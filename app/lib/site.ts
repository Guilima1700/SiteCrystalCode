export const SITE = {
  name: "CrystalCode",
  alternateName: "Crystal Code",
  googleAnalyticsId: "G-865FRY6T9R",
  url: "https://crystalcode.com.br",
  description:
    "Desenvolvimento de software sob medida em Aracaju, Sergipe: sistemas empresariais, sites profissionais, plataformas web, SaaS e automação de processos.",
  email: "crystalcode.tec@gmail.com",
  phone: "+5579999666089",
  phoneLabel: "+55 (79) 99966-6089",
  instagram: "https://www.instagram.com/crystallcode/",
  whatsapp:
    "https://api.whatsapp.com/send?phone=5579999666089&text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto%20com%20a%20CrystalCode.",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}
