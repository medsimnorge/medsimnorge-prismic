'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { asText, asLink } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { SettingsDocument, NavigationDocument } from "../../prismicio-types";

interface HeaderProps {
  settings: SettingsDocument;
  navigation: NavigationDocument;
}

export default function Header({ settings, navigation }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Lukk menyen ved klikk utenfor
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Lukk menyen ved navigering
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  // Hjelpefunksjon for å sjekke om lenken er aktiv
  const isActiveLink = (linkUrl: string) => {
    // Håndter hjemmeside (/) spesielt
    if (linkUrl === '/' && pathname === '/') {
      return true;
    }
    // For andre sider, sjekk om pathname starter med linkUrl (for å håndtere nested routes)
    if (linkUrl !== '/' && pathname.startsWith(linkUrl)) {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* Skip-link for skjermlesere */}
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Hopp til hovedinnhold
      </Link>

      <header className="sticky top-0 bg-background z-50 py-4 md:py-6">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex items-center justify-between">
            {/* Logo og tittel */}
            <div className="flex items-center">
              <PrismicNextImage field={settings.data.logo} width={100} height={100} />
              <span className="ml-4 font-bold text-2xl">{asText(settings.data.siteTitle)}</span>
            </div>

            {/* Desktop Nav Meny */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigation.data?.links.map((item, index) => {
                    const linkUrl = asLink(item.link);
                    if (!linkUrl) return null;
                    const isActive = isActiveLink(linkUrl);
                    
                    return (
                      <NavigationMenuItem key={index}>
                          <NavigationMenuLink
                            asChild
                            className={cn(
                              navigationMenuTriggerStyle(),
                              isActive && "bg-accent text-accent-foreground"
                            )}
                            data-active={isActive}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <Link href={linkUrl}>
                              {asText(item.label)}
                            </Link>
                          </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobil meny knapp */}
            <div className="md:hidden">
              <Button 
                ref={buttonRef}
                id="menu-btn" 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="focus:outline-none"
                variant="ghost"
                size="sm"
              >
                ☰
              </Button>
            </div>
          </div>

          {/* Mobil meny overlay */}
          <div 
            ref={menuRef}
            className={`fixed inset-0 top-18 bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navigation.data?.links.map((item, index) => {
                const linkUrl = asLink(item.link);
                if (!linkUrl) return null;
                const isActive = isActiveLink(linkUrl);
                
                return (
                  <Link 
                    key={index}
                    href={linkUrl} 
                    className={cn(
                      "text-xl font-medium transition-colors duration-200 hover:text-secondary",
                      isActive && "text-secondary font-semibold"
                    )}
                    onClick={handleNavigation}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {asText(item.label)}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}