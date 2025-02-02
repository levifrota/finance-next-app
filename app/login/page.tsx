import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  revalidatePath("/login");

  return (
    <div className="h-full sm:grid sm:grid-cols-2">
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

        <SignInButton forceRedirectUrl="/?month=01">
          <Button variant="outline" className="border border-slate-400">
            <LogInIcon className="mr-2" />
            Fazer Login ou Criar Conta
          </Button>
        </SignInButton>
      </div>

      <div className="relative h-full w-full opacity-25 sm:opacity-100">
        <Image
          src="/login.png"
          alt="Faça o Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
