import "./globals.css";

import { Inter } from "next/font/google";
import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import { HeroUIProvider } from "@heroui/system";
import Header from "@/components/Header";
import { settings } from "@/components/client";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  icons: {
    icon: settings.data.logo.url,
    shortcut: settings.data.logo.url,
    apple: settings.data.logo.url,
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" className={inter.variable}>
      <body className="overflow-x-hidden antialiased">
      <HeroUIProvider>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <PrismicPreview repositoryName={repositoryName} />
      </HeroUIProvider>
      </body>
    </html>
  );
}