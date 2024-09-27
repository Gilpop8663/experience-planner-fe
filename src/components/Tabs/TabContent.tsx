import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  activeTab: number;
  index: number;
}

export default function TabContent({ children, activeTab, index }: Props) {
  return (
    <div
      className={cn(
        `${activeTab === index ? "block" : "hidden"}`,
        "text-xs sm:text-sm md:text-base",
      )}
    >
      {children}
    </div>
  );
}
