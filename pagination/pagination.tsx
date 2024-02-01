import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import clsx from "clsx";
import React from "react";

interface PaginationProps {
  pages: number;
  activePage?: number;
  onPageChange?: any;
}

const Pagination: React.FC<PaginationProps> = ({ pages = 1, activePage = 1, onPageChange = () => {} }) => {
  return (
    <div className='flex gap-1'>
      <button
        className='rounded-full cursor-pointer  '
        onClick={() => onPageChange(1)}
      >
        <LeftArrowIcon className='stroke-[#505050] hover:stroke-[#ffffff] bg-transparent hover:bg-[#309BFF] rounded-full' />
      </button>

      {Array.from(Array(pages)).map((_, iDx) => (
        <button
          className={clsx("rounded-full border-[1px] border-[#505050] hover:bg-[#309BFF] hover:text-white px-[18px] hover:border-transparent text-[18px]", iDx + 1 === activePage ? "btn-active text-[#ffffff] bg-[#309BFF]" : "bg-transparent text-[#505050]")}
          key={iDx}
          onClick={() => onPageChange(iDx + 1)}
        >
          {iDx + 1}
        </button>
      ))}
      <button
        className='rounded-full cursor-pointer '
        onClick={() => onPageChange(pages)}
      >
        <RightArrowIcon className='stroke-[#505050] hover:stroke-[#ffffff] bg-transparent hover:bg-[#309BFF] rounded-full' />
      </button>
    </div>
  );
};

export default Pagination;
