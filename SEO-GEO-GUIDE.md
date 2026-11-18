# CrystalCode — implementação e manutenção de SEO/GEO

Auditoria e implementação: **12 de novembro de 2026**. Domínio oficial: **https://crystalcode.com.br/**, sem `www`. O trabalho foi aplicado ao checkout local; este documento não comprova publicação ou indexação pelo Google.

**Revisão em 17 de novembro de 2026:** a implementação anterior foi confirmada no domínio público. Sitemap/robots retornam 200; as 11 páginas do sitemap retornam 200, têm um H1, JSON-LD legível e não apresentam noindex. O responsável informou que já cadastrou o site no Google Search Console e no Bing Webmaster Tools. Isso confirma a preparação técnica observável, não a indexação nas contas dos buscadores. Consulte a seção 8 para os próximos passos e o estado atualizado dos alertas.

Na mesma revisão, o responsável informou que **acabou de solicitar a indexação** da página de criação de sites no Search Console. A solicitação deve ser acompanhada pela Inspeção de URL; não é confirmação de inclusão no índice e não precisa ser repetida imediatamente.

**Atualização de Analytics em 17/11/2026:** foi preparada a integração GA4 `G-865FRY6T9R`, com permissão antes da coleta e uma página `/privacidade`. O próximo deploy passa a ter **12 páginas no sitemap**; as 11 páginas mencionadas nas medições anteriores referem-se à versão anterior. Ver [GOOGLE-ANALYTICS-GUIDE.md](./GOOGLE-ANALYTICS-GUIDE.md) para configuração no painel, publicação e validação da coleta. A versão Analytics ainda não foi publicada a partir deste checkout.

## 1. Diagnóstico inicial

| Área | Estado encontrado |
| --- | --- |
| Framework | Next.js 16.3.3, React/React DOM 19.2.0, TypeScript 5.9.3, App Router; Framer Motion 12.23.24, Tailwind 3.4.1 e ícones Lucide/Simple Icons. |
| Arquitetura e renderização | Uma única rota editorial `/`; seções por âncoras. A página inteira era um Client Component de cerca de 1.200 linhas, inclusive o CSS. O HTML já era pré-renderizado, com hidratação no navegador; não era CSR puro. Sem ISR ou conteúdo dependente de backend. |
| Metadados | Title e description genéricos no layout, sem canonical nem metadataBase. Open Graph apontava para `site-crystal-code.vercel.app`; imagens podiam resolver com `www`. Preview quadrado de 1024×1024 era declarado como 1200×630. |
| Sitemap e robots | Ambos retornavam HTTP 404 no domínio público. Existia `app/sitemap.ts` local não rastreado pelo Git, apenas com a home e `new Date()` como lastmod sem respaldo editorial. |
| Schema | Não havia JSON-LD. |
| Semântica e acesso | Sem `<main>`, saltos H2→H4, baixo contraste em categorias/rodapé, indicadores do carrossel de 8×8 px, papel de grupo em `article`, contato e navegação importantes dependendo de eventos JavaScript. |
| Crawlers | Conteúdo de animações começava com opacity 0; isso não apagava o HTML, mas prejudicava a leitura sem JavaScript. Identidade e serviços não tinham páginas próprias. |
| Imagens | Imagens comuns sem otimização responsiva; equipe com 748.575 bytes, imagens de projetos com até 893.873 bytes, ícone Java de 573.744 bytes. Logotipos com proporção forçada. |
| Performance | PageSpeed fornecido pelo responsável: 74/88/96/100, FCP 1,5 s, LCP 5,6 s, TBT 10 ms, CLS 0, SI 5,6 s. Alertas de imagens, JS/CSS e acessibilidade. Esses dados são a referência enviada, não uma medição repetida em produção. |
| HTTP e segurança | HTTPS 200, HSTS `max-age=63072000`, HTTP→HTTPS 308, `www`→sem-www 307 temporário. A 404 padrão já retornava status 404 real. Lint falhava por `any`, com sete avisos. Auditoria inicial de dependências encontrou 17 alertas, incluindo crítico. |

## 2. O que foi implementado

- **11 páginas indexáveis**, com HTML estático (SSG/pré-renderização), títulos/descriptions exclusivos, canonical absoluto, Open Graph, Twitter Card e idioma pt-BR.
- Identidade comercial centralizada: WhatsApp **+55 (79) 99966-6089**, **crystalcode.tec@gmail.com**, Instagram **@crystallcode**, equipe de **Aracaju/SE, sem sede de atendimento presencial**. Dados confirmados pelo responsável durante o trabalho.
- Home visualmente preservada, com animações de movimento, carrossel e contatos funcionais. Conteúdo visível antes da hidratação, hero sem fade de entrada que atrase o LCP, recursos de animação carregados com LazyMotion, CSS extraído do bundle cliente e regras de mockup sem uso removidas.
- `<main>`, link para pular ao conteúdo, headings em sequência, títulos H2 no rodapé, foco visível, contraste ajustado e alvos de toque maiores. Navegação e contatos usam links reais; FAQ usa `details/summary` nativos.
- Imagens com `next/image`, `sizes`, dimensões/proporções corretas, lazy loading fora da primeira dobra e negociação AVIF/WebP. Não há imagem de hero que precise de preload: o elemento principal é texto. A fonte Inter é servida pelo Next com `display: swap`.
- Favicon da marca, ícones PNG/Apple e imagem social **1200×630 real**, gerada em código.
- `/sitemap.xml`, `/robots.txt` e `/llms.txt` gerados a partir de fontes de dados do projeto. Recursos de renderização não são bloqueados.
- 404 personalizada responsiva, sem redirecionamento automático, status HTTP 404 e noindex injetado pelo Next. Não herda canonical de uma página válida.
- JSON-LD: `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` em páginas internas e `Service` nas páginas de serviços. IDs interligam organização, site, páginas e serviços.
- **ProfessionalService foi avaliado e omitido**: é um tipo geral depreciado no Schema.org e derivado de LocalBusiness/Place. `Organization` + `Service` descrevem a atuação sem presumir um estabelecimento físico. Não foram criados endereço, CNPJ, horários, preços, clientes, avaliações ou resultados.
- Redirecionamentos 301 no Next para `www`, domínio antigo exato e HTTP no host oficial quando `x-forwarded-proto=http`, preservando caminho e query. Sem redirecionar localhost nem todos os previews indiscriminadamente. Barras finais seguem a normalização 308 padrão do Next.
- Compressão, cache do otimizador de imagens, remoção de `X-Powered-By`, proteção contra MIME sniffing e enquadramento, Referrer/Permissions Policy e COOP compatível com pop-ups. CSP restrita a `frame-ancestors`, `object-src` e `base-uri`; não é uma política completa contra XSS. Não foi aplicado `unsafe-inline` para simular uma CSP completa.
- Next.js e eslint-config-next atualizados para **16.4.6**, com dependências transitivas corrigidas dentro das versões compatíveis. React permanece 19.2.0.

### Rotas e foco de pesquisa

| URL | Assunto principal |
| --- | --- |
| `/` | CrystalCode, desenvolvimento de software em Aracaju e Sergipe |
| `/sobre` | Identidade, especialização, processo e atuação |
| `/servicos` | Empresa de desenvolvimento de software, soluções e FAQ |
| `/servicos/sistemas-sob-medida` | Sistemas empresariais personalizados, painéis, ERP/CRM |
| `/servicos/criacao-de-sites` | Criação de sites profissionais e institucionais |
| `/servicos/plataformas-web` | Plataformas web, portais e marketplaces |
| `/servicos/desenvolvimento-saas` | Produtos SaaS, arquitetura multi-tenant e recorrência |
| `/servicos/e-commerce` | Lojas virtuais, catálogo, checkout e integrações |
| `/servicos/automacao-e-integracoes` | Automação de processos empresariais e APIs |
| `/projetos` | Portfólio existente: SOCON, Alfa Consultoria e Moura Locações |
| `/contato` | Canais comerciais e informações para começar um projeto |

O texto usa os assuntos naturalmente. Não há meta keywords como estratégia de ranqueamento, páginas artificiais de cidades, métricas de clientes inventadas ou promessa de posição/citação em IA. O portfólio preserva as descrições e URLs que já existiam no projeto.

## 3. Mapa dos arquivos

### Criados

| Arquivo | Responsabilidade |
| --- | --- |
| `app/lib/site.ts` | Marca, origem HTTPS, contatos e helper de URL absoluta |
| `app/lib/seo.ts` | Metadados específicos por página |
| `app/data/content.ts` | Cadastro das páginas indexáveis, seis serviços e perguntas frequentes |
| `app/components/home.tsx` | Home extraída, com otimizações e links rastreáveis |
| `app/components/motion-features.ts` | Features de animação carregadas separadamente |
| `app/components/content-shell.tsx` | Layout das páginas internas e breadcrumbs visíveis |
| `app/components/json-ld.tsx` | JSON-LD escapado e dados de identidade/serviços |
| `app/[slug]/page.tsx` | Páginas Sobre, Serviços, Projetos e Contato |
| `app/servicos/[slug]/page.tsx` | Páginas individuais de serviços em SSG |
| `app/robots.ts` | Rota de robots.txt |
| `app/llms.txt/route.ts` | Índice complementar para ferramentas de IA |
| `app/not-found.tsx` | Interface 404 real |
| `app/opengraph-image.tsx` | Cartão social 1200×630 |
| `public/brand/` | icon-32.png, icon-192.png, icon-512.png, apple-touch-icon.png e java.webp |
| `tests/seo.spec.ts` | Testes HTTP, HTML sem JS, SEO, acessibilidade e interações |
| `playwright.config.ts` | Testes com Chrome e servidor de produção local |
| `scripts/validate-schema.mjs` | Verificação externa opcional no Schema Markup Validator |
| `SEO-GEO-GUIDE.md` | Este relatório e procedimento de manutenção |

### Modificados ou aproveitados

- `app/page.tsx`: entrada de servidor da home e seus metadados.
- `app/layout.tsx`: idioma, fonte, metadataBase, ícones, viewport e link de acessibilidade.
- `app/globals.css`: CSS extraído da home, acessibilidade e estilos das páginas internas/404.
- `app/data/projetos.ts`: dimensões reais das imagens, preservando projetos, descrições e links.
- `app/favicon.ico`: substituído pelo ícone da marca existente.
- `app/sitemap.ts`: arquivo local preexistente não rastreado, atualizado para a lista pública; removido lastmod artificial.
- `next.config.ts`: redirecionamentos, imagens, compressão e cabeçalhos.
- `eslint.config.mjs`: relatórios gerados excluídos do lint.
- `package.json` e `package-lock.json`: atualizações compatíveis e ferramentas/comandos de validação.
- `.gitignore`: artefatos gerados de teste e relatórios locais.
- `README.md`: comandos do projeto e referência a este guia.

`app/zip.zip` já existia como arquivo não rastreado e foi preservado. Não foi colocado no sitemap, em `public` ou nos arquivos de IA; `/zip.zip` e `/app/zip.zip` foram testados com 404.

## 4. Testes e resultados

### Verificação local

```powershell
npm ci
npm run lint
npm run build
npm run test:seo
npm audit --omit=dev
```

Os testes usam Chrome instalado (`channel: chrome`), iniciam `next start` em `127.0.0.1:3100` e precisam de um build recente. Em uma máquina sem Chrome, instale-o ou altere explicitamente o projeto para um navegador disponível. Não execute os testes contra `next dev` para aprovar comportamento de produção.

Resultados verificados:

- Build de produção e TypeScript aprovados, com todas as 11 páginas públicas pré-renderizadas.
- Lint aprovado, sem erros ou avisos no código da aplicação.
- **18 testes Playwright aprovados**: 11 páginas com JS desativado, idioma, títulos/descriptions, canonical, OG/Twitter, um H1, hierarquia de títulos, schemas e links; sitemap/robots/llms; 404 real e ausência de arquivos internos; 301 e normalização de URLs; layouts 390/1440 px; imagens; FAQ, navegação e carrossel.
- Axe WCAG A/AA e WCAG 2.1 AA sem violações detectadas nas páginas representativas em mobile e desktop. Isso não substitui auditoria manual completa com tecnologia assistiva.
- Headers de proteção, ícones, cartão social e resposta AVIF/WebP do otimizador testados por HTTP.
- `npm audit --omit=dev`: **zero vulnerabilidades**.
- Auditoria completa **na implementação de 12/11**: havia 8 alertas moderados na cadeia `eslint-config-next` → `typescript-eslint` → `minimatch` 10.2.6. O estado mudou com novos avisos e a correção de 17/11; os números atuais estão na seção 8.

### Performance

Lighthouse **13.6.0**, build de produção local, perfil mobile padrão com throttling simulado:

| Métrica | Referência enviada (produção) | Medição local após implementação |
| --- | --- | --- |
| Desempenho | 74 | 100 |
| Acessibilidade | 88 | 100 |
| Boas práticas | 96 | 100 |
| SEO | 100 | 100 |
| FCP | 1,5 s | 0,9 s |
| LCP | 5,6 s | 0,9 s |
| TBT | 10 ms | 60 ms |
| CLS | 0 | 0 |
| Speed Index | 5,6 s | 0,9 s |

**Ambientes diferentes: não interpretar a tabela como comparação controlada ou garantia em produção.** O INP real não foi medido; TBT não é INP. LCP/CLS/INP devem ser acompanhados no PageSpeed/CrUX/Search Console após publicação, com metas de LCP ≤2,5 s, INP <200 ms e CLS <0,1 no percentil 75.

A tabela registra a última medição do build final (`reports/lighthouse-final.report.html` e `.json`). Uma medição anterior marcou 99 em desempenho, ilustrando a variação normal de laboratório. A rodada final dos 18 testes terminou sem falhas.

Permanece oportunidade de aproximadamente 27 KiB de JS não usado e 14 KiB de compatibilidade legada do framework na medição local. Não foram removidos polyfills indiscriminadamente nem animações importantes para obter uma pontuação artificial.

Em requisições reais ao otimizador local com AVIF aceito, a imagem da equipe caiu de 748.575 para **18.567 bytes a 640 px**; os três projetos retornaram **10.033 / 7.789 / 12.521 bytes a 640 px**. O ícone Java derivado tem **3.656 bytes**, contra 573.744 bytes do PNG original. O tamanho servido varia conforme resolução/formato negociados; os originais foram preservados.

Relatórios locais ficam em `reports/` e `playwright-report/`, screenshots em `test-results/`. JSON/HTML de relatórios não são versionados. Para repetir Lighthouse:

```powershell
# Terminal 1
npm run build
npm run start -- --hostname 127.0.0.1 --port 3200

# Terminal 2
New-Item -ItemType Directory -Force reports | Out-Null
$env:CHROME_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'
npx --yes lighthouse http://127.0.0.1:3200/ --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path=./reports/lighthouse-local --quiet
```

### Dados estruturados e ferramentas externas

O JSON-LD de todas as 11 páginas foi analisado pelos testes. **Dez páginas foram também validadas como código HTML no Schema Markup Validator, sem erros e sem avisos** (home, quatro páginas institucionais e cinco serviços). A última página, `/servicos/automacao-e-integracoes`, não recebeu conclusão externa: o validador passou a exigir verificação anti-bot. Não houve tentativa de contornar essa verificação. A submissão de código valida a estrutura local; não atesta que a versão nova esteja no domínio público.

Para repetir a verificação externa com o servidor 3200 ativo:

```powershell
npm run validate:schema
# Ou, para uma origem publicada/preview:
$env:SEO_BASE_URL='https://crystalcode.com.br'
npm run validate:schema
Remove-Item Env:SEO_BASE_URL
```

Esse script envia apenas o HTML público ao validator.schema.org e depende da disponibilidade/idioma/interface externa. O relatório fica em `reports/schema-validation.json`. Se a interface mudar, valide manualmente por código ou URL.

O **Google Rich Results Test foi tentado por código**, mas devolveu “Ocorreu um erro / Faça login e tente novamente”. Não houve resultado válido do Google nessa tentativa. Repetir com sua sessão autenticada depois da publicação. Schema válido não garante rich result; o tipo Service não cria automaticamente uma apresentação especial no Google.

## 5. Próximos passos para finalizar em produção

1. **Publicar as alterações no projeto Vercel existente**, incluindo os novos arquivos da implementação (atenção ao sitemap anteriormente não rastreado). Revisar os arquivos antes de incluí-los no Git: `app/zip.zip` é um arquivo preexistente do responsável e não faz parte desta implementação. Use `npm ci` e `npm run build`. Não usar exportação estática sem uma configuração equivalente para redirecionamentos, otimizador e status 404.
2. **Vercel → Domains:** confirmar `crystalcode.com.br` como domínio principal; revisar o redirecionamento de `www` para permanente **301**, se a plataforma permitir. A Vercel ainda devolvia **307** na auditoria. Regras do provedor podem executar antes de `next.config.ts`, então o 301 local não muda sozinho a configuração do painel. A regra HTTP do provedor já usa **308 permanente**; se o requisito operacional exigir exatamente 301, configure-o na borda também. Ambos os códigos permanentes são entendidos por mecanismos de busca.
3. **Manter HTTPS e HSTS existentes.** HSTS já foi confirmado em produção com `max-age=63072000`. Não habilitar preload/includeSubDomains sem verificar todos os subdomínios. Confirmar que não há proxy intermediário alterando `x-forwarded-proto` ou criando loops.
4. **Proteger previews** com Deployment Protection ou `X-Robots-Tag: noindex` no provedor. Não aplicar esse header ao domínio oficial. Se algum ambiente tiver conteúdo privado, exigir autenticação; robots/noindex não são controle de acesso. O domínio Vercel antigo exato redireciona pelo código; outros aliases devem ser revisados no painel.
5. **Google Search Console:** adicionar/verificar propriedade de domínio `crystalcode.com.br` via registro DNS TXT fornecido pelo Google. Enviar `https://crystalcode.com.br/sitemap.xml`. Inspecionar home, Serviços e uma página de serviço; conferir “Teste de URL publicada” e solicitar indexação das páginas prioritárias. Não é necessário enviar cada URL repetidamente. Acompanhar Páginas, Sitemaps e Core Web Vitals.
6. **Bing Webmaster Tools:** verificar/importar propriedade e enviar o mesmo sitemap. IndexNow pode ser avaliado quando houver publicação frequente; não foi adicionado um endpoint ou chave fictícia.
7. **Validar a implantação real:** `/robots.txt` 200 texto, `/sitemap.xml` 200 XML com 12 URLs na versão que inclui `/privacidade`, `/llms.txt` 200 texto, páginas públicas 200 e URL aleatória 404. Confirmar canonical/OG sem `www` e sem URL de preview. Testar também caminhos internos e query strings nas variantes de domínio.
8. Abrir [Rich Results Test](https://search.google.com/test/rich-results), [Schema Markup Validator](https://validator.schema.org/) e [PageSpeed Insights](https://pagespeed.web.dev/) com a URL publicada. O teste do Google pode exigir seu login. Revisar mobile e desktop e repetir após a distribuição do deploy/cache.
9. Confirmar apresentação do cartão social ao compartilhar a home e atualizar a bio do Instagram com o domínio canônico. Manter a mesma grafia da marca e os mesmos contatos nos perfis comerciais.
10. Após dados suficientes, avaliar métricas reais de usuários e consultas no Search Console. A indexação, os rich results e as citações em ferramentas de IA dependem dos mecanismos externos; não têm prazo ou posição garantidos.

Não é necessária uma variável secreta para SEO. Não coloque tokens de Search Console, credenciais ou dados privados em `public`, JSON-LD, llms.txt, sitemap ou arquivos `NEXT_PUBLIC_*`. A verificação DNS usa o valor fornecido pela sua conta; nenhum token foi inventado.

## 6. Como manter e adicionar páginas

### Atualizar identidade e metadados

- Mudar contato, domínio ou perfil oficial em `app/lib/site.ts`. Manter texto visível, JSON-LD e perfis externos coerentes.
- Títulos e descriptions das páginas ficam em `app/data/content.ts`; `pageMetadata` centraliza canonical e redes sociais. Não reutilizar o mesmo title/description em todas as páginas.
- `app/layout.tsx` contém padrões de marca/idioma, **sem canonical de home herdável**. Cada página indexável deve definir seu próprio canonical por `pageMetadata`.
- `https://crystalcode.com.br` e `https://crystalcode.com.br/` representam a mesma raiz: o Next pode normalizar a barra da home nos metadados. Páginas internas usam caminhos sem barra final, com redirecionamento padrão do Next para variantes com barra.
- A imagem social fica em `app/opengraph-image.tsx`; preservar dimensão real 1200×630 e alt coerente.

### Novo serviço

1. Acrescentar uma entrada original em `SERVICES`, em `app/data/content.ts`: slug amigável, nome, title, description, introdução e seções que expliquem uma oferta real.
2. A entrada cria automaticamente a rota `/servicos/slug` no próximo build e alimenta a listagem de serviços, links relacionados, sitemap, llms.txt, metadata, Service e breadcrumbs.
3. Usar um slug estável, sem acentos/espaços. Ao mudar um slug já publicado, criar redirecionamento permanente da URL antiga para a nova.
4. Se o serviço também precisar de um card na home, adicioná-lo a `SOLUCOES`, em `app/components/home.tsx`, com o mesmo slug. Os cards existentes têm vínculo explícito por slug, independente da ordem da lista.
5. Rodar build, lint e testes; revisar conteúdo, navegação e layout.

### Nova página institucional ou editorial

1. Criar o conteúdo e a rota de servidor/SSG. No modelo atual de páginas institucionais, adicionar a implementação correspondente em `app/[slug]/page.tsx` e o cadastro com `path`, `title` e `description` em `PAGES`.
2. O cadastro de `PAGES` é a **lista permitida de páginas públicas indexáveis**. Sitemap e llms.txt usam essa mesma lista automaticamente no build. Não cadastrar uma URL sem conteúdo e rota reais.
3. Para uma rota separada, exportar metadados por `pageMetadata`, usar `ContentShell` e `PageSchema` com breadcrumbs que correspondam à navegação visível, e cadastrar sua URL em `PAGES`.
4. Adicionar links internos contextuais para a página. Manter um H1 e níveis seguintes coerentes. Conteúdo essencial deve estar no HTML inicial, inclusive sem JavaScript.
5. Páginas privadas, buscas internas, rascunhos, redirecionamentos e páginas noindex ficam **fora** da lista. Quando existir uma necessidade de noindex, defini-lo só nessa página (`robots: { index: false, follow: true }`) e não bloquear seu rastreamento se o crawler precisar ler o noindex. Rotas autenticadas precisam também de autorização no servidor.
6. Para um blog, conectar as URLs publicadas e indexáveis da fonte editorial ao mesmo cadastro/gerador; não gerar milhares de páginas sem conteúdo próprio.

### Sitemap e lastmod

`app/sitemap.ts` deriva as URLs de `PAGES`, sem enumerar URLs à parte. `generateStaticParams` usa os mesmos dados para as rotas de conteúdo/serviço. A atualização acontece no próximo build/deploy, não ao editar um arquivo já publicado sem reconstrução.

Não há `lastmod` atualmente porque o projeto não possui data editorial confiável. Se um CMS ou registro editorial passar a fornecer data real de alteração do conteúdo, adicionar esse campo ao cadastro e mapear `lastModified`. Não usar `new Date()` em todas as páginas a cada requisição ou build; `changefreq` e `priority` também não foram inventados.

### Imagens, fontes e movimento

- Usar `next/image` com dimensões reais ou `fill` em contêiner de tamanho/aspect-ratio reservado; informar `sizes` condizente com o layout e alt útil. Imagens decorativas usam alt vazio.
- Ao substituir imagens, preferir um novo nome de arquivo para invalidar caches; o otimizador usa TTL mínimo de 24 horas.
- Manter lazy loading fora da primeira dobra. Só usar preload/prioridade em uma imagem que realmente seja essencial na primeira dobra.
- Não voltar a servir o PNG grande de Java no lugar de `public/brand/java.webp`.
- Não iniciar texto essencial com opacity 0. Respeitar `prefers-reduced-motion` e preservar o funcionamento de links sem JS.
- Não remover indiscriminadamente polyfills ou bibliotecas sem analisar o impacto na compatibilidade e nas animações.

## 7. Limites e evolução recomendada

- **Publicação e configurações de contas/DNS ainda dependem do responsável.** Não foram alterados Vercel, Search Console, Bing, DNS ou redes sociais nesta execução.
- **INP/CrUX e PageSpeed da nova versão pública ainda pendentes.** Lighthouse local é evidência de laboratório, não uma medição de usuários reais.
- **Rich Results Test sem conclusão**, por exigência de login externo. No Schema Markup Validator, a validação externa da página de automação/integrações ficou pendente por verificação anti-bot, embora os testes locais dessa página tenham passado. Validar manualmente após publicar e autenticar.
- **Alertas de dependências:** o problema original de minimatch foi corrigido em 17/11; existem novos alertas de desenvolvimento de picomatch, detalhados na seção 8. Não usar `npm audit fix --force` automaticamente.
- **CSP completa e Trusted Types** exigem um projeto de segurança separado, com nonces/hashes e testes do runtime do Next. A CSP adicionada protege enquadramento/objetos/base, sem prometer mitigar todo XSS.
- Criar estudos de caso apenas com autorização, contexto e resultados documentados. Para os projetos atuais, confirmar futuramente domínios definitivos no lugar dos links Vercel existentes.
- Publicar conteúdos educativos úteis sobre requisitos, integração de sistemas, escolha entre software pronto e sob medida e planejamento de SaaS. Incluir responsáveis/revisores reais e datas editoriais verificáveis; evitar textos repetitivos focados só em palavras-chave.
- Não foi criado CNPJ ou endereço. Se futuramente houver dados institucionais adicionais confirmados, incorporá-los onde forem úteis e coerentes; não são pré-requisitos para os schemas atuais.
- `/llms.txt` é apenas um índice complementar para ferramentas que eventualmente o consultem. **Não é fator de ranqueamento nem requisito do Google ou de suas respostas de IA.** A base continua sendo HTML acessível, conteúdo útil, identidade consistente e links rastreáveis.

## 8. Revisão de segurança e plano de visibilidade — 17/11/2026

### Correção aplicada

O `package-lock.json` foi atualizado com versões compatíveis da cadeia do ESLint: `typescript-eslint`/pacotes relacionados passaram de 8.72.2 para **8.73.0**, com `minimatch` **11.0.9**. Isso corrige a vulnerabilidade de amplificação de padrões que originava os oito alertas moderados anteriores. Não houve downgrade de Next/ESLint, migração forçada de Tailwind, edição manual de node_modules ou alteração no layout/conteúdo comercial.

Validação após a atualização: lint sem erros/avisos, build de produção com TypeScript aprovado e **18 testes aprovados** (39,3 s na rodada de 17/11), incluindo páginas sem JavaScript, metadados, sitemap/robots, status HTTP, layout/acessibilidade e interações. A atualização desta revisão ainda não foi publicada a partir deste checkout.

O audit completo agora também identifica **19 ocorrências classificadas como altas**, propagadas pela árvore de ferramentas de desenvolvimento a partir de **uma vulnerabilidade de picomatch** (GHSA-fc5q-39xc-vjpf / CVE-2026-112366). Esse número representa pacotes afetados na cadeia, e não 19 falhas independentes implementadas no site. O aviso oficial foi revisado em 17/11 e informa **nenhuma versão corrigida**; o registro npm consultado oferece picomatch 4.0.7 como versão mais recente. Não foi instalada uma versão fictícia nem aplicado um patch não validado a um parser de terceiros.

O problema envolve consumo excessivo de CPU com padrões glob especialmente construídos. Neste projeto, o uso identificado está no lint/build e na busca de arquivos de ferramentas de desenvolvimento, com configurações do próprio repositório. Não foi identificado um formulário ou endpoint público que encaminhe padrões de visitantes a essas ferramentas. **`npm audit --omit=dev` permanece com zero vulnerabilidades reportadas.** Isso não prova ausência de toda falha possível no software; delimita o resultado da auditoria de dependências de produção.

Medidas de manutenção: executar lint/build somente sobre alterações de origem confiável; manter o servidor de desenvolvimento fora da internet; acompanhar a correção oficial do picomatch e atualizar o lockfile assim que houver uma versão compatível corrigida. Os alertas não devem ser ocultados com exclusões do audit. Não são um fator direto de posicionamento do Google.

### O que foi observado no site publicado

- `https://crystalcode.com.br/sitemap.xml`: HTTP 200, XML com 11 URLs.
- `https://crystalcode.com.br/robots.txt`: HTTP 200, `Allow: /` e referência ao sitemap correto.
- Todas as 11 URLs: HTTP 200, um H1, sem noindex observado e JSON-LD sintaticamente válido no HTML entregue em requisições identificadas como Googlebot. Usar esse User-Agent não reproduz o ambiente interno do Google nem comprova um rastreamento real do buscador.
- Amostras de canonical, titles e descriptions: domínio oficial sem `www` e metadados próprios.
- URL inexistente: HTTP 404.
- `www` continua respondendo **307** no provedor, preservando caminho/query. Trocar para permanente no painel da Vercel continua recomendado. HTTP→HTTPS retorna **308 permanente**.

### Entender os dois prints

O primeiro print apresenta a **Visão geral criada por IA do Google**, com empresas citadas e links para fontes. Não é um cadastro manual de empresas naquela lista. Segundo o Google, uma página precisa estar indexada e apta a aparecer com snippet para ser elegível como fonte; não há schema, arquivo de IA ou configuração especial que garanta a inclusão. Conteúdo, indexação e qualidade ajudam a disputar essa visibilidade, mas a seleção varia conforme a pesquisa e não é garantida.

O segundo print mostra o sitemap como **Processing**, sem erros e sem último rastreamento informado. O contador de zero URLs, nessa condição, não comprova que o arquivo esteja vazio ou que a submissão tenha falhado: o arquivo público foi consultado e contém 11 URLs. Aguardar o processamento e usar URL Inspection ajuda a diferenciar descoberta, rastreamento e indexação. Não é necessário apagar e reenviar o sitemap repetidamente.

### Próximas ações, na ordem

1. **Confirmar indexação de páginas específicas.** No Search Console já cadastrado, abrir “Inspeção de URL” e consultar:
   - `https://crystalcode.com.br/`
   - `https://crystalcode.com.br/servicos/criacao-de-sites`
   - `https://crystalcode.com.br/servicos/sistemas-sob-medida`

   Usar “Testar URL publicada” para conferir acesso atual. Se a URL estiver ausente e for elegível, solicitar indexação uma vez. Se o status for “Descoberta, mas não indexada” ou “Rastreada, mas não indexada”, examinar o motivo, o canonical e o HTML recebido antes de reenviar. Se já estiver indexada, o trabalho passa a ser principalmente de conteúdo, relevância e autoridade. Repetir pedidos não acelera o rastreamento.

2. **Acompanhar o Bing já cadastrado.** Usar URL Inspection nas mesmas páginas e acompanhar o processamento do sitemap. O painel diferencia descoberta, rastreamento e indexação; não presumir erro por um contador ainda não preenchido. Se houver erro de busca/processamento, consultar o detalhe antes de alterar código ou reenviar.

3. **Fortalecer a página existente de criação de sites.** Ela já está publicada, tem conteúdo próprio e seção de atuação em Aracaju/Sergipe. É o destino adequado para a pesquisa do print. Em futuras revisões, priorizar informações que ajudem a contratar: quais problemas resolve, diferença entre site institucional e plataforma, etapas, integrações, manutenção e como o orçamento é definido. Não criar páginas quase iguais para cada município. Fazer o mesmo para sistemas/SaaS, preservando o posicionamento de software sob medida.

4. **Documentar provas reais do trabalho.** Para SOCON, Alfa Consultoria e Moura Locações, desenvolver estudos de caso com autorização e informações confirmadas: contexto, o que foi desenvolvido, papel da equipe e capturas do produto. Publicar resultados numéricos somente quando documentados. Quando adequado e acordado com o cliente, um crédito ou referência natural ao trabalho da CrystalCode no site dele ajuda pessoas e buscadores a encontrar a empresa. Não comprar links, inventar depoimentos ou montar listas falsas de “melhores empresas”.

5. **Manter identidade consistente.** Nome CrystalCode, domínio oficial, e-mail, WhatsApp e Instagram @crystallcode devem coincidir no site e nos perfis oficiais. Descrever a empresa como desenvolvimento de software e produtos digitais de Aracaju/SE. Usar o domínio em perfis e apresentações públicas; conquistar referências de clientes e parceiros reais.

6. **Avaliar Perfil da Empresa no Google apenas se houver atendimento presencial real.** Não ter sede comercial, por si só, não resolve a elegibilidade. Se a equipe visita clientes de fato e atende aos demais critérios, pode avaliar um perfil de área de serviço, com endereço real para verificação e endereço oculto do público. Se o serviço for exclusivamente online, o Google informa que esse tipo de negócio não é elegível. Não criar endereço, escritório virtual ou atendimento presencial fictício para cadastrar. Isso é separado de aparecer no resultado orgânico/Visão geral por IA.

7. **Medir evolução semanalmente.** No Search Console, acompanhar impressões, cliques, páginas e consultas relacionadas a CrystalCode, criação de sites em Aracaju/Sergipe, sistemas sob medida e desenvolvimento de software. Não existe um prazo garantido para entrar na resposta de IA; o próprio rastreamento pode levar dias ou semanas. Na interface do Bing, o relatório de AI Performance mostrado no menu pode ser consultado quando houver dados; não confundir ausência inicial de dados com uma falha técnica do site.

8. **Publicar a atualização de dependências desta revisão.** O lockfile corrigido está local; publicar pelo fluxo normal do projeto para que futuros builds usem as versões atualizadas. O cadastro nos buscadores e a versão SEO anterior já publicada não publicam automaticamente mudanças feitas neste checkout.

### Fontes desta revisão

- [Google: requisitos para AI Overviews e AI Mode](https://developers.google.com/search/docs/appearance/ai-features).
- [Google: solicitar novo rastreamento e limites](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
- [Bing: sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed) e [inspeção de URLs](https://www.bing.com/webmasters/help/url-inspection-55a30305).
- [Google: elegibilidade do Perfil da Empresa](https://support.google.com/business/answer/13763036) e [áreas de serviço](https://support.google.com/business/answer/9157481).
- [Aviso original de minimatch](https://github.com/advisories/GHSA-g3hv-75wg-m249), [release de typescript-eslint 8.73.0](https://github.com/typescript-eslint/typescript-eslint/releases/tag/v8.73.0) e [aviso atual de picomatch sem correção publicada](https://github.com/advisories/GHSA-fc5q-39xc-vjpf).

## Referências de implementação

- [Next.js: metadados](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) e [redirecionamentos/statusCode](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects).
- [Google: recursos de IA e seu site](https://developers.google.com/search/docs/appearance/ai-features) e [orientações para busca generativa](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- [Schema.org Organization](https://schema.org/Organization), [Service](https://schema.org/Service) e [situação de ProfessionalService](https://schema.org/ProfessionalService).
- [Google: dados estruturados de Organization](https://developers.google.com/search/docs/appearance/structured-data/organization).
