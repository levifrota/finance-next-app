"use client";

import { DataTable } from "@/app/_components/ui/data-table";
import { TransactionsList } from "./mobile-transaction-element";
import { transactionColumns } from "../_columns";
import { ScrollBar } from "@/app/_components/ui/scroll-area";
import { isMobile } from "@/app/_utils/isMobile";

interface ClientComponentProps {
  transactions: any[];
}

const ClientComponent: React.FC<ClientComponentProps> = ({ transactions }) => {
  const windowSize = isMobile();
  return windowSize ? (
    <TransactionsList transactions={transactions} />
  ) : (
    <div>
      <DataTable
        columns={transactionColumns}
        data={JSON.parse(JSON.stringify(transactions))}
      />
      <ScrollBar orientation="horizontal" />
    </div>
  );
};

export default ClientComponent;
