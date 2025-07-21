import { db } from "@/app/_lib/prisma";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { TransactionType } from "@prisma/client";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient().users.getUser(userId);

  const year = 2025;
  const m = parseInt(month);
  const nextMonth = m === 12 ? 1 : m + 1;
  const nextYear = m === 12 ? year + 1 : year;

  const where = {
    userId,
    date: {
      gte: new Date(year, m - 1, 1),
      lt: new Date(nextYear, nextMonth - 1, 1),
    },
  };

  const transactions = await db.transaction.findMany({
    where,
    orderBy: {
      date: "desc",
    },
  });

  const depositsTotal = transactions
    .filter((t) => t.type === "DEPOSIT")
    .reduce((acc, t) => acc + t.amount, 0);

  const investmentsTotal = transactions
    .filter((t) => t.type === "INVESTMENT")
    .reduce((acc, t) => acc + t.amount, 0);

  const expensesTotal = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const transactionsTotal =
    depositsTotal + investmentsTotal + expensesTotal;

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = Object.values(
    transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce(
        (acc, t) => {
          if (!acc[t.category]) {
            acc[t.category] = {
              category: t.category,
              totalAmount: 0,
              percentageOfTotal: 0,
            };
          }
          acc[t.category].totalAmount += t.amount;
          return acc;
        },
        {} as Record<string, TotalExpensePerCategory>,
      ),
  ).map((category) => ({
    ...category,
    percentageOfTotal: Math.round(
      (category.totalAmount / expensesTotal) * 100,
    ),
  }));

  const lastTransactions = transactions.slice(0, 10);

  return {
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
    user,
  };
};
