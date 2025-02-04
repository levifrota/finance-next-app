import { ReactNode } from "react";

interface PercentageItemProps {
  value: number;
  title: string;
  icon: ReactNode;
}

const PercentageItem = ({ title, value, icon }: PercentageItemProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex-shrink-0 rounded-lg bg-white bg-opacity-[3%] p-2">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-muted-foreground sm:text-sm">
          {title}
        </p>
      </div>

      <p className="flex-shrink-0 text-xs font-bold sm:text-sm">{value}%</p>
    </div>
  );
};

export default PercentageItem;
