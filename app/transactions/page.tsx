import { ArrowDownUpIcon } from "lucide-react";
import { db } from "../_lib/prisma";
import { Button } from "../components/ui/button";
import { DataTable } from "../components/ui/data-table";
import { transactionColumns } from "./_columns";

const Transactions = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          <ArrowDownUpIcon />
          Adicionar Transação
        </Button>
      </div>

      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default Transactions;
