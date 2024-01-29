"use client";
import CloseIcon from "@/assets/icons/CloseIcon";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TabTwo: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const existingPathsString = getLocalStorage("clickedPaths");
  const [existingPaths, setExistingPaths] = useState(existingPathsString ? JSON.parse(existingPathsString) : []);

  useEffect(() => {
    // ----- Function to fetch existing paths from local storage
    const fetchExistingPaths = () => {
      const existingPathsString = getLocalStorage("clickedPaths");
      setExistingPaths(existingPathsString ? JSON.parse(existingPathsString) : []);
    };

    // -------- Fetch existing paths whenever pathname changes
    fetchExistingPaths();
  }, [pathname]);

  const handlePath = (path: string) => {
    router.push(path);
  };

  const handleDelete = (index: number) => {
    const updatedPaths = [...existingPaths];
    updatedPaths.splice(index, 1);

    setExistingPaths(updatedPaths);
    setLocalStorage("clickedPaths", JSON.stringify(updatedPaths));
  };

  return (
    <div className='flex gap-1 mb-1'>
      {existingPaths?.map((path: any, index: number) => (
        <div
          key={index}
          className={`flex gap-3  text-[10px] font-light ${pathname === path.pathname ? "text-white bg-slate-600" : "text-slate-700"} px-2 rounded py-0.5 border border-slate-300`}
        >
          <button
            className=' '
            onClick={() => handlePath(path.pathname)}
          >
            {path.title}
          </button>
          <span
            onClick={() => handleDelete(index)}
            className='cursor-pointer  mt-1'
          >
            <CloseIcon
              color={`  ${pathname === path.pathname ? "#fff" : "#000"}`}
              width='8'
              height='8'
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default TabTwo;
