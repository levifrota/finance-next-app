"use client";

import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon, UserPenIcon } from "lucide-react";
import AuthRedirectWrapper from "../_components/auth-redirect-wrapper";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    console.log("userId", userId);

    if (userId) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="h-full sm:grid sm:grid-cols-2">
      <AuthRedirectWrapper>
        <div className="absolute z-10 flex h-full max-w-[550px] flex-col justify-center p-8 sm:relative">
          <Image
            src="/logo.svg"
            width={173}
            height={39}
            alt="Poupa aí"
            className="mb-8"
          />

          <h1 className="mb-3 text-4xl font-bold">Bem Vindo(a)!</h1>

          <p className="text-muted-accent mb-8">
            A Poupa.ai é uma plataforma de gestão financeira que utiliza IA para
            monitorar suas movimentações, e oferecer insights personalizados,
            facilitando o controle do seu orçamento.
          </p>

          <Button
            variant="outline"
            className="w-52 self-center border border-slate-400 hover:bg-primary hover:text-black"
            asChild
          >
            <Link href="/sign-in">
              <LogInIcon className="mr-2" />
              Fazer Login
            </Link>
          </Button>

          <Button
            variant="outline"
            className="mt-2 w-52 self-center border border-slate-400 hover:bg-primary hover:text-black"
            asChild
          >
            <Link href="/sign-up">
              <UserPenIcon className="mr-2" />
              Criar Conta
            </Link>
          </Button>
        </div>

        <div className="relative h-full w-full opacity-25 sm:opacity-100">
          <Image
            src="/login.png"
            alt="Faça o Login"
            fill
            className="object-cover"
          />
        </div>
      </AuthRedirectWrapper>
    </div>
  );
};

export default LoginPage;
