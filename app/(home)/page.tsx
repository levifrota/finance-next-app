import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "../_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=0${new Date().getMonth() + 1}`);
  }

  const dashboard = await getDashboard(month);
  return (
    <>
      <Navbar />

      <div className="flex flex-col space-y-6 p-6 sm:overflow-hidden">
        <div className="flex justify-between">
          <h1 className="py-2 text-2xl font-bold md:py-0">Painel</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[2fr,1fr] sm:overflow-hidden">
          <div className="flex flex-col gap-6 sm:overflow-hidden">
            <SummaryCards month={month} {...dashboard} />

            <div className="grid h-[80vh] grid-cols-1 gap-6 sm:h-auto sm:grid-cols-3 sm:grid-rows-1">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
