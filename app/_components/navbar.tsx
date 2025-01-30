"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  function linkClasses(href: string) {
    return pathname === href
      ? "font-bold text-primary"
      : "text-muted-foreground";
  }

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex w-[100%] flex-col items-center gap-10 md:w-auto md:flex-row">
        <Image
          className="self-start md:self-auto"
          src="/logo.svg"
          width={173}
          height={39}
          alt="Poupa Aí"
        />
        <div className="flex gap-6">
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
      <div className="absolute right-0 top-[4%] h-[10%] sm:relative sm:right-auto sm:top-auto sm:h-auto">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
