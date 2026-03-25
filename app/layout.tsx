import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ativos International — Dashboard de Criptomoedas",
  description:
    "Acompanhe o mercado cripto, gerencie carteiras e fique por dentro das últimas notícias em um único lugar.",
  keywords: ["crypto", "criptomoedas", "bitcoin", "carteira", "investimento"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} h-full`}>
      <body className="gradient-mesh min-h-full antialiased">{children}</body>
    </html>
  );
}
