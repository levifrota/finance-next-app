"use server";

import { firestoreAdmin } from "@/app/_lib/firebaseAdmin"; // Firebase Admin SDK
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: string; // Ajuste para o tipo que você utiliza (por exemplo, "DEPOSIT", "EXPENSE", "INVESTMENT")
  category: string; // Ex: "FOOD", "HOUSING", etc.
  paymentMethod: string; // Ex: "CASH", "CREDIT_CARD", etc.
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  // Valida os parâmetros conforme seu schema
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Define os dados da transação, adicionando timestamps
  const transactionData = {
    ...params,
    userId,
    updatedAt: new Date(),
    // Se o documento for novo, crie createdAt; em atualizações com merge,
    // você pode optar por não sobrescrever se já existir
    createdAt: new Date(),
  };

  // Obtém a referência para a subcoleção de transações do usuário
  const transactionsRef = firestoreAdmin
    .collection("users")
    .doc(userId)
    .collection("transactions");

  let docRef;
  if (params.id) {
    // Se o ID for informado, usa o documento correspondente
    docRef = transactionsRef.doc(params.id);
  } else {
    // Caso contrário, cria um novo documento com ID auto-gerado
    docRef = transactionsRef.doc();
  }

  // Realiza o "upsert" usando set com merge: true
  await docRef.set(transactionData, { merge: true });

  // Revalida a rota para atualizar o cache
  revalidatePath("/transactions");
};
