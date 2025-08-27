import "./globals.css";

import { Inter } from "next/font/google";
import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { AptabaseProvider } from '@aptabase/react';
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");
  
  return {
    icons: {
      icon: settings.data.logo?.url || undefined,
      shortcut: settings.data.logo?.url || undefined,
      apple: settings.data.logo?.url || undefined,
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");
  
  return (
    <html lang="no" className={inter.variable}>
      <body className="overflow-x-hidden antialiased">
        <AptabaseProvider appKey="A-EU-4313739178">
          <Header settings={settings} navigation={navigation} />
          <main id="main-content">
            {children}
          </main>
          <Footer logo={settings.data.logo} siteTitle={settings.data.siteTitle} />
          <PrismicPreview repositoryName={repositoryName} />
        </AptabaseProvider>
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="2245"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}