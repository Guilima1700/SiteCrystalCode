import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrystalCode | Agência de Desenvolvimento Web",
  description: "Transformamos sua visão em realidade digital. Sites de alta performance, design exclusivo e tecnologia de ponta.",
  
  openGraph: {
    title: "CrystalCode - Web Design Premium",
    description: "Sites que convertem visitantes em clientes. Agende sua consultoria.",
    url: "https://site-crystal-code.vercel.app/",
    siteName: "CrystalCode",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "CrystalCode Preview",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CrystalCode - Web Design Premium",
    description: "Transformamos sua visão em realidade digital.",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}