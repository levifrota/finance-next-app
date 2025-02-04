"use client";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/app/_components/ui/menubar";
import { UserButton } from "@clerk/nextjs";
import {
  ArrowLeftRight,
  CalendarSync,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  function linkClasses(href: string) {
    return pathname === href
      ? "font-bold text-primary"
      : "text-muted-foreground";
  }

  return (
    <Menubar className="relative bottom-0 flex h-16 w-full justify-around">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/" className={linkClasses("/")}>
            <LayoutDashboard />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/transactions" className={linkClasses("/transactions")}>
            <ArrowLeftRight />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/subscription" className={linkClasses("/subscription")}>
            <CalendarSync />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/settings" className={linkClasses("/settings")}>
            <Settings />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <UserButton />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default Footer;
