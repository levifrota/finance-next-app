import type { Metadata, Viewport } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ptBR } from "@clerk/localizations";
import { Toaster } from "sonner";
import { FontSizeProvider } from "@/app/_context/font-size-context";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

const APP_NAME = "Poupa.ai";
const APP_DEFAULT_TITLE = "Poupa.ai";
const APP_TITLE_TEMPLATE = "%s - Poupa.ai";
const APP_DESCRIPTION = "Finanças acessíveis para todos!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${mulish.className} dark antialiased`}>
        <FontSizeProvider>
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
          <Toaster />
        </FontSizeProvider>
      </body>
    </html>
  );
}
