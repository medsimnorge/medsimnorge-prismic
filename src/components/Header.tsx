'use client';

import { Bounded } from "./Bounded";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@heroui/navbar";
import Link from "next/link";
import { asText, asLink } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import React from "react";
import { settings, navigation } from "./client";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
      <Bounded as="header" yPadding="sm" className="sticky top-0">
        <Navbar onMenuOpenChange={setIsMenuOpen}
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
    >
      <NavbarBrand>
        <PrismicNextImage field={settings.data.logo} width={100} height={100} />
        <span className="ml-4 font-bold text-2xl">{asText(settings.data.siteTitle)}</span>
      </NavbarBrand>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Lukk" : "Åpne meny"}
          className="sm:hidden"
        />
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {navigation.data?.links.map((item, index) => {
            const linkUrl = asLink(item.link);
            if (!linkUrl) return null;
            return (
                <NavbarItem key={index}>
                    <Link href={linkUrl}>
                        {asText(item.label)}
                    </Link>
                </NavbarItem>
            );
        })}
      </NavbarContent>
      <NavbarMenu>
        {navigation.data?.links.map((item, index) => {
          const linkUrl = asLink(item.link);
          if (!linkUrl) return null;
          return (
            <NavbarMenuItem key={index}>
            <Link className="w-full" href={linkUrl}>
              {asText(item.label)}
            </Link>
          </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
    </Bounded>
    );
  }