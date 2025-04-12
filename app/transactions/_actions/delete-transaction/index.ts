"use server";

import { firestoreAdmin } from "@/app/_lib/firebaseAdmin";
import { revalidatePath } from "next/cache";
import { DeleteTransactionSchema } from "./schema";
import { auth } from "@clerk/nextjs/server";

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchema) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await firestoreAdmin
    .collection("users")
    .doc(userId)
    .collection("transactions")
    .doc(transactionId)
    .delete();

  revalidatePath("/transactions");
  revalidatePath("/");
};
