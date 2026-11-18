"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PAGES } from "../data/content";
import { absoluteUrl, SITE } from "../lib/site";
import {
  clearAnalyticsCookies,
  getAnalyticsConsent,
  getServerAnalyticsConsent,
  saveAnalyticsConsent,
  subscribeAnalyticsConsent,
} from "../lib/analytics-consent";

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

function pageDetails(pathname: string) {
  const page = PAGES.find((item) => item.path === pathname);
  return {
    page_location: absoluteUrl(page?.path ?? "/404"),
    page_title: page
      ? `${page.title} | ${SITE.name}`
      : "Página não encontrada | CrystalCode",
  };
}

function initialReferrer() {
  if (!document.referrer) return "";
  try {
    const url = new URL(document.referrer);
    if (
      url.origin === SITE.url &&
      PAGES.some((page) => page.path === url.pathname)
    )
      return absoluteUrl(url.pathname);
    return `${url.origin}/`;
  } catch {
    return "";
  }
}

function stopAnalytics(measurementId: string) {
  window[`ga-disable-${measurementId}`] = true;
  window.gtag?.("consent", "update", DENIED);
  clearAnalyticsCookies();
}

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
    getServerAnalyticsConsent,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const initialized = useRef(false);
  const active = useRef(false);
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    if (consent === "unavailable") return;
    if (consent !== "granted") {
      stopAnalytics(measurementId);
      active.current = false;
      lastPage.current = null;
      return;
    }

    window[`ga-disable-${measurementId}`] = false;
    window.dataLayer ??= [];
    window.gtag ??= function () {
      // Preserve the command queue format documented by Google's gtag.js snippet.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    const details = pageDetails(pathname);
    if (!initialized.current) {
      // Basic consent mode: no Google tag or requests before acceptance.
      window.gtag("consent", "default", DENIED);
      window.gtag("consent", "update", {
        ...DENIED,
        analytics_storage: "granted",
      });
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        ...details,
      });
      initialized.current = true;
    } else if (!active.current) {
      window.gtag("consent", "update", {
        ...DENIED,
        analytics_storage: "granted",
      });
    }
    active.current = true;

    if (lastPage.current !== details.page_location) {
      const page_referrer = lastPage.current ?? initialReferrer();
      window.gtag("set", { ...details, page_referrer });
      window.gtag("event", "page_view", {
        send_to: measurementId,
        ...details,
        page_referrer,
      });
      lastPage.current = details.page_location;
    }

    if (!document.getElementById("crystalcode-ga4-tag")) {
      const script = document.createElement("script");
      script.id = "crystalcode-ga4-tag";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      // Insertion occurs after hydration, consent and ordered initialization.
      document.head.appendChild(script);
    }
  }, [consent, measurementId, pathname]);

  useEffect(() => {
    const trackContact = (event: MouseEvent) => {
      if (
        getAnalyticsConsent() !== "granted" ||
        !active.current ||
        !(event.target instanceof Element)
      )
        return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, SITE.url);
      let contactMethod: string | undefined;
      if (["api.whatsapp.com", "wa.me"].includes(url.hostname))
        contactMethod = "whatsapp";
      else if (
        url.protocol === "mailto:" &&
        url.pathname.toLowerCase() === SITE.email
      )
        contactMethod = "email";
      else if (
        url.hostname === "www.instagram.com" &&
        url.pathname.replace(/\/$/, "") === "/crystallcode"
      )
        contactMethod = "instagram";
      if (!contactMethod) return;
      // Never send the full contact URL, WhatsApp message or visitor input.
      window.gtag?.("event", "contact_click", {
        send_to: measurementId,
        contact_method: contactMethod,
        ...pageDetails(pathname),
      });
    };
    document.addEventListener("click", trackContact);
    return () => document.removeEventListener("click", trackContact);
  }, [measurementId, pathname]);

  if (consent === "unavailable") return null;
  const showPreferences = consent === "unset" || preferencesOpen;
  const choose = (choice: "granted" | "denied") => {
    if (choice === "denied") stopAnalytics(measurementId);
    saveAnalyticsConsent(choice);
    setPreferencesOpen(false);
  };

  return showPreferences ? (
    <section
      className="analytics-preferences"
      aria-label="Preferências de cookies"
    >
      <h2>Sua privacidade</h2>
      <p>
        Podemos usar cookies do Google Analytics para entender as visitas e os
        cliques de contato? A medição só começa se você permitir.
      </p>
      <details>
        <summary>Como funciona a medição?</summary>
        <p>
          Registramos páginas visitadas e o tipo de canal de contato clicado.
          Você pode mudar sua escolha em “Preferências de cookies”. A
          preferência fica salva neste navegador por até 180 dias.
        </p>
        <a
          href="https://policies.google.com/technologies/partner-sites?hl=pt-BR"
          target="_blank"
          rel="noopener noreferrer"
        >
          Como o Google usa os dados{" "}
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </details>
      <Link href="/privacidade">Privacidade e cookies da CrystalCode</Link>
      <div className="analytics-actions">
        <button type="button" onClick={() => choose("denied")}>
          Recusar medição
        </button>
        <button type="button" onClick={() => choose("granted")}>
          Permitir medição
        </button>
      </div>
      {consent !== "unset" && (
        <button
          className="analytics-close"
          type="button"
          onClick={() => setPreferencesOpen(false)}
        >
          Fechar preferências
        </button>
      )}
    </section>
  ) : (
    <button
      className="analytics-open"
      type="button"
      onClick={() => setPreferencesOpen(true)}
    >
      Preferências de cookies
    </button>
  );
}
