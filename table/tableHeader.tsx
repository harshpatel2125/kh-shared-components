import React from "react";
import FilterIcon from "@/assets/icons/FilterIcon";
import Button, { IButton, IButtonType } from "../button";
import Drawer from "../drawer";
import AscendingIcon from "@/assets/icons/ascending.svg";
import DescendingIcon from "@/assets/icons/descending.svg";
import Image from "next/image";

export interface TableHeaderProps {
  headerButtons?: Array<IButton> | undefined;
  tableSitemap?: string[];
  title?: string;
  handleCreateNew?: () => any;
  handleFormSubmission?: (data: any) => any;
  handleGoBack?: () => any;
  drawerId?: string;
  showFilterBtn?: boolean;
  showSortIcon?: boolean; // Controls visibility in table header
  handleSort?: (order: "asc" | "desc") => void;
}

const TableHeader = ({
  headerButtons,
  tableSitemap,
  title,
  handleCreateNew,
  handleFormSubmission,
  handleGoBack,
  drawerId,
  showFilterBtn,
  showSortIcon = true, // Default to true if not provided
  handleSort,
}: TableHeaderProps) => {
  const getClickHandler = (btn: any) => {
    const clickHandlerFunc =
      btn?.btnType === IButtonType.CreateNew
        ? handleCreateNew
        : btn?.btnType === IButtonType.FormSubmit
        ? handleFormSubmission
        : btn?.btnType === IButtonType.GoBack
        ? handleGoBack
        : btn?.onClick;
    return clickHandlerFunc;
  };

  return (
    <>
      <style jsx>{`
        .white-icon {
          filter: invert(100%) brightness(1000%);
        }
      `}</style>

      <div className={`table-header w-full`}>
        <h4 className="font-normal text-sm ">{title}</h4>
        <div className="flex items-center gap-2">
          <div className="flex gap-3 ms-3 items-center">
            {/* Ascending Button in Table Header */}
            {showSortIcon && (
              <button
                className="bg-tertiary drawer-content flex items-center justify-center w-[28px] h-[28px] rounded-full hover:bg-tertiary-dark"
                onClick={() => handleSort && handleSort("asc")}
                data-tip="Ascending"
              >
                <Image
                  src={AscendingIcon}
                  alt="Ascending Icon"
                  width={20}
                  height={20}
                  className="white-icon"
                />
              </button>
            )}

            {/* Descending Button in Table Header */}
            {showSortIcon && (
              <button
                className="bg-tertiary drawer-content flex items-center justify-center w-[28px] h-[28px] rounded-full hover:bg-tertiary-dark"
                onClick={() => handleSort && handleSort("desc")}
                data-tip="Descending"
              >
                <Image
                  src={DescendingIcon}
                  alt="Descending Icon"
                  width={20}
                  height={20}
                  className="white-icon"
                />
              </button>
            )}

            {showFilterBtn && (
              <div className="bg-tertiary drawer-content flex items-center justify-center w-[28px] h-[28px] rounded-full hover:bg-tertiary-dark">
                <label htmlFor={drawerId} className="cursor-pointer">
                  <FilterIcon width={14} height={14} color="white" />
                </label>
              </div>
            )}

            {/* Other Buttons */}
            {headerButtons?.map((btn, i) => {
              if (btn?.btnType === IButtonType.Filter) {
                return null; // Skip the predefined Filter button
              } else {
                const clickHandlerFunc = getClickHandler(btn);

                return (
                  <Button
                    key={i}
                    onClick={clickHandlerFunc}
                    color={btn.color}
                    icon={btn.icon}
                    btnName={btn.btnName}
                    className={btn.className}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableHeader;
