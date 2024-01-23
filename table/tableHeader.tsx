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
        className={`table-header rounded mb-1 text-white flex justify-between items-center p-1  bg-gray-600  w-full`}
      >
        <h4 className="ml-1 text-sm font-semibold  ">{title}</h4>
        <div className="flex items-center gap-2">
          <div className="flex gap-2 ms-3 items-center">
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
                  <label htmlFor={drawerId} className="mr-2" key={i}>
                    {btn.icon}
                  </label>
                );
              } else {
                return (
                  <>
                    <Button
                      key={i}
                      icon={btn.icon}
                      onClick={() => clickHandlerFunc(btn.btnType)}
                      btnName={btn.btnName}
                      className={btn?.className}
                    />
                  </>
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
