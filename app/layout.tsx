import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "CrystalCode | Sites, Sistemas e Produtos Digitais Sob Medida",
  description:
    "Desenvolvemos sites, sistemas de gestão, plataformas, SaaS e integrações sob medida. Da landing page ao sistema completo, com engenharia de software real.",
  keywords: [
    "desenvolvimento de software",
    "desenvolvimento web",
    "sistemas de gestão",
    "plataformas SaaS",
    "integração de sistemas",
    "desenvolvimento de sites",
  ],

  openGraph: {
    title: "CrystalCode | Sites, Sistemas e Produtos Digitais Sob Medida",
    description:
      "Da landing page ao sistema completo. Desenvolvemos tecnologia sob medida para empresas que querem evoluir.",
    url: "https://site-crystal-code.vercel.app/",
    siteName: "CrystalCode",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "CrystalCode — Sites, sistemas e produtos digitais",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CrystalCode | Sites, Sistemas e Produtos Digitais Sob Medida",
    description:
      "Da landing page ao sistema completo. Tecnologia sob medida para o seu negócio.",
    images: ["/preview.jpg"],
  },

  robots: {
    index: true,
    follow: true,
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