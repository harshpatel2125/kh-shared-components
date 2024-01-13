import Button, { IButton } from "../button";

export interface TableHeaderProps {
  headerButtons: Array<IButton> | undefined;
  tableSitemap?: string[];
  title?: string;
}

const TableHeader = ({
  headerButtons,
  tableSitemap,
  title,
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
          {headerButtons?.map((btn, i) => (
            <Button
              key={i}
              onClick={btn.onClick}
              color={btn.color}
              icon={btn.icon}
              btnName={btn.btnName}
              className={btn.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
