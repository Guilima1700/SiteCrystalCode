import { test, expect, type BrowserContext, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { SITE } from "../app/lib/site";
import { ANALYTICS_CONSENT_KEY } from "../app/lib/analytics-consent";

const ID = SITE.googleAnalyticsId;
const ORIGIN = SITE.url;

async function localProduction(context: BrowserContext) {
  const tagRequests: string[] = [];
  // Keep the official hostname in the browser, but serve the local build.
  // Google requests are mocked; no test traffic reaches the real GA property.
  await context.route(/^https:\/\//, async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === ORIGIN) {
      const response = await route.fetch({
        url: `http://127.0.0.1:3100${url.pathname}${url.search}`,
        headers: {
          ...route.request().headers(),
          host: "127.0.0.1:3100",
          "x-forwarded-proto": "http",
        },
        maxRedirects: 0,
      });
      return route.fulfill({ response });
    }
    if (
      url.hostname === "www.googletagmanager.com" &&
      url.pathname === "/gtag/js"
    ) {
      tagRequests.push(url.toString());
      return route.fulfill({
        contentType: "application/javascript",
        body: `document.cookie='_ga=GA1.1.test; path=/; Secure; SameSite=Lax'; document.cookie='_ga_${ID.slice(2)}=GS1.1.test; path=/; domain=crystalcode.com.br; Secure; SameSite=Lax';`,
      });
    }
    return route.abort();
  });
  return tagRequests;
}

async function commands(page: Page) {
  return page.evaluate(() =>
    (window.dataLayer ?? []).map((entry) => Array.from(entry)),
  );
}
async function pageViews(page: Page) {
  return (await commands(page)).filter(
    (entry) => entry[0] === "event" && entry[1] === "page_view",
  );
}

test("Analytics desativado no hostname de desenvolvimento", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("region", { name: "Preferências de cookies" }),
  ).toHaveCount(0);
  await expect(page.locator("#crystalcode-ga4-tag")).toHaveCount(0);
  expect(await commands(page)).toEqual([]);
});

test("Sem consentimento, não carrega Google; preferência é acessível no mobile", async ({
  page,
  context,
}) => {
  const requests = await localProduction(context);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(ORIGIN);
  await expect(
    page.getByRole("region", { name: "Preferências de cookies" }),
  ).toBeVisible();
  expect(requests).toHaveLength(0);
  expect(await commands(page)).toEqual([]);
  expect((await context.cookies()).some((c) => c.name.startsWith("_ga"))).toBe(
    false,
  );
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations.map((v) => v.id)).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "test-results/analytics-consent-mobile.png" });
});

test("Recusa persiste sem tag, cookies nem eventos", async ({
  page,
  context,
}) => {
  const requests = await localProduction(context);
  await page.goto(ORIGIN);
  await page
    .getByRole("button", { name: "Recusar medição", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Preferências de cookies", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("region", { name: "Preferências de cookies" }),
  ).toHaveCount(0);
  expect(requests).toHaveLength(0);
  expect(await commands(page)).toEqual([]);
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).choice,
      ANALYTICS_CONSENT_KEY,
    ),
  ).toBe("denied");
});

test("Aceite configura o ID uma vez e mede navegação sem duplicar nem enviar query", async ({
  page,
  context,
}) => {
  const requests = await localProduction(context);
  await page.goto(
    `${ORIGIN}/?email=visitante%40example.com&token=privado#inicio`,
  );
  await page
    .getByRole("button", { name: "Permitir medição", exact: true })
    .click();
  await expect.poll(() => requests.length).toBe(1);
  await expect.poll(async () => (await pageViews(page)).length).toBe(1);
  const queue = await commands(page);
  expect(queue[0]).toEqual([
    "consent",
    "default",
    {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
  ]);
  expect(queue.find((e) => e[0] === "config")).toEqual([
    "config",
    ID,
    expect.objectContaining({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    }),
  ]);
  expect(JSON.stringify(queue)).not.toContain("visitante");
  expect(JSON.stringify(queue)).not.toContain("token");
  await page
    .getByRole("link", { name: "Contato · Aracaju, Sergipe", exact: true })
    .click();
  await expect(page).toHaveURL(`${ORIGIN}/contato`);
  await expect.poll(async () => (await pageViews(page)).length).toBe(2);
  expect((await pageViews(page))[1][2]).toMatchObject({
    page_location: `${ORIGIN}/contato`,
    page_referrer: `${ORIGIN}/`,
  });
  expect((await commands(page)).filter((e) => e[0] === "config")).toHaveLength(
    1,
  );
  expect(requests).toHaveLength(1);
  await page.goBack();
  await expect.poll(async () => (await pageViews(page)).length).toBe(3);
});

test("Contato registra só o canal, sem mensagem nem URL completa", async ({
  page,
  context,
}) => {
  await localProduction(context);
  await page.goto(`${ORIGIN}/contato`);
  await page
    .getByRole("button", { name: "Permitir medição", exact: true })
    .click();
  await expect.poll(async () => (await pageViews(page)).length).toBe(1);
  for (const [selector, method] of [
    ['a[href^="https://api.whatsapp.com/"]', "whatsapp"],
    ['a[href^="mailto:"]', "email"],
    ['a[href^="https://www.instagram.com/"]', "instagram"],
  ]) {
    // Prevent navigation; dispatch a normal click through the app's listener.
    await page
      .locator(selector)
      .first()
      .evaluate((link) =>
        link.addEventListener("click", (e) => e.preventDefault(), {
          once: true,
        }),
      );
    await page.locator(selector).first().click();
    const events = (await commands(page)).filter(
      (e) => e[0] === "event" && e[1] === "contact_click",
    );
    expect(events.at(-1)?.[2]).toEqual(
      expect.objectContaining({
        contact_method: method,
        page_location: `${ORIGIN}/contato`,
      }),
    );
    expect(JSON.stringify(events)).not.toMatch(
      /phone=|text=|mailto:|gmail\.com/,
    );
  }
});

test("Revogação interrompe medição e remove cookies GA", async ({
  page,
  context,
}) => {
  const requests = await localProduction(context);
  await page.goto(ORIGIN);
  await page
    .getByRole("button", { name: "Permitir medição", exact: true })
    .click();
  await expect
    .poll(
      async () =>
        (await context.cookies()).filter((c) => c.name.startsWith("_ga"))
          .length,
    )
    .toBe(2);
  await page
    .getByRole("button", { name: "Preferências de cookies", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Recusar medição", exact: true })
    .click();
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], ID)).toBe(
    true,
  );
  expect((await context.cookies()).some((c) => c.name.startsWith("_ga"))).toBe(
    false,
  );
  const count = (await pageViews(page)).length;
  await page
    .getByRole("link", { name: "Contato · Aracaju, Sergipe", exact: true })
    .click();
  await expect(page).toHaveURL(`${ORIGIN}/contato`);
  expect(await pageViews(page)).toHaveLength(count);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Preferências de cookies", exact: true }),
  ).toBeVisible();
  expect(requests).toHaveLength(1);
  expect(await commands(page)).toEqual([]);
});

test("Preferência expirada solicita nova decisão", async ({
  page,
  context,
}) => {
  const requests = await localProduction(context);
  await page.addInitScript(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify({ choice: "granted", expiresAt: Date.now() - 1 }),
      ),
    ANALYTICS_CONSENT_KEY,
  );
  await page.goto(ORIGIN);
  await expect(
    page.getByRole("region", { name: "Preferências de cookies" }),
  ).toBeVisible();
  expect(requests).toHaveLength(0);
});

test("Preferência funciona quando o navegador bloqueia armazenamento", async ({
  page,
  context,
}) => {
  const requests = await localProduction(context);
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("blocked", "SecurityError");
    };
  });
  await page.goto(ORIGIN);
  await page
    .getByRole("button", { name: "Permitir medição", exact: true })
    .click();
  await expect.poll(() => requests.length).toBe(1);
  await page
    .getByRole("button", { name: "Preferências de cookies", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Recusar medição", exact: true })
    .click();
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], ID)).toBe(
    true,
  );
});
