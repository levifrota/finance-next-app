"use server";

import { firestoreAdmin } from "@/app/_lib/firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea, ScrollBar } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import dynamic from "next/dynamic";

const ScreenWrapper = dynamic(
  () => import("@/app/_components/screen-wrapper"),
  { ssr: false },
);

const Transactions = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  console.log("userId", userId);

  // Consulta os documentos na subcoleção "transactions" para o usuário
  const transactionsRef = firestoreAdmin
    .collection("users")
    .doc(userId)
    .collection("transactions");
  const querySnapshot = await transactionsRef.orderBy("date", "desc").get();

  const transactions = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      date: data.date instanceof Timestamp ? data.date.toDate() : data.date,
    };
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
          <div>
            <DataTable
              columns={transactionColumns}
              data={JSON.parse(JSON.stringify(transactions))}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <ScreenWrapper />
    </>
  );
};

export default Transactions;
