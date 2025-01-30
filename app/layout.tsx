import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ptBR } from "@clerk/localizations";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Poupa.ai",
  description: "O seu painel de gestão financeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider
          localization={ptBR}
          appearance={{
            baseTheme: dark,
          }}
        >
          <div className="flex h-full flex-col sm:overflow-hidden">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
