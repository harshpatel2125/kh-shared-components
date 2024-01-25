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
      className="mt-2 mb-1  bg-none tabs  col-span-2"
    >
      {tabs.map((tab, index) => (
        <a
          key={index}
          role="tab"
    
          className={`h-fit py-0.5 border border-slate-500 rounded mr-1 text-xs font-light px-2 tab ${
            tab === activeTab ? "bg-slate-600" : ""
          }`}
          onClick={() => onTabChange(tab)}
          style={{
            fontSize: "12px",
            // Set styles dynamically based on the active state
            // backgroundColor: tab === activeTab ? "bg-slate-700" : "",
            color:
              tab === activeTab
                ? "your-active-text-color"
                : "your-inactive-text-color",
          }}
        >
          <div className="flex">
            <span
              style={{
                fontSize: "12px",

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
