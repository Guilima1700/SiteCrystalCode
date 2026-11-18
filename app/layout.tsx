import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SITE } from "./lib/site";
import { GoogleAnalytics } from "./components/google-analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? SITE.googleAnalyticsId;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "CrystalCode | Desenvolvimento de software sob medida",
    template: "%s | CrystalCode",
  },
  description: SITE.description,
  applicationName: SITE.name,
  icons: {
    icon: [
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      {
        url: "/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};
export const viewport: Viewport = {
  themeColor: "#0c1e28",
  colorScheme: "dark",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${inter.variable}`}>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
        {process.env.NODE_ENV === "production" &&
          process.env.VERCEL_ENV !== "preview" &&
          /^G-[A-Z0-9]{4,}$/.test(measurementId) && (
            <GoogleAnalytics measurementId={measurementId} />
          )}
      </body>
    </html>
  );
}
