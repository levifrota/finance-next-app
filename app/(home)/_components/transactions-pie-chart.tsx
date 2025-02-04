"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { TransactionType } from "@prisma/client";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55802E",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  expensesTotal: number;
  investmentsTotal: number;
}

const TransactionsPieChart = ({
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55802E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className="flex flex-col p-3 sm:p-6">
      <CardContent className="flex-1 overflow-hidden pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="flex w-full flex-col gap-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            value={typesPercentage[TransactionType.DEPOSIT] || 0}
            title="Receita"
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            value={typesPercentage[TransactionType.EXPENSE] || 0}
            title="Despesa"
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            value={typesPercentage[TransactionType.INVESTMENT] || 0}
            title="Investido"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
