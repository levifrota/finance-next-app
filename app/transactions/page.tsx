// Transactions.tsx (ou page.tsx)
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import dynamic from "next/dynamic";
import ClientComponent from "./_components/client-component";
const ScreenWrapper = dynamic(
  () => import("@/app/_components/screen-wrapper"),
  { ssr: false },
);

const Transactions = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full flex-col items-center justify-between md:flex-row">
          <h1 className="py-2 text-2xl font-bold md:py-0">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        <ScrollArea className="h-full">
          <ClientComponent transactions={transactions} />
        </ScrollArea>
      </div>
      <ScreenWrapper />
    </>
  );
};

export default Transactions;
