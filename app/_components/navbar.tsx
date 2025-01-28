"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  function linkClasses(href: string) {
    return pathname === href
      ? "font-bold text-primary"
      : "text-muted-foreground";
  }

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Poupa Aí" />
        <div className="hidden gap-6 md:flex">
          <Link href="/" className={linkClasses("/")}>
            Painel
          </Link>
          <Link href="/transactions" className={linkClasses("/transactions")}>
            Transações
          </Link>
          <Link href="/subscription" className={linkClasses("/subscription")}>
            Assinatura
          </Link>
        </div>
      </div>

      <div className="hidden md:block">
        <UserButton showName />
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <div className="flex w-full justify-center py-2">
                <UserButton showName />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/" className={linkClasses("/")}>
                Painel
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/transactions"
                className={linkClasses("/transactions")}
              >
                Transações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/subscription"
                className={linkClasses("/subscription")}
              >
                Assinatura
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
