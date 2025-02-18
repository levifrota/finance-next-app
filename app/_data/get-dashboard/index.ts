import { firestoreAdmin } from "@/app/_lib/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import { Timestamp } from "firebase-admin/firestore";

interface Transaction {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  amount: number;
  category: string;
  date: Date;
  paymentMethod: string;
  [key: string]: string | number | Date | undefined;
}

export const getDashboard = async (month: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const year = 2025;
  const m = parseInt(month);
  const nextMonth = m === 12 ? 1 : m + 1;
  const nextYear = m === 12 ? year + 1 : year;

  const transactionsRef = firestoreAdmin
    .collection("users")
    .doc(userId)
    .collection("transactions");

  const startDate = new Date(year, m - 1, 1);
  const endDate = new Date(nextYear, nextMonth - 1, 1);

  const q = transactionsRef
    .where("date", ">=", startDate)
    .where("date", "<", endDate);

  const snapshot = await q.get();

  const transactions: Transaction[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    const date =
      data.date && data.date instanceof Timestamp
        ? data.date.toDate()
        : (data.date ?? null);
    return {
      id: doc.id,
      type: data.type,
      amount: data.amount,
      category: data.category,
      paymentMethod: data.paymentMethod,
      name: data.name,
      date,
    } as Transaction;
  });

  const depositsTotal = transactions
    .filter((t) => t.type === "DEPOSIT")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const investmentsTotal = transactions
    .filter((t) => t.type === "INVESTMENT")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const expensesTotal = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = transactions.reduce(
    (acc, t) => acc + Number(t.amount || 0),
    0,
  );

  const calcPercentage = (part: number, total: number) =>
    !total ? 0 : Math.round((part / total) * 100);

  const typesPercentage = {
    DEPOSIT: calcPercentage(depositsTotal, transactionsTotal),
    EXPENSE: calcPercentage(expensesTotal, transactionsTotal),
    INVESTMENT: calcPercentage(investmentsTotal, transactionsTotal),
  };

  const expenseTransactions = transactions.filter((t) => t.type === "EXPENSE");
  const categoryMap = new Map<string, number>();
  expenseTransactions.forEach((t) => {
    const category = t.category || "UNKNOWN";
    categoryMap.set(
      category,
      (categoryMap.get(category) || 0) + Number(t.amount || 0),
    );
  });
  const totalExpensePerCategory = Array.from(categoryMap.entries()).map(
    ([category, totalAmount]) => ({
      category,
      totalAmount,
      percentageOfTotal: calcPercentage(totalAmount, expensesTotal),
    }),
  );

  const lastTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return {
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
