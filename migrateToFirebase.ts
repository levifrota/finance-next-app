import { PrismaClient } from "@prisma/client";
import admin from "firebase-admin";
import { firestoreAdmin } from "./app/_lib/firebaseAdmin";

admin.initializeApp({
  credential: admin.credential.cert(firestoreAdmin as admin.ServiceAccount),
});
const firestore = admin.firestore();

const prisma = new PrismaClient();

async function main() {
  const transactions = await prisma.transaction.findMany();

  console.log(`Iniciando migração de ${transactions.length} transações...`);

  for (const t of transactions) {
    const docData = {
      name: t.name,
      type: t.type,
      amount: Number(t.amount),
      category: t.category,
      paymentMethod: t.paymentMethod,
      date: admin.firestore.Timestamp.fromDate(new Date(t.date)),
      createdAt: admin.firestore.Timestamp.fromDate(new Date(t.createdAt)),
      updatedAt: admin.firestore.Timestamp.fromDate(new Date(t.updatedAt)),
    };

    const docRef = firestore
      .collection("users")
      .doc(t.userId)
      .collection("transactions")
      .doc(t.id);

    await docRef.set(docData);
  }

  console.log("Migração concluída com sucesso!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
