'use client';

import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import { asText } from "@prismicio/client";

interface FooterProps {
  logo: any;
  siteTitle: any;
}

export default function Footer({ logo, siteTitle }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const siteName = asText(siteTitle) || "MedSimNorge";

  return (
    <footer className="bg-gray-800 text-gray-50 border-t border-border py-6 md:py-8">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo og nettstedsnavn */}
          <div className="flex items-center">
            {logo && (
              <PrismicNextImage 
                field={logo} 
                width={60} 
                height={60} 
                className="w-16 h-16 md:w-20 md:h-20"
              />
            )}
            <span className="ml-3 font-bold text-xl md:text-2xl">{siteName}</span>
          </div>

          {/* Copyright og lenker */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm">
            <p>© {currentYear} {siteName}. Nettside av <Link href="https://www.mediweb.no" className="hover:text-gray-100 transition-colors underline-offset-4 hover:underline">MediWeb Solutions</Link></p>
            <div className="flex gap-4">
              <Link 
                href="/personvern" 
                className="hover:text-gray-100 transition-colors underline-offset-4 hover:underline"
              >
                Personvernpolicy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
