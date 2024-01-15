import FilterIcon from "@/assets/icons/FilterIcon";
import Button, { IButton, IButtonType } from "../button";
import Drawer from "../drawer";

export interface TableHeaderProps {
  headerButtons?: Array<IButton> | undefined;
  tableSitemap?: string[];
  title?: string;
  handleCreateNew?: () => any;
  handleFormSubmission?: (data: any) => any;
  handleGoBack?: () => any;
  drawerId?: string;
  showFilterBtn?: boolean;
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
      <div className={`table-header w-full`}>
        <h4 className="font-normal text-sm ">{title}</h4>
        <div className="flex items-center gap-2">
          <p>
            {tableSitemap?.map((text, i) => (
              <span
                key={i}
                className=" cursor-pointer w-max font-normal text-sm"
              >
                {text} /{" "}
              </span>
            ))}
          </p>
          <div className="flex gap-3 ms-3 items-center">
            {headerButtons?.map((btn, i) => {
              if (btn?.btnType === IButtonType.Filter && showFilterBtn) {
                return (
                  <>
                    <div className=" bg-tertiary drawer-content flex items-center justify-center  w-[28px] h-[28px] rounded-full hover:bg-tertiary-dark">
                      <label htmlFor={drawerId} className="cursor-pointer">
                        <FilterIcon width={14} height={14} color="white" />
                      </label>
                    </div>
                  </>
                );
              }

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
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableHeader;
