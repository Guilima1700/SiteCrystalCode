# Google Analytics 4 — CrystalCode

Implementação: **17 de novembro de 2026**.

- Site: **https://crystalcode.com.br/**.
- ID informado pelo responsável e configurado: **G-865FRY6T9R**.
- O código está preparado para publicação. O recebimento de dados na conta Google depende do deploy e da verificação no painel; os testes locais não enviam dados reais para a propriedade.

## 1. O que foi configurado no site

- Google Analytics 4 em todo o site, com carregamento assíncrono após hidratação e permissão.
- Medição inicial e mudanças de página do Next.js por eventos `page_view` manuais. Navegar entre páginas não reinstala nem reconfigura a tag. Âncoras da mesma página não contam como uma nova visualização.
- Evento `contact_click` para cliques em WhatsApp, e-mail comercial e Instagram oficial; parâmetro `contact_method` com `whatsapp`, `email` ou `instagram`. Ele indica clique/intenção de contato, **não comprova mensagem enviada, lead qualificado ou venda**.
- Preferência de medição com ações equivalentes de permitir e recusar, reabertura por “Preferências de cookies” e preferência salva por até 180 dias. Quando o navegador bloqueia o armazenamento, a escolha vale para a página aberta.
- Sem carregamento da tag Google antes da permissão. A recusa desativa eventos e remove cookies GA acessíveis do domínio. Dados já enviados não são apagados automaticamente.
- Consent Mode básico: analytics permitido só após aceite; publicidade, uso de dados para anúncios e personalização mantidos negados. Google Signals e sinais de personalização publicitária desabilitados na configuração da tag.
- Não são enviados nome, telefone ou e-mail do visitante como parâmetros personalizados. Não há User-ID configurado. URLs dos eventos implementados excluem query strings e fragmentos; links completos de contato/mensagens WhatsApp não são enviados. Parâmetros UTM também não são incluídos nesses endereços; campanhas específicas precisam ser avaliadas separadamente se forem adotadas.
- `/privacidade` descreve o comportamento implementado e fornece o canal de contato. A integração não configura automaticamente as políticas de retenção/compartilhamento da conta Google: essas escolhas ficam no painel da propriedade.
- Coleta somente no hostname `crystalcode.com.br`, em build de produção. `next dev`, localhost, outros hosts e Vercel Preview ficam fora. A página 404 usa `/404` nos eventos manuais, sem enviar um endereço inválido arbitrário.

O ID de medição é público e pode aparecer no código do navegador. Não é senha, chave de API ou segredo de acesso à conta.

## 2. Concluir no Google Analytics — propriedade já criada

Como o ID já foi fornecido, **não crie outra propriedade para instalar a mesma integração**. Primeiro confirme o fluxo atual:

1. Acesse [Google Analytics](https://analytics.google.com/) com a conta responsável.
2. Selecione a propriedade da CrystalCode no seletor superior.
3. Em **Administrador → Coleta e modificação de dados → Fluxos de dados**, abra o fluxo **Web** do site.
4. Confira o URL `https://crystalcode.com.br` e o **ID da métrica/medição `G-865FRY6T9R`**. Não confundir com o número da propriedade ou ID `GTM-...` de Tag Manager.
5. **Desative a “Medição otimizada” desse fluxo antes de ativar esta instalação.** O site já envia suas visualizações manualmente e mede canais de contato sem mandar a URL completa. Isso também evita que a medição automática registre cliques externos completos.
   - Se futuramente habilitar alguma opção isolada, mantenha desativadas as visualizações automáticas por carregamento/histórico e revise os dados de cada evento.
   - Em especial, `send_page_view: false` no código não impede sozinho as visualizações por mudança de histórico da Medição otimizada; deixar as duas formas ativas pode duplicar contagens.
6. Não instale novamente o snippet sugerido pelo painel e não adicione uma segunda tag via Tag Manager. A integração já está no código.
7. Em configurações da propriedade, confira **fuso de São Paulo (America/Sao_Paulo)** e **moeda BRL**, se forem as opções desejadas para os relatórios da empresa. Confira também retenção, compartilhamento e filtros de tráfego interno conforme as decisões reais da empresa.

## 3. Publicar na Vercel

1. Publique as alterações pelo mesmo repositório/projeto Vercel que atende `crystalcode.com.br`.
2. O ID já consta em `app/lib/site.ts`. **Não é obrigatório criar uma variável para funcionar.**
3. Se quiser controlar o ID pelo painel da Vercel, em **Project → Settings → Environment Variables**, configure `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-865FRY6T9R` no ambiente **Production**. Essa variável substitui o padrão.
4. Se essa variável já existir vazia, remova-a ou preencha o ID: um valor explicitamente vazio desativa a integração.
5. Faça um novo deploy de **Production**. Mudanças de configuração precisam de novo build/deploy. Um Preview não coleta por decisão desta implementação.
6. Confira a publicação de `/privacidade` e o link “Privacidade e cookies” no rodapé. O sitemap passa a conter **12 páginas públicas** com essa nova página.

Não é necessário colocar uma chave de API, senha Google ou credencial de administrador no código. Não foram alteradas configurações da conta Google nem da Vercel nesta execução.

## 4. Verificar se os dados estão chegando

1. Depois do deploy, abra **https://crystalcode.com.br/** em uma janela sem bloqueador de anúncios/medição.
2. Selecione **Permitir medição**. Recusar ou ignorar a escolha mantém a coleta desligada.
3. Navegue da home para Serviços e Contato; clique em um canal de contato.
4. No Analytics, abra **Relatórios → Tempo real**. Procure a atividade e os eventos `page_view` e `contact_click`. Os relatórios comuns não precisam aparecer ao mesmo tempo que o Tempo real.
5. Para diagnóstico mais detalhado, abra [Google Tag Assistant](https://tagassistant.google.com/), conecte o domínio publicado e confirme o ID, os eventos e o consentimento. Antes de aceitar, a tag estará bloqueada pela implementação básica; isso é esperado.
6. Na aba Network do navegador, depois do aceite, confirme o carregamento de `googletagmanager.com/gtag/js?id=G-865FRY6T9R` e envios ao serviço Analytics. Não deve haver uma segunda instalação da mesma tag.
7. Mude para **Recusar medição**, navegue novamente e confira que a preferência permanece recusada. Para permitir de novo, use o botão “Preferências de cookies”.

Se não houver dados: conferir deploy de Production, hostname sem www, ID/variável, aceite, bloqueadores/extensões, filtros de tráfego interno e propriedade selecionada. Se houver visualizações duplicadas: revisar a Medição otimizada e possíveis tags/snippets extras.

Não foi feita uma visita de teste à propriedade real pelo agente. Os testes automatizados interceptam a tag e todas as chamadas externas, sem inflar métricas da empresa. O recebimento real será confirmado nessa etapa após o deploy.

## 5. Relatórios úteis para a CrystalCode

- **Aquisição de tráfego:** origem das visitas, como busca orgânica, referência ou acesso direto.
- **Páginas e telas:** páginas de serviços consultadas e envolvimento.
- **Eventos:** quantidade de `contact_click` e `page_view`.
- Para analisar o canal clicado: **Administrador → Exibição de dados → Definições personalizadas → Criar dimensão personalizada**; nome **Canal de contato**, escopo **Evento**, parâmetro **`contact_method`**. A dimensão pode levar tempo para aparecer nos relatórios.
- Se desejar tratar um clique de contato como objetivo, marque `contact_click` como **evento principal** em **Administrador → Exibição de dados → Eventos**. O Google pode demorar a listar um evento novo; não crie um evento duplicado com outra condição só para fazê-lo aparecer.
- Como o Search Console já foi cadastrado, pode vinculá-lo em **Administrador → Vinculações de produtos → Search Console → Vincular**, escolhendo a propriedade verificada e este fluxo Web. A vinculação depende das permissões na conta e não altera o ranqueamento.

## 6. Se precisar criar uma propriedade nova no futuro

1. Analytics → **Administrador → Criar → Conta** (se necessária), nome CrystalCode.
2. **Criar → Propriedade**, nome **CrystalCode — Site**, fuso São Paulo e moeda BRL.
3. Informar a categoria/tamanho reais da empresa e o objetivo adequado, como geração de leads.
4. Adicionar fluxo **Web**, domínio `https://crystalcode.com.br`, nome CrystalCode Web.
5. Aplicar a configuração de Medição otimizada da seção 2 para esta integração manual.
6. Copiar o novo ID `G-...`, atualizar o padrão em `app/lib/site.ts` ou a variável de Production e publicar um novo build. Não reutilizar um ID de outra empresa.

## 7. Arquivos e manutenção

| Arquivo | Uso |
| --- | --- |
| `app/lib/site.ts` | ID padrão público informado pelo responsável |
| `app/layout.tsx` | Integração global e regras de ativação por build/ambiente |
| `app/components/google-analytics.tsx` | Tag assíncrona, pageviews, contatos e interface de preferência |
| `app/lib/analytics-consent.ts` | Persistência/expiração de preferência e remoção de cookies |
| `app/globals.css` | Estilo da preferência, mantendo a identidade do site |
| `app/data/content.ts` e `app/[slug]/page.tsx` | Página de privacidade, metadados e inclusão automática no sitemap |
| `app/components/content-shell.tsx` e `app/components/home.tsx` | Link de privacidade nos rodapés |
| `.env.example` | Exemplo da variável opcional, sem credenciais |
| `tests/analytics.spec.ts` | Consentimento, ausência de coleta local, navegação, contatos e revogação |

Validação do projeto:

```powershell
npm run lint
npm run build
npm run test:seo
```

Os testes usam o Chrome instalado, servem o build local sob o hostname oficial por interceptação do Playwright e substituem a tag do Google por um stub. Verificam comandos gerados pela integração, sem afirmar recebimento real na conta. A suíte existente continua validando SEO, 404, redirecionamentos, imagens, carrossel e acessibilidade.

**Resultado em 17/11/2026:** lint aprovado sem erros/avisos, build de produção/TypeScript aprovado e **27 testes aprovados** em 38,8 s. A interface de permissão foi revisada visualmente no mobile. A página de privacidade também passou na verificação de layout e acessibilidade em 390 e 1440 px. Nenhum pacote novo foi instalado para esta integração.

## Fontes oficiais

- [Configurar conta, propriedade e fluxo Web](https://support.google.com/analytics/answer/9304153?hl=pt-BR).
- [Medição manual de páginas e prevenção de duplicidade](https://developers.google.com/analytics/devguides/collection/ga4/views).
- [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent).
- [Dimensões personalizadas de evento](https://support.google.com/analytics/answer/14239696?hl=pt-BR).
- [Eventos principais](https://support.google.com/analytics/answer/13128484?hl=pt-BR).
- [Vincular Search Console](https://support.google.com/analytics/answer/10737381?hl=pt-BR).
