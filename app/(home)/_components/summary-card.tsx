import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddTransaction,
}: SummaryCardProps) => {
  // const width = useWindowSize();

  return (
    <Card
      className={`${size === "large" ? "flex w-[90%] flex-row bg-white bg-opacity-5 sm:block sm:w-full sm:flex-col" : "w-[30%] sm:w-auto"}`}
    >
      <CardHeader className="flex-row items-center gap-4">
        <div className="hidden sm:block">{icon}</div>
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent
        className={`${size === "large" ? "flex-wrap p-6 sm:flex-row sm:pt-0" : "flex-row p-0 sm:p-6 sm:pt-0"} flex justify-between`}
      >
        <p
          className={`${size === "small" ? "text-base sm:text-2xl" : "text-xl sm:text-4xl"} font-bold`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;

// const useWindowSize = () => {
//   return window.innerWidth > 768;
// };
