"use server";

import { revalidatePath } from "next/cache";
import { DeleteTransactionSchema } from "./schema";
import { db } from "@/app/_lib/prisma";

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchema) => {
  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  revalidatePath("/transactions");
  revalidatePath("/");
};
