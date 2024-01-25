"use client";
import CloseIcon from "@/assets/icons/CloseIcon";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TabTwo: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const existingPathsString = localStorage.getItem("clickedPaths");
  const [existingPaths, setExistingPaths] = useState(existingPathsString ? JSON.parse(existingPathsString) : []);

  useEffect(() => {
    // ----- Function to fetch existing paths from local storage
    const fetchExistingPaths = () => {
      const existingPathsString = localStorage.getItem("clickedPaths");
      setExistingPaths(existingPathsString ? JSON.parse(existingPathsString) : []);
    };

    // -------- Fetch existing paths whenever pathname changes
    fetchExistingPaths();
  }, [pathname]); // -------- This useEffect will run whenever pathname changes

  const handlePath = (path: string) => {
    router.push(path);
  };

  const handleDelete = (index: number) => {
    const updatedPaths = [...existingPaths];
    updatedPaths.splice(index, 1);

    setExistingPaths(updatedPaths);
    localStorage.setItem("clickedPaths", JSON.stringify(updatedPaths));
  };

  return (
    <div className='flex gap-3 mb-1'>
      {existingPaths.map((path: any, index: number) => (
        <div
          key={index}
          className='flex gap-3'
        >
          <button
            className='flex text-xs font-light text-white px-2 rounded py-0.5 bg-slate-600 '
            onClick={() => handlePath(path.pathname)}
          >
            {path.title}
          </button>
          <span
            onClick={() => handleDelete(index)}
            className='cursor-pointer ml-2 mt-1'
          >
            <CloseIcon
              color='#000'
              width='10'
              height='10'
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default TabTwo;
