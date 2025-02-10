import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "../_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
import { ScrollArea } from "../_components/ui/scroll-area";
import dynamic from "next/dynamic";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const ScreenWrapper = dynamic(
  () => import("@/app/_components/screen-wrapper"),
  { ssr: false },
);

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("userId", userId);
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);

  const userCanAddTransaction = await canUserAddTransaction();

  const user = await clerkClient().users.getUser(userId);
  return (
    <>
      <Navbar />

      <ScrollArea className="m-0 mt-0 flex flex-col sm:m-0 sm:overflow-hidden sm:p-6">
        <div className="m-3 flex flex-col justify-between sm:flex-row">
          <h1 className="self-center py-2 text-2xl font-bold sm:self-auto md:py-0">
            Painel
          </h1>

          <div className="flex flex-row items-center justify-between gap-3 sm:justify-normal">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />

            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,-1fr] gap-6 sm:overflow-hidden lg:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6 sm:overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />

            <div className="grid grid-cols-1 gap-y-6 sm:h-auto sm:grid-rows-1 sm:gap-y-6 md:grid-cols-3 md:gap-6">
              <TransactionsPieChart {...dashboard} />

              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </ScrollArea>
      <ScreenWrapper />
    </>
  );
};

export default Home;
