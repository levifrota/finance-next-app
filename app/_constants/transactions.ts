import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: "Educação",
  FOOD: "Alimentação",
  HOUSING: "Moradia",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
  HEALTH: "Saúde",
  ENTERTAINMENT: "Entretenimento",
  OTHER: "Outros",
  SALARY: "Salário",
};

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  CREDIT_CARD: "Cartão de crédito",
  DEBIT_CARD: "Cartão de débito",
  CASH: "Dinheiro",
  PIX: "PIX",
  BANK_TRANSFER: "Transferência bancária",
  OTHER: "Outros",
  BANK_SLIP: "Boleto bancário",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    label: "Despesa",
    value: TransactionType.EXPENSE,
  },
  {
    label: "Depósito",
    value: TransactionType.DEPOSIT,
  },
  {
    label: "Investimento",
    value: TransactionType.INVESTMENT,
  },
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
    value: TransactionPaymentMethod.CASH,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
    value: TransactionPaymentMethod.CREDIT_CARD,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
    value: TransactionPaymentMethod.DEBIT_CARD,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
    value: TransactionPaymentMethod.BANK_TRANSFER,
  },
  {
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
    value: TransactionPaymentMethod.BANK_SLIP,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
    value: TransactionPaymentMethod.PIX,
  },
  {
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
    value: TransactionPaymentMethod.OTHER,
  },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.EDUCATION],
    value: TransactionCategory.EDUCATION,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.ENTERTAINMENT],
    value: TransactionCategory.ENTERTAINMENT,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FOOD],
    value: TransactionCategory.FOOD,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HEALTH],
    value: TransactionCategory.HEALTH,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOUSING],
    value: TransactionCategory.HOUSING,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.TRANSPORTATION],
    value: TransactionCategory.TRANSPORTATION,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
    value: TransactionCategory.SALARY,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.UTILITY],
    value: TransactionCategory.UTILITY,
  },
  {
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
    value: TransactionCategory.OTHER,
  },
];
