interface TabsProps {
  tabs: string[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

export default function Tabs({ tabs, activeTab, onTabClick }: TabsProps) {
  return (
    <div className="flex space-x-4">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabClick(index)}
          className={`w-full py-2 px-0 font-bold text-xs md:text-sm lg:text-base whitespace-break-spaces ${
            activeTab === index
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
