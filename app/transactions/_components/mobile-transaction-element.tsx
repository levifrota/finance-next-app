"use client";

import { useState } from "react";
import { Transaction } from "@prisma/client";
import TransactionTypeBadge from "../_components/type-badge";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import EditTransactionButton from "../_components/edit-transaction-button";
import DeleteTransactionButton from "../_components/delete-transaction-button";

interface TransactionItemProps {
  transaction: Transaction;
  expanded: boolean;
  onToggle: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  expanded,
  onToggle,
}) => {
  return (
    <div className="bg-gray mb-2 rounded-sm border p-2 shadow-md">
      {!expanded && (
        <div onClick={onToggle}>
          <div className="mb-5 flex cursor-pointer items-center justify-between p-2">
            <TransactionTypeBadge transaction={transaction} />
            <p className="font-semibold">
              {TRANSACTION_CATEGORY_LABELS[transaction.category]}
            </p>
          </div>
          <div className="mb-2 flex cursor-pointer items-center justify-between p-2">
            <p>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(transaction.amount))}
            </p>
            <p>
              {new Date(transaction.date)
                .toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replaceAll("de", "/")
                .replace(".", "")
                .toUpperCase()}
            </p>
          </div>
        </div>
      )}

      {expanded && (
        <div className="bg-gray mb-2 overflow-hidden shadow-md">
          <div
            className="mb-5 flex cursor-pointer items-center justify-between p-2"
            onClick={onToggle}
          >
            <TransactionTypeBadge transaction={transaction} />
            <p>
              {new Date(transaction.date)
                .toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replaceAll("de", "/")
                .replace(".", "")
                .toUpperCase()}
            </p>
          </div>
          <div className="mb-5 p-2">
            <p className="font-semibold">Nome: {transaction.name}</p>
            <p>
              Categoria: {TRANSACTION_CATEGORY_LABELS[transaction.category]}
            </p>
          </div>
          <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>

          <div className="p-2">
            <p>
              Método de Pagamento:{" "}
              {TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]}
            </p>
            <p>
              Valor:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(transaction.amount))}
            </p>
          </div>

          <div className="mt-6 flex w-full justify-evenly space-x-2">
            <EditTransactionButton transaction={transaction} />
            <DeleteTransactionButton transactionId={transaction.id} />
          </div>
        </div>
      )}
    </div>
  );
};

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions = [],
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            expanded={expandedId === transaction.id}
            onToggle={() => handleToggle(transaction.id)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">
          Nenhuma transação encontrada.
        </p>
      )}
    </div>
  );
};
