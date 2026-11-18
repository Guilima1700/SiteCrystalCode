# CrystalCode

Site institucional em Next.js App Router. Domínio oficial: https://crystalcode.com.br/.

Consulte **[SEO-GEO-GUIDE.md](./SEO-GEO-GUIDE.md)** para o diagnóstico, implementação, validações, manutenção de páginas/metadados e passos externos de publicação/indexação.

Google Analytics 4: ID `G-865FRY6T9R` configurado, com permissão do visitante antes da coleta. Consulte **[GOOGLE-ANALYTICS-GUIDE.md](./GOOGLE-ANALYTICS-GUIDE.md)** para ativar e validar no painel. A variável opcional `NEXT_PUBLIC_GA_MEASUREMENT_ID` substitui o padrão; valor vazio desativa a integração. Não há coleta no localhost nem em deploys Vercel Preview.

```powershell
npm ci
npm run dev
```

Validação antes de publicar:

```powershell
npm run lint
npm run build
npm run test:seo
npm audit --omit=dev
```

`test:seo` usa Chrome instalado e inicia o servidor de produção na porta 3100. `validate:schema` é uma verificação externa opcional que requer servidor ativo na porta 3200 (ou `SEO_BASE_URL`). Veja instruções completas no guia.
