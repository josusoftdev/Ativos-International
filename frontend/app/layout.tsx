import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ativos International - Dashboard de Criptomoedas",
  description:
    "Acompanhe o mercado cripto, gerencie carteiras e fique por dentro das noticias em um unico lugar.",
  keywords: ["crypto", "criptomoedas", "bitcoin", "carteira", "investimento"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="gradient-mesh min-h-full antialiased">{children}</body>
    </html>
  );
}
