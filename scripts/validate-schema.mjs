import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

// Optional external verification: submits only the site's public rendered HTML.
const baseUrl = process.env.SEO_BASE_URL || "http://127.0.0.1:3200";
const xml = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
if (!paths.length)
  throw new Error("Sitemap sem URLs: verifique o servidor de produção local.");
await mkdir("reports", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const path of paths) {
    const page = await browser.newPage({ locale: "pt-BR" });
    const html = await (await fetch(`${baseUrl}${path}`)).text();
    await page.goto("https://validator.schema.org/", {
      waitUntil: "networkidle",
    });
    if (page.url().includes("google.com/sorry")) {
      throw new Error(
        "O validador exigiu verificação anti-bot. Abra validator.schema.org manualmente; nenhuma tentativa automática adicional foi feita.",
      );
    }
    await page.getByText("Snippet de código", { exact: true }).click();
    await page.locator("#new-test-textarea + .CodeMirror").click();
    await page.keyboard.insertText(html);
    await page.getByRole("button", { name: "Testar", exact: true }).click();
    await page.waitForFunction(
      () => /\d+\s*ERROS/i.test(document.body.innerText),
      undefined,
      { timeout: 30_000 },
    );
    const text = await page.locator("body").innerText();
    const start = text.lastIndexOf("</body></html>");
    const summary = text
      .slice(start === -1 ? -2500 : start + 14)
      .replace(/\s+/g, " ");
    const passed =
      /0 ERROS\s*0 AVISOS/.test(summary) && !/[1-9]\d* ERROS/.test(summary);
    results.push({ path, passed, summary });
    console.log(
      `${passed ? "OK" : "REVISAR"} ${path}: ${summary.slice(0, 130)}`,
    );
    if (["/", "/sobre", "/servicos/sistemas-sob-medida"].includes(path)) {
      await page.screenshot({
        path: `reports/schema-${path.replaceAll("/", "-") || "home"}.png`,
      });
    }
    await page.close();
  }
} finally {
  await browser.close();
  await writeFile(
    "reports/schema-validation.json",
    JSON.stringify(
      {
        tool: "Schema Markup Validator",
        checkedAt: new Date().toISOString(),
        baseUrl,
        results,
      },
      null,
      2,
    ),
  );
}
if (results.some((r) => !r.passed)) process.exitCode = 1;
