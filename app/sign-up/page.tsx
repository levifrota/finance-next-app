"use client";

import React, { useState } from "react";

import { useSignUp } from "@clerk/nextjs";
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
import Image from "next/image";

function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
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
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  return (
    <div className="flex h-full sm:grid sm:grid-cols-2">
      <div className="absolute z-10 flex h-full w-full max-w-[550px] flex-col justify-center p-8 sm:relative sm:w-auto">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Poupa aí"
          className="mb-8"
        />
        <Card className="w-full max-w-md bg-black bg-opacity-60 sm:bg-opacity-0 sm:bg-auto">
          <CardHeader>
            <CardTitle className="test-2xl text-center font-bold">
              Criar Conta
            </CardTitle>
            <CardContent className="p-0 sm:p-6">
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
                    Criar Conta
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
            <CardFooter className="justify-center p-3 sm:p-6">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-primary hover:underline"
                >
                  Entrar
                </Link>
              </p>
            </CardFooter>
          </CardHeader>
        </Card>
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
}

export default SignUp;
