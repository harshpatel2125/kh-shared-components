import React from "react";
import FilterIcon from "@/assets/icons/FilterIcon";
import Button, { IButton, IButtonType } from "../button";
import Drawer from "../drawer";
import AscendingIcon from "@/assets/icons/ascending.svg";
import DescendingIcon from "@/assets/icons/descending.svg";
import Image from "next/image";
import Buttons from "../ButtonGroup/Button";
import UpArrowIcon from "@/assets/icons/UpArrowIcon";
import DownArrowIcon from "@/assets/icons/DownArrowIcon";

export interface TableHeaderProps {
  headerButtons?: Array<IButton> | undefined;
  tableSitemap?: string[];
  title?: string;
  handleCreateNew?: () => any;
  handleFormSubmission?: (data: any) => any;
  handleGoBack?: () => any;
  drawerId?: string;
  showFilterBtn?: boolean;
  showSortButtons?: boolean; // Controls visibility in table header
  handleSort?: (sortType: any) => any;
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
  showSortButtons, // Default to true if not provided
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
        : btn?.btnType === IButtonType.sortAsc
        ? handleSort
        : btn?.btnType === IButtonType.sortAsc
        ? handleSort
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

      <div
        className={`table-header rounded mb-2 text-white flex justify-between items-center p-2 py-1  bg-slate-700 w-full`}
      >
        <h4 className="font-normal text-sm ">{title}</h4>
        <div className="flex items-center gap-2">
          <div className="flex gap-3 ms-3 items-center">
            {/* Other Buttons */}

            {headerButtons?.map((btn, i) => {
              const clickHandlerFunc = getClickHandler(btn);
              console.log(
                btn.btnType == IButtonType.sortAsc ||
                  btn.btnType == IButtonType.sortDesc
                  ? clickHandlerFunc
                  : "no"
              );

              if (btn?.btnType === IButtonType.Filter && showFilterBtn) {
                return (
                  <label
                    htmlFor={drawerId}
                    className="font-light text-xs pt-1 pb-1 min-h-5 h-5 leading-none btn btn-xs btn-outine"
                    key={i}
                  >
                    <FilterIcon height="14" width="14" color="#000" />
                  </label>
                );
              } else if (
                (btn?.btnType === IButtonType.sortAsc ||
                  btn?.btnType === IButtonType.sortDesc) &&
                showSortButtons
              ) {
                return (
                  <Buttons
                    key={i}
                    onClick={() => clickHandlerFunc(btn.btnType)}
                    btnSize=""
                    icon={btn.icon}
                    label={btn.btnName}
                    btnVariant="btn  btn-xs "
                  />
                );
              } else {
                return (
                  <Buttons
                    key={i}
                    onClick={clickHandlerFunc}
                    btnSize=""
                    // color={btn.color}
                    icon={btn.icon}
                    // btnName={btn.btnName}
                    label={btn.btnName}
                    btnVariant="btn  btn-xs "
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
