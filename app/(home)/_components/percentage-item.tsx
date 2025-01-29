import { ReactNode } from "react";

interface PrecentageItemProps {
  value: number;
  title: string;
  icon: ReactNode;
}

const PercentageItem = ({ title, value, icon }: PrecentageItemProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};

export default PercentageItem;
