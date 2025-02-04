"use client";

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
      <div className="flex w-[100%] flex-row justify-center gap-10 md:w-auto md:items-center">
        <Image
          className="self-center md:self-auto"
          src="/logo.svg"
          width={173}
          height={39}
          alt="Poupa Aí"
        />
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
          <Link href="/settings" className={linkClasses("/settings")}>
            Configurações
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
