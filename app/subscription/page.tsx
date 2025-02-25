import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";
import dynamic from "next/dynamic";
import { ScrollArea } from "../_components/ui/scroll-area";

const ScreenWrapper = dynamic(
  () => import("@/app/_components/screen-wrapper"),
  { ssr: false },
);

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const currentMonthTransactions = await getCurrentMonthTransactions();

  const user = await clerkClient().users.getUser(userId);

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <Navbar />
      <ScrollArea>
        <div className="flex flex-col flex-wrap content-center items-center space-y-6 p-6 sm:block">
          <h1 className="text-2xl font-bold">Assinatura</h1>

          <div className="flex w-[90%] flex-col gap-6 sm:w-auto sm:flex-row">
            <Card className="sm:w-[450px]">
              <CardHeader className="border-b border-solid py-8">
                <h2 className="text-center text-2xl font-semibold">
                  Plano Básico
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="text-6xl font-semibold">0</span>
                  <span className="text-2xl text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 py-8">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>
                    Apenas 20 transações por mês (
                    <span className="text-primary">
                      {currentMonthTransactions}
                    </span>
                    /20)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <XIcon />
                  <p>Apenas 1 Relatório de IA por mês </p>
                </div>
              </CardContent>
            </Card>

            <Card className="sm:w-[450px]">
              <CardHeader className="relative border-b border-solid py-8">
                {hasPremiumPlan && (
                  <Badge className="absolute left-4 top-4 bg-primary/10 text-primary hover:bg-primary/10 sm:top-12">
                    Ativo
                  </Badge>
                )}
                <h2 className="text-center text-2xl font-semibold">
                  Plano Premium
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="text-6xl font-semibold">9</span>
                  <span className="text-2xl text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 py-8">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>Transações ilimitadas</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="text-primary" />
                  <p>Relatórios de IA</p>
                </div>
                <AcquirePlanButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
      <ScreenWrapper />
    </>
  );
};

export default SubscriptionPage;
