'use client';

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Avatar, Divider } from "@heroui/react";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";


import { Navbarlogo } from "./NavBarlogo";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";



export const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLogin, setIslogin] = useState(false)
  const [isLogout, setIslogout] = useState(false)
  const pathname = usePathname()
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const handleOut = async () => {
    setIslogout(true)
    await signOut({ redirect: false });
    router.refresh();
    setIslogin(false)
    setIslogout(false)
  }

  useEffect(() => {
    if (status === "authenticated") {
      setIslogin(true)
    }
  }, [session, status])

  return (
    <HeroUINavbar className="shadow-md" maxWidth="xl" position="sticky">
      {/* Hamburger ซ้าย (มือถือ) */}
      <NavbarContent className="xl:hidden basis-1/5" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Logo ตรงกลาง (มือถือ) */}
      <NavbarContent className="xl:hidden flex-1 items-center">
        <Navbarlogo />
      </NavbarContent>

      {/* Avatar ขวา (มือถือ) */}
      <NavbarContent className="sm:hidden basis-1/5 flex justify-end px-0" justify="end">
        <Link href="/user">

          <Avatar size="md" src="/user/avatar.png" />

        </Link>
      </NavbarContent>

      {/* เมนูด้านขวา (Desktop) */}
      <NavbarContent className="hidden sm:flex basis-1/5 justify-end" justify="end">
        <NavbarItem className="flex gap-2 items-center">
          {/*<ThemeSwitch />*/}
          <Avatar size="md" src="/user/avatar.png" />
        </NavbarItem>
      </NavbarContent>


      <NavbarMenu className="flex flex-col justify-between h-full">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {searchInput}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.href ? "primary" : "danger"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>

        <div className="mx-4 mt-4 mb-6">
          {isLogin ? (
            <Button className="w-full" color="danger" onPress={handleOut}>
              ออกจากระบบ
            </Button>
          ) : (
            <Button className="w-full" color="primary" onPress={() => router.push("/signin")}>
              เข้าสู่ระบบ
            </Button>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
