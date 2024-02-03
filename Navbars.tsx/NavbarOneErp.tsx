"use client";
import React, { useState } from "react";
import { LocalStorageUtils, getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { usePathname, useRouter } from "next/navigation";
// import local icons //
import AlertIcon from "@/assets/icons/AlertIcon";
import NotificationIcon from "@/assets/icons/NotificationIcon";
import CheckNoteIcon from "@/assets/icons/CheckNoteIcon";
import RoundedToolIcon from "@/assets/icons/RoundedToolIcon";
import SearchBar from "@/shared/form/globalSearch/SearchBar";
import NotificationBadge, { BadgeUI } from "@/shared/ButtonGroup/NotificationBadge";
import { Auth } from "@/api";
import Link from "next/link";
import DownArrowIcon from "@/assets/icons/DownArrowIcon";
import DownArrowBorder from "@/assets/icons/DownArrow";
import CustomSearchBar from "@/shared/form/globalSearch/CustomSearchBar";
import SupportIcon from "@/assets/icons/SupportIcon";
import TicketIcon from "@/assets/icons/ticketIcon";
import ClipBoardIcon from "@/assets/icons/ClipBoard";
import CustomSelect from "@/shared/select/customSelect";

const tabsList = ["Leather Article", "Leather Species", "Leather Portion", "Leather Substance", "Leather Selection", "Type of Selection"];

const settingList = ["Module", "Functions", "Process", "Page", "Company", "Factory"];
const selectData = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
// -------- icons --------
const iconButtonConfig = [
  {
    badgeComponent: <BadgeUI notificationCount={12} />,
    icon: (
      <NotificationIcon
        width='16'
        height='16'
      />
    ),
    notificationCount: 3,
    tooltip: "notification",
  },
  {
    badgeComponent: <BadgeUI notificationCount={3} />,
    icon: (
      <AlertIcon
        width='15'
        height='15'
      />
    ),
    notificationCount: 3,
    tooltip: "alert",
  },
  {
    badgeComponent: <BadgeUI notificationCount={8} />,
    icon: (
      <ClipBoardIcon
        width='15'
        height='15'
      />
    ),
    notificationCount: 3,
    tooltip: "approval",
  },

  {
    badgeComponent: <BadgeUI notificationCount={5} />,
    icon: (
      <CheckNoteIcon
        width='15'
        height='15'
      />
    ),
    notificationCount: 3,
    tooltip: "tasks",
  },

  // {
  //   icon: (
  //     <TicketIcon
  //       width='16'
  //       height='16'
  //       color='#000'
  //     />
  //   ),
  //   tooltip: "ticket",
  // },
];

interface UserData {
  UserName: string;
  // Add other properties as needed
}

const NavbarOneErp: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [selected, setSelected] = React.useState<number>(1);
  const [SignInUserRights, setSignInUserRights] = React.useState<any>();
  const [userName, setUserName] = useState<UserData | null>(null);
  React.useEffect(() => {
    const listenStorageChange = () => {
      const userInfoString = localStorage.getItem(LocalStorageUtils.userInfo);
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        setUserName(userInfo);
      } else {
        console.log("UserInfo is not set in localStorage");
      }

      const localSelected: any = getLocalStorage(LocalStorageUtils.activeRights) ? parseInt(getLocalStorage(LocalStorageUtils.activeRights)) : 1;
      setSelected(parseInt(localSelected));
      const signInUserRights = getLocalStorage(LocalStorageUtils.signInUserRights) ? JSON.parse(getLocalStorage(LocalStorageUtils.signInUserRights)) : [];
      setSignInUserRights(signInUserRights);
    };
    listenStorageChange();
    window.addEventListener("login", listenStorageChange);
    return () => window.removeEventListener("login", listenStorageChange);
  }, []);

  if (pathname.includes("login")) {
    return null;
  }

  const handleChange = (e: any) => {
    setSelected(parseInt(e));
    setLocalStorage(LocalStorageUtils.activeRights, e);
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
    }, 10);
  };

  return (
    <>
      <div className='sticky grid grid-cols-12 py-0.5 h-9 box-shadow-navbar px-4 gap-4 bg-[#e2e2e2] z-10 justify-items-start place-items-center  place-content-evenly w-full'>
        <div className='col-span-4 w-full text-left '>
          <div className='mb-2'>
            {SignInUserRights && Array.isArray(SignInUserRights) && SignInUserRights?.length > 0 && (
              <div style={{ width: "120px" }}>
                <CustomSelect
                  handleChange={handleChange}
                  selected={selected}
                  label=''
                  options={SignInUserRights}
                />
              </div>
            )}
          </div>
        </div>

        {/* --- Global Search Component --- */}
        <div className=' grid  justify-end   col-span-4 w-full align-right'>
          <div className='min-w-96'>
            <CustomSearchBar />
          </div>
        </div>

        <div className=' col-span-4  justify-end align-middle w-full '>
          <div className='flex space-x-7 justify-end align-middle   items-center '>
            <div className='flex space-x-2'>
              {iconButtonConfig.map((config, index) => (
                <NotificationBadge
                  key={index}
                  {...config}
                />
              ))}
            </div>
            <div className='flex justify-end align-middle dropdown dropdown-end'>
              <div className='grid justify-end align-middle '>
                <label
                  tabIndex={0}
                  className='pl-1 box-content  focus:outline-none font-light text-xs  focus:ring-1 focus:ring-[#cbcbcb]  rounded-3xl  avatar'
                >
                  <span className='flex'>
                    <span className='mt-1.5 font-medium text-slate-700'>{userName ? userName?.UserName : "user name"}</span>
                    <DownArrowBorder
                      width='25'
                      height='25'
                    />{" "}
                  </span>
                  <div className='w-7 h-7 rounded-full'>
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/186/186313.png'
                      alt='profile'
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className='menu menu-compact dropdown-content mt-10 shadow bg-slate-100 rounded-box w-72 z-10 text-[13px] '
                >
                  {/* <li>
                  <div className="flex justify-between">
                    <p>FY | 21</p>
                    <p>Themes</p>
                  </div>
                  <div className="flex justify-between items-center ">
                    <p className="ms-0">set as default</p>
                    <div className="flex gap-2">
                      <div className="shadow-md theme-circle theme-dark" />
                      <div className="shadow-md theme-circle theme-red" />
                      <div className="shadow-md theme-circle theme-light" />
                    </div>
                  </div>
                </li> */}
                  <li>
                    <Link href='/my-account'>My Account</Link>
                  </li>
                  <li>
                    <Link href='/change-password'>Change Password</Link>
                  </li>
                  <div className='divider m-0'></div>
                  <li>
                    <button onClick={Auth.logOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* {pathname.includes("settings") && (
					<div className="font-semibold">
						<TabList
							activeTab={activeTab}
							tabs={settingList}
							onTabChange={handleTabChange}
						/>
					</div>
				)}
				{pathname.includes("leather") && (
					<TabList
						activeTab={activeTab}
						tabs={tabsList}
						onTabChange={handleTabChange}
					/>
				)} */}
      </div>
    </>
  );
};

export default NavbarOneErp;
