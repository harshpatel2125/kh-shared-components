import Button, { IButton, IButtonType } from "../button";

export interface TableHeaderProps {
  headerButtons: Array<IButton> | undefined;
  tableSitemap?: string[];
  title?: string;
  handleCreateNew?: () => any;
  handleFormSubmission?: (data: any) => any;
  handleGoBack?: () => any;
}

const TableHeader = ({
  headerButtons,
  tableSitemap,
  title,
  handleCreateNew,
  handleFormSubmission,
  handleGoBack,
}: TableHeaderProps) => {
  return (
    <div className={`table-header w-full`}>
      <h4 className="font-normal text-sm ">{title}</h4>
      <div className="flex items-center gap-2">
        <p>
          {tableSitemap?.map((text, i) => (
            <span key={i} className=" cursor-pointer w-max font-normal text-sm">
              {text} /{" "}
            </span>
          ))}
        </p>
        <div className="flex gap-3">
          {headerButtons?.map((btn, i) => {
            const clickHandler =
              btn?.btnType === IButtonType.createNew
                ? handleCreateNew
                : btn?.btnType === IButtonType.formSubmit
                ? handleFormSubmission
                : btn?.btnType === IButtonType.goBack
                ? handleGoBack
                : btn.onClick;

            return (
              <Button
                key={i}
                onClick={clickHandler}
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
  );
};

export default TableHeader;
