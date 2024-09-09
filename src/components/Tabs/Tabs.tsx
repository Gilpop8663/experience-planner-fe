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
          className={`p-3 font-bold ${
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
