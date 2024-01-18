import CloseIcon from "@/assets/icons/CloseIcon";
import React from "react";

// Define the props for the TabList component
interface TabListProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// TabList component
const TabList: React.FC<TabListProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div
      role="tablist"
      className="mt-2 bg-[#efefef] tabs tabs-boxed col-span-2"
    >
      {tabs.map((tab, index) => (
        <a
          key={index}
          role="tab"
          className={`h-fit py-0.5 text-xs font-light px-2 tab ${
            tab === activeTab ? "tab-active" : ""
          }`}
          onClick={() => onTabChange(tab)}
          style={{
            // Set styles dynamically based on the active state
            backgroundColor: tab === activeTab ? "#1f6698" : "",
            color:
              tab === activeTab
                ? "your-active-text-color"
                : "your-inactive-text-color",
          }}
        >
          <div className="flex">
            <span
              style={{
                // Set styles dynamically based on the active state
                color: tab === activeTab ? "#fff" : "",
              }}
              className="text-black"
            >
              {tab}{" "}
            </span>
            <span className="ml-3 mt-1">
              <CloseIcon
                stroke={tab === activeTab ? "#fff" : ""}
                width="9"
                height="9"
              />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default TabList;
