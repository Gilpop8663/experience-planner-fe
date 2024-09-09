import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  activeTab: number;
  index: number;
}

export default function TabContent({ children, activeTab, index }: Props) {
  return (
    <div className={`${activeTab === index ? "block" : "hidden"}`}>
      {children}
    </div>
  );
}
