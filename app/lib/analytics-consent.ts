export const ANALYTICS_CONSENT_KEY = "crystalcode.analytics-consent.v1";
const CONSENT_EVENT = "crystalcode:analytics-consent";
const CONSENT_DURATION = 180 * 24 * 60 * 60 * 1000;

export type AnalyticsConsent = "granted" | "denied" | "unset" | "unavailable";
let memoryChoice: "granted" | "denied" | undefined;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (
    typeof window === "undefined" ||
    window.location.hostname !== "crystalcode.com.br"
  )
    return "unavailable";
  if (memoryChoice) return memoryChoice;
  try {
    const record = JSON.parse(
      localStorage.getItem(ANALYTICS_CONSENT_KEY) || "null",
    );
    if (
      record &&
      (record.choice === "granted" || record.choice === "denied") &&
      typeof record.expiresAt === "number" &&
      record.expiresAt > Date.now()
    )
      return record.choice;
    return "unset";
  } catch {
    return memoryChoice ?? "unset";
  }
}

export function getServerAnalyticsConsent(): AnalyticsConsent {
  return "unavailable";
}

export function saveAnalyticsConsent(choice: "granted" | "denied") {
  try {
    localStorage.setItem(
      ANALYTICS_CONSENT_KEY,
      JSON.stringify({ choice, expiresAt: Date.now() + CONSENT_DURATION }),
    );
    memoryChoice = undefined;
  } catch {
    memoryChoice = choice;
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeAnalyticsConsent(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === ANALYTICS_CONSENT_KEY || event.key === null) listener();
  };
  window.addEventListener(CONSENT_EVENT, listener);
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", listener);
  return () => {
    window.removeEventListener(CONSENT_EVENT, listener);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", listener);
  };
}

export function clearAnalyticsCookies() {
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of [
      "",
      `; domain=${window.location.hostname}`,
      `; domain=.${window.location.hostname}`,
    ]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
    }
  }
}
