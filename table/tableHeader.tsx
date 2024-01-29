"use client";
import React from "react";
import Button, { IButton, IButtonType } from "../button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

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

const TableHeader = ({ headerButtons, tableSitemap, title, handleCreateNew, handleFormSubmission, handleGoBack, drawerId, showFilterBtn, handleSort }: TableHeaderProps) => {
  const router = useRouter();
  const getClickHandler = (btn: any) => {
    //button type will be from IButtontype enum only
    switch (btn?.btnType) {
      case IButtonType.CreateNew:
        return handleCreateNew;
      case IButtonType.FormSubmit:
        return handleFormSubmission;
      case IButtonType.GoBack:
        return handleGoBack;
      case IButtonType.sortAsc:
        return handleSort;
      case IButtonType.sortDesc:
        return handleSort;
      case IButtonType.approve:
        return () => console.log("handle callback for approve");
      case IButtonType.reject:
        return () => console.log("handle callback for reject");
      case IButtonType.purchase_order_checklist:
        return () => router.push(ROUTES.purchaseOrderChecklist);

      default:
        return btn?.onClick;
    }
  };

  return (
    <>
      <style jsx>{`
        .white-icon {
          filter: invert(100%) brightness(1000%);
        }
      `}</style>

      <div className={`rounded table-header  mb-1 text-white flex justify-between items-center p-1  bg-gray-600  w-full`}>
        <h4 className='ml-1 text-sm font-semibold  '>{title}</h4>
        <div className='flex items-center gap-2'>
          <div className='flex gap-1  items-center'>
            {/* Other Buttons */}

            {headerButtons?.map((btn, i) => {
              const clickHandlerFunc = getClickHandler(btn);

              if (btn?.btnType === IButtonType.Filter) {
                if (showFilterBtn) {
                  return (
                    <label
                      htmlFor={drawerId}
                      className='mr-2 cursor-pointer'
                      key={i}
                    >
                      {btn.icon}
                    </label>
                  );
                }
              } else {
                return (
                  <>
                    <Button
                      key={i}
                      icon={btn.icon}
                      onClick={() => (clickHandlerFunc ? clickHandlerFunc(btn.btnType) : null)}
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
