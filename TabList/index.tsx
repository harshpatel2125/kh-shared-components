import React from 'react';

// Define the props for the TabList component
interface TabListProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// TabList component
const TabList: React.FC<TabListProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      {tabs.map((tab, index) => (
        <a
          key={index}
          role="tab"
          className={`tab ${tab === activeTab ? 'tab-active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </a>
      ))}
    </div>
  );
};

export default TabList;
