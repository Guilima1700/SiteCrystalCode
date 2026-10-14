export type Projeto = {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  imagem?: string;
  url?: string;
};

export const PROJETOS: Projeto[] = [
  {
    id: "socon",
    nome: "SOCON Soluções e Consultoria",
    categoria: "Site institucional",
    descricao:
      "Site institucional para empresa de digitalização, organização e gestão eletrônica de documentos para prefeituras, órgãos públicos e empresas.",
    imagem: "/projetos/socon.png",
    url: "https://socon-pi.vercel.app/",
  },
  {
    id: "alfa-consultoria",
    nome: "Alfa Consultoria",
    categoria: "Site institucional",
    descricao:
      "Site de consultoria e assessoria em educação, com foco na gestão, viabilidade administrativa e sustentabilidade econômico-financeira de instituições de ensino.",
    imagem: "/projetos/alfa.png",
    url: "https://alfa-consultoria-fz37-mocha.vercel.app/",
  },
  {
    id: "moura-locacoes",
    nome: "Moura Locações",
    categoria: "Site institucional",
    descricao:
      "Site institucional para a Moura Locações, apresentando a empresa e seus serviços com um canal direto para o cliente entrar em contato.",
    imagem: "/projetos/moura.png",
    url: "https://moura-locacoes.vercel.app/",
  },
];
