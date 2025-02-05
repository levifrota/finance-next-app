"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";
import { generateText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  const groq = createGroq({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.OPENAI_API_KEY,
  });

  generateAiReportSchema.parse({ month });

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient.users.getUser(userId);

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  if (!hasPremiumPlan) {
    throw new Error(
      "Você precisa de um plano premium para gerar relatórios de IA.",
    );
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(`2025-${month}-31`),
      },
    },
  });

  const content = `Estou gerenciando meu orçamento e quero que você gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. Atenção, não precisa explicitar a estrutura. Traduza a categoria para português brasileiro. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  try {
    const { text } = await generateText({
      model: groq("llama-3.2-3b-preview"),
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
        },
        {
          role: "user",
          content,
        },
      ],
    });

    return text;
  } catch (error) {
    console.error("Erro ao chamar a OpenAI:", error);
    throw new Error("A requisição demorou muito tempo ou falhou.");
  }
};
