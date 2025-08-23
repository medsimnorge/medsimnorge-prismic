import "./globals.css";

import { Inter } from "next/font/google";
import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import { HeroUIProvider } from "@heroui/system";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" className={inter.variable}>
      <body className="overflow-x-hidden antialiased">
      <HeroUIProvider>
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </HeroUIProvider>
      </body>
    </html>
  );
}