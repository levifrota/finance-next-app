import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { ScrollBar } from "@/app/_components/ui/scroll-area";

interface SummaryCards {
  month: string;
  balance: number;
  investmentsTotal: number;
  expensesTotal: number;
  depositsTotal: number;
  userCanAddTransaction: boolean;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  userCanAddTransaction,
}: SummaryCards) => {
  return (
    <div className="w-100% flex flex-col items-center space-y-6 sm:block">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title={"Saldo"}
        amount={balance}
        size={"large"}
        userCanAddTransaction={userCanAddTransaction}
      />
      <div className="grid max-w-[100%] grid-cols-[50%_50%] gap-3 sm:grid-cols-3 sm:gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} className="text-primary" />}
          title={"Investido"}
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title={"Despesas"}
          amount={expensesTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} />}
          title={"Receita"}
          amount={depositsTotal}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </div>
  );
};

export default SummaryCards;
