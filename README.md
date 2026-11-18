# CrystalCode

Site institucional em Next.js App Router. Domínio oficial: https://crystalcode.com.br/.

Consulte **[SEO-GEO-GUIDE.md](./SEO-GEO-GUIDE.md)** para o diagnóstico, implementação, validações, manutenção de páginas/metadados e passos externos de publicação/indexação.

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
