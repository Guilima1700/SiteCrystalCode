export type Service = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  sections: { title: string; text: string }[];
};

// A new entry creates its static route, internal links, sitemap and llms.txt entry at build time.
export const SERVICES: Service[] = [
  {
    slug: "criacao-de-sites",
    name: "Sites profissionais",
    title: "Criação de sites profissionais",
    description:
      "Sites institucionais e landing pages sob medida, com identidade visual, conteúdo claro e performance. Conheça o desenvolvimento de sites da CrystalCode.",
    intro:
      "Um site profissional apresenta a empresa, explica sua oferta e facilita o contato. A CrystalCode desenvolve sites institucionais e landing pages com design próprio e engenharia de software, conectando a presença digital às necessidades do negócio.",
    sections: [
      {
        title: "Quando faz sentido investir em um site sob medida?",
        text: "Quando a empresa precisa comunicar seus serviços com clareza, substituir uma experiência desatualizada ou organizar uma jornada de apresentação e contato. A estrutura nasce do conteúdo e dos objetivos, em vez de limitar o negócio a um modelo pronto.",
      },
      {
        title: "Conteúdo, navegação e identidade",
        text: "Organizamos as informações em páginas e seções compreensíveis, com navegação acessível em dispositivos móveis. O trabalho de interface considera a identidade visual, a leitura e os caminhos até os canais comerciais.",
      },
      {
        title: "Uma base para evoluir",
        text: "Além da interface, planejamos desempenho, metadados e integração com outras ferramentas quando houver necessidade. Se o projeto exigir áreas restritas, painéis ou regras de negócio, avaliamos uma plataforma web ou um sistema personalizado.",
      },
    ],
  },
  {
    slug: "sistemas-sob-medida",
    name: "Sistemas sob medida",
    title: "Desenvolvimento de sistemas sob medida",
    description:
      "Sistemas empresariais personalizados, painéis administrativos, ERPs e CRMs alinhados à sua operação. Conheça a engenharia de software da CrystalCode.",
    intro:
      "Sistemas empresariais personalizados organizam processos que não se encaixam em ferramentas genéricas. A CrystalCode desenvolve software sob medida para transformar regras da operação em funcionalidades, permissões e fluxos de trabalho claros.",
    sections: [
      {
        title: "Da rotina da empresa aos requisitos",
        text: "O ponto de partida é entender quem utiliza o sistema, quais informações circulam entre as equipes e onde existe retrabalho. Esse levantamento orienta módulos, prioridades e critérios de aceitação antes da implementação.",
      },
      {
        title: "Painéis, gestão e acesso aos dados",
        text: "O escopo pode incluir painéis administrativos, ferramentas internas, funcionalidades de ERP ou CRM e indicadores operacionais. Perfis de acesso e regras de negócio são definidos conforme as responsabilidades de cada usuário.",
      },
      {
        title: "Integração e evolução",
        text: "Quando necessário, o sistema pode conversar com APIs e ferramentas existentes. A arquitetura e os testes devem considerar segurança, volume de dados e manutenção, permitindo organizar a evolução por etapas de acordo com o negócio.",
      },
    ],
  },
  {
    slug: "plataformas-web",
    name: "Plataformas web",
    title: "Desenvolvimento de plataformas web",
    description:
      "Portais, marketplaces e produtos digitais com múltiplos perfis e regras de negócio complexas. Desenvolva sua plataforma web com a CrystalCode.",
    intro:
      "Plataformas web conectam pessoas, informações e operações em um produto acessível pelo navegador. Desenvolvemos portais, marketplaces e aplicações com múltiplos perfis, respeitando as regras e os objetivos específicos de cada negócio.",
    sections: [
      {
        title: "Jornadas e perfis de usuário",
        text: "Uma plataforma pode reunir administradores, parceiros e clientes com ações diferentes. Mapear essas jornadas ajuda a definir navegação, responsabilidades e permissões, além dos dados que cada perfil pode consultar ou alterar.",
      },
      {
        title: "Regras de negócio que sustentam o produto",
        text: "Cadastros, fluxos de aprovação, pesquisas, painéis e integrações precisam funcionar como partes de uma mesma operação. O planejamento transforma essas dependências em requisitos verificáveis e identifica o que deve estar na primeira versão.",
      },
      {
        title: "Lançamento e continuidade",
        text: "O desenvolvimento passa por interface, implementação e testes em cenários de uso. Após o lançamento, novas funcionalidades podem ser priorizadas a partir das necessidades observadas, sem presumir resultados comerciais antes de medi-los.",
      },
    ],
  },
  {
    slug: "desenvolvimento-saas",
    name: "Desenvolvimento de SaaS",
    title: "Desenvolvimento de SaaS",
    description:
      "Planeje e desenvolva um produto SaaS sob medida com arquitetura multi-tenant, perfis de acesso e evolução por etapas. Conheça a CrystalCode.",
    intro:
      "Um SaaS entrega software como um serviço recorrente. A CrystalCode desenvolve produtos digitais desse tipo com atenção à separação dos dados entre clientes, à experiência dos usuários e às regras que sustentam o serviço.",
    sections: [
      {
        title: "Qual problema a primeira versão deve resolver?",
        text: "Antes de ampliar o escopo, é necessário definir o público, a tarefa principal e os critérios de uso. Uma primeira versão pode concentrar o fluxo essencial, permitindo avaliar o produto antes de investir em funcionalidades complementares.",
      },
      {
        title: "Arquitetura multi-tenant e permissões",
        text: "Produtos compartilhados por várias organizações exigem decisões sobre isolamento de dados, autenticação e acesso. Essas escolhas devem considerar a operação, a sensibilidade das informações e a forma de administrar cada conta.",
      },
      {
        title: "Recorrência e crescimento do produto",
        text: "Planos, limites de uso e integrações de cobrança dependem do modelo comercial definido para o projeto. Escalabilidade, monitoramento e evolução precisam acompanhar o uso real, sem promessas de capacidade ou receita sem validação.",
      },
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    title: "Desenvolvimento de e-commerce sob medida",
    description:
      "Lojas virtuais com catálogo, jornada de compra e integrações planejadas para sua operação. Conheça o desenvolvimento de e-commerce da CrystalCode.",
    intro:
      "Uma loja virtual precisa conectar a apresentação dos produtos à operação de venda. A CrystalCode desenvolve experiências de e-commerce sob medida, planejando navegação, catálogo e checkout conforme as necessidades do negócio.",
    sections: [
      {
        title: "Catálogo e experiência de compra",
        text: "Categorias, informações dos produtos e navegação precisam ajudar o cliente a encontrar o que procura. O projeto considera leitura em dispositivos móveis e clareza nas etapas que antecedem a compra.",
      },
      {
        title: "Integrações da operação",
        text: "Pagamentos, estoque e logística podem exigir conexões com serviços externos. A escolha dessas integrações depende das ferramentas utilizadas pela empresa, das condições dos fornecedores e dos requisitos de segurança.",
      },
      {
        title: "Gestão e manutenção",
        text: "A administração do catálogo e o acompanhamento de pedidos fazem parte do planejamento. Requisitos, responsabilidades e critérios de teste devem ser definidos no escopo para que o lançamento seja compatível com a rotina da equipe.",
      },
    ],
  },
  {
    slug: "automacao-e-integracoes",
    name: "Automação e integrações",
    title: "Automação de processos e integração de sistemas",
    description:
      "Conecte APIs, sistemas e fluxos de trabalho para reduzir tarefas manuais. Conheça as soluções de automação de processos empresariais da CrystalCode.",
    intro:
      "Automação de processos empresariais conecta tarefas e informações que hoje dependem de ações manuais repetidas. Desenvolvemos integrações entre sistemas e APIs para organizar a troca de dados e os fluxos de trabalho da operação.",
    sections: [
      {
        title: "Identificar o que pode ser automatizado",
        text: "O trabalho começa pelo mapeamento da tarefa, dos responsáveis e das exceções. É necessário conhecer a origem dos dados, as regras de validação e as condições em que uma ação deve continuar dependendo de uma pessoa.",
      },
      {
        title: "Conectar ferramentas por APIs",
        text: "Integrações podem sincronizar cadastros, atualizar informações e acionar etapas em sistemas diferentes. A viabilidade depende das APIs disponíveis, das permissões de acesso e dos limites de cada fornecedor.",
      },
      {
        title: "Tratar falhas e acompanhar o fluxo",
        text: "Automatizar também exige prever indisponibilidade, duplicidade e dados inválidos. Registros de execução, validações e mecanismos de recuperação devem ser planejados conforme a criticidade do processo, com cuidado para não expor informações sensíveis.",
      },
    ],
  },
];

export const PAGES = [
  {
    path: "/",
    title: "Desenvolvimento de software sob medida em Aracaju",
    description:
      "CrystalCode (Crystal Code): sistemas sob medida, sites profissionais, plataformas web, SaaS e automação. Desenvolvimento de software em Aracaju, Sergipe.",
  },
  {
    path: "/sobre",
    title: "Sobre a CrystalCode",
    description:
      "Conheça a CrystalCode (Crystal Code), equipe de desenvolvimento de software em Aracaju, Sergipe. Design e engenharia para sistemas e produtos digitais.",
  },
  {
    path: "/servicos",
    title: "Serviços de desenvolvimento de software",
    description:
      "Explore os serviços da CrystalCode: sistemas personalizados, sites, plataformas web, SaaS, e-commerce e automação de processos empresariais.",
  },
  {
    path: "/projetos",
    title: "Projetos de desenvolvimento web",
    description:
      "Conheça projetos do portfólio da CrystalCode, com descrições e links para os sites de SOCON, Alfa Consultoria e Moura Locações.",
  },
  {
    path: "/contato",
    title: "Contato com a CrystalCode",
    description:
      "Converse com a CrystalCode sobre sistemas sob medida e produtos digitais. Atendimento por WhatsApp e e-mail, com equipe de Aracaju, Sergipe.",
  },
  {
    path: "/privacidade",
    title: "Privacidade e cookies",
    description:
      "Entenda a medição de visitas com Google Analytics, os cookies e as escolhas de privacidade disponíveis no site da CrystalCode.",
  },
  ...SERVICES.map((service) => ({
    path: `/servicos/${service.slug}`,
    title: service.title,
    description: service.description,
  })),
];

export const FAQ = [
  {
    question: "A CrystalCode desenvolve apenas sites?",
    answer:
      "Não. Além de sites institucionais e landing pages, desenvolvemos sistemas empresariais personalizados, plataformas web, SaaS, e-commerce e automações com integrações entre sistemas.",
  },
  {
    question: "Como começa um projeto de software sob medida?",
    answer:
      "Começamos entendendo o negócio, o problema e os objetivos. Em seguida, organizamos os requisitos, a experiência de uso e o escopo para orientar desenvolvimento, testes e lançamento.",
  },
  {
    question: "Quanto custa e quanto tempo leva o desenvolvimento?",
    answer:
      "O investimento e o prazo dependem das funcionalidades, integrações e complexidade. Para avaliar um projeto, precisamos entender o que deve ser construído e quais são as prioridades; não há um preço ou prazo único para todos os sistemas.",
  },
  {
    question: "É possível integrar um sistema às ferramentas que já usamos?",
    answer:
      "Sim, avaliamos integrações com sistemas e APIs existentes. A viabilidade depende dos acessos, da documentação e dos recursos disponibilizados por cada ferramenta.",
  },
  {
    question: "A CrystalCode é de Aracaju?",
    answer:
      "Sim. Somos de Aracaju, Sergipe, e o contato comercial acontece por WhatsApp e e-mail. Não divulgamos endereço de atendimento presencial.",
  },
];
