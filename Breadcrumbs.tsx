"use client";
import React, { useEffect, useState } from "react";
import Subtitle from "./Subtitle";
import { usePathname, useRouter } from "next/navigation";
import TabList from "./TabList";
import TabTwo from "./TabList/TabTwo";

interface BreadcrumbsProps {
  children: any;
  hideDivider?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children, hideDivider }) => {
  const pathname = usePathname();
  const router = useRouter();
  const breads = pathname && pathname?.split("/");

  return (
    <div className={"card w-full "}>
      <div className='px-3 flex justify-between align-middle h-fit '>
        <div className=''>
          {/* <Tabs /> */}
          <TabTwo />
        </div>
        <div className=' mt-1 '>
          <Subtitle styleClass={"text-[#48a4f9] pl-3"}>
            <div className='text-sm breadcrumbs pt-1 pb-0'>
              <ul>
                {breads &&
                  breads?.length > 0 &&
                  breads?.map((ele: any, index: number) => {
                    if (ele && ele !== "") {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            if (index === 1 && breads?.length > 2) {
                              router.push(`/${ele}`);
                            } else if (index === 2 && breads?.length > 3) {
                              router.back();
                            }
                          }}
                          className=' capitalize text-slate-700 font-[300]  text-xs '
                        >
                          {index === breads?.length - 1 ? ele?.split("-")?.join(" ") : <a>{ele?.split("-")?.join(" ")}</a>}
                        </li>
                      );
                    } else return null;
                  })}
              </ul>
            </div>
          </Subtitle>
        </div>
      </div>
      {/* ----- commented bottom divider line ------ */}
      {/* {!hideDivider ? (
        <>
          <div className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50"></div>
        </>
      ) : (
        <div className="mt-5"></div>
      )} */}
      <div></div>
      <div className='px-3 h-full w-full  '>{children}</div>
    </div>
  );
};

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [tabs, setTabs] = useState<string[]>([]);

  // Fetch tabs from localStorage when component mounts
  useEffect(() => {
    const storedTabsString = localStorage.getItem("");
    const storedTabs = storedTabsString ? JSON.parse(storedTabsString) : [];
    setTabs(storedTabs);
    console.log("tabssss", storedTabs);
  }, []);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Render other content as needed */}
      <TabList
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Breadcrumbs;
