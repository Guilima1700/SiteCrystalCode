import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PAGES } from "../app/data/content";
import { absoluteUrl, SITE } from "../app/lib/site";

for (const route of PAGES) {
  test(`HTML, metadados, semântica e JSON-LD: ${route.path}`, async ({
    browser,
    request,
  }) => {
    const response = await request.get(route.path);
    expect(response.status()).toBe(200);
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["x-frame-options"]).toBe("DENY");
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:3100${route.path}`);
    await expect(page).toHaveTitle(`${route.title} | CrystalCode`);
    if (route.path === "/") {
      await expect(page).toHaveTitle(/Crystal Code.*Aracaju.*CrystalCode/);
    }
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      new URL(
        (await page.locator('link[rel="canonical"]').getAttribute("href")) ??
          "",
      ).href,
    ).toBe(absoluteUrl(route.path));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      route.description,
    );
    const robotTags = await page
      .locator('meta[name="robots"]')
      .evaluateAll((tags) => tags.map((t) => t.getAttribute("content")));
    expect(robotTags.some((r) => r?.includes("noindex"))).toBe(false);
    expect(
      new URL(
        (await page
          .locator('meta[property="og:url"]')
          .getAttribute("content")) ?? "",
      ).href,
    ).toBe(absoluteUrl(route.path));
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      "pt_BR",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(
      page.locator('meta[property="og:image"]').first(),
    ).toHaveAttribute("content", /^https:\/\/crystalcode\.com\.br\//);
    const levels = await page
      .locator("h1,h2,h3,h4,h5,h6")
      .evaluateAll((headings) => headings.map((h) => Number(h.tagName[1])));
    for (let i = 1; i < levels.length; i++)
      expect(levels[i]).toBeLessThanOrEqual(levels[i - 1] + 1);
    const graphs = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const nodes: Record<string, unknown>[] = [];
    for (const json of graphs) {
      const parsed = JSON.parse(json);
      expect(parsed["@context"]).toBe("https://schema.org");
      nodes.push(...parsed["@graph"]);
    }
    expect(nodes.find((n) => n["@type"] === "Organization")?.email).toBe(
      SITE.email,
    );
    for (const type of ["Organization", "WebSite"]) {
      expect(nodes.find((n) => n["@type"] === type)).toMatchObject({
        name: "CrystalCode",
        alternateName: "Crystal Code",
      });
    }
    if (["/", "/sobre"].includes(route.path)) {
      await expect(page.locator("main")).toContainText(
        "CrystalCode (Crystal Code)",
      );
    }
    expect(nodes.some((n) => n["@type"] === "WebSite")).toBe(true);
    if (route.path !== "/")
      expect(nodes.some((n) => n["@type"] === "BreadcrumbList")).toBe(true);
    if (route.path.startsWith("/servicos/")) {
      expect(nodes.find((n) => n["@type"] === "Service")?.url).toBe(
        absoluteUrl(route.path),
      );
    }
    for (const node of nodes) {
      expect(node).not.toHaveProperty("aggregateRating");
      expect(node).not.toHaveProperty("address");
    }
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((l) => l.getAttribute("href")!))) {
      expect(PAGES.some((p) => p.path === href.split("#")[0])).toBe(true);
    }
    await context.close();
  });
}

test("sitemap, robots e llms refletem apenas as páginas públicas", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("xml");
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(urls.sort()).toEqual(PAGES.map((p) => absoluteUrl(p.path)).sort());
  expect(new Set(urls).size).toBe(urls.length);
  expect(xml).not.toContain("<lastmod>");
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  const rules = await robots.text();
  expect(rules).toContain("User-Agent: *");
  expect(rules).toContain("Allow: /");
  expect(rules).not.toContain("Disallow:");
  expect(rules).toContain("Sitemap: https://crystalcode.com.br/sitemap.xml");
  const llms = await request.get("/llms.txt");
  expect(llms.status()).toBe(200);
  const content = await llms.text();
  for (const page of PAGES) expect(content).toContain(absoluteUrl(page.path));
});

test("404 real para URLs desconhecidas, serviços inválidos e arquivos internos", async ({
  page,
  request,
}) => {
  for (const path of [
    "/nao-existe-seo",
    "/servicos/nao-existe",
    "/sobre/nao-existe",
    "/.env",
    "/zip.zip",
    "/app/zip.zip",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
  await page.goto("/nao-existe-seo");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Página não encontrada",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await page.getByRole("link", { name: "Voltar à página inicial" }).click();
  await expect(page).toHaveURL("http://127.0.0.1:3100/");
});

test("301 de domínio/protocolo conserva caminho e query, sem loop", async ({
  request,
}) => {
  const variants: Record<string, string>[] = [
    { host: "www.crystalcode.com.br" },
    { host: "site-crystal-code.vercel.app" },
    { host: "crystalcode.com.br", "x-forwarded-proto": "http" },
  ];
  for (const headers of variants) {
    const response = await request.get(
      "/servicos/sistemas-sob-medida?origem=teste",
      { headers, maxRedirects: 0 },
    );
    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe(
      "https://crystalcode.com.br/servicos/sistemas-sob-medida?origem=teste",
    );
  }
  const canonical = await request.get("/servicos/sistemas-sob-medida", {
    headers: { host: "crystalcode.com.br", "x-forwarded-proto": "https" },
    maxRedirects: 0,
  });
  expect(canonical.status()).toBe(200);
  const trailingSlash = await request.get("/sobre/", { maxRedirects: 0 });
  expect(trailingSlash.status()).toBe(308);
  expect(trailingSlash.headers().location).toBe("/sobre");
});

for (const width of [390, 1440]) {
  test(`layout e acessibilidade em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of [
      "/",
      "/servicos",
      "/sobre",
      "/projetos",
      "/contato",
      "/privacidade",
      "/servicos/sistemas-sob-medida",
      "/nao-existe-seo",
    ]) {
      await page.goto(path);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(300);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path,
      ).toBe(true);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        path,
      ).toEqual([]);
      for (const image of await page.locator("img:visible").all()) {
        expect(await image.getAttribute("alt")).not.toBeNull();
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (img) =>
                (img as HTMLImageElement).complete &&
                (img as HTMLImageElement).naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
    }
    await page.screenshot({
      path: `test-results/404-${width}.png`,
      fullPage: true,
    });
    await page.goto("/");
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
  });
}

test("FAQ, navegação e carrossel continuam funcionais", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .getByRole("link", { name: "Conhecer nossas soluções", exact: true })
    .click();
  await expect(page).toHaveURL(/#solucoes$/);
  await page
    .getByText("A CrystalCode desenvolve apenas sites?", { exact: true })
    .click();
  await expect(page.locator("details[open]")).toHaveCount(1);
  const track = page.getByRole("region", { name: "Projetos desenvolvidos" });
  await track.scrollIntoViewIfNeeded();
  await page
    .getByRole("button", { name: "Próximo projeto", exact: true })
    .click();
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(100);
  await page
    .getByRole("button", { name: "Projeto anterior", exact: true })
    .click();
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeLessThan(10);
  expect(errors).toEqual([]);
});

test("imagens otimizadas e identidade pública estão acessíveis", async ({
  request,
}) => {
  for (const path of [
    "/favicon.ico",
    "/brand/icon-32.png",
    "/brand/icon-192.png",
    "/brand/icon-512.png",
    "/brand/apple-touch-icon.png",
    "/opengraph-image",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/");
  }
  const image = await request.get("/_next/image?url=%2Flindos.png&w=640&q=75", {
    headers: { accept: "image/avif,image/webp" },
  });
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toMatch(/image\/(avif|webp)/);
  expect((await image.body()).byteLength).toBeLessThan(748575 / 2);
});
