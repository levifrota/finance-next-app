"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
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
      <div className="flex w-[100%] flex-row items-center gap-10 md:w-auto">
        <Image
          className="self-start md:self-auto"
          src="/logo.svg"
          width={173}
          height={39}
          alt="Poupa Aí"
        />
        <div className="hidden gap-6 sm:flex">
          <Link href="/" className={linkClasses("/")}>
            Painel
          </Link>
          <Link href="/transactions" className={linkClasses("/transactions")}>
            Transações
          </Link>
          <Link href="/subscription" className={linkClasses("/subscription")}>
            Assinatura
          </Link>
          <Link href="/settings" className={linkClasses("/settings")}>
            Configurações
          </Link>
        </div>
      </div>

      <div className="absolute right-0 top-[4%] hidden h-[10%] sm:relative sm:right-auto sm:top-auto sm:block sm:h-auto">
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
              <UserButton showName />
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
            <DropdownMenuItem asChild>
              <Link href="/settings" className={linkClasses("/settings")}>
                Configurações
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
