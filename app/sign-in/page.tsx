"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { Label } from "../_components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "../_components/ui/alert";
import Link from "next/link";

function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      // Cria a tentativa de sign in usando email e senha
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // Se o sign in estiver completo, ativa a sessão e redireciona
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else if (result.status === "needs_second_factor") {
        // Se for necessário um segundo fator, exibe o formulário de verificação
        setPendingVerification(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      // Para fluxos com senha, se for exigido fator, use attemptSecondFactor
      const completeSignIn = await signIn.attemptSecondFactor({
        strategy: "totp",
        code,
      });

      if (completeSignIn.status !== "complete") {
        console.log(JSON.stringify(completeSignIn, null, 2));
      }

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="test-2xl text-center font-bold">
            Entrar na Conta
          </CardTitle>
          <CardContent>
            {!pendingVerification ? (
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  Entrar na Conta
                </Button>
              </form>
            ) : (
              <form onSubmit={onPressVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código de Verificação</Label>
                  <Input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Digite o código enviado para o seu email"
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  Verificar Email
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Criar Conta
              </Link>
            </p>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}

export default SignIn;
