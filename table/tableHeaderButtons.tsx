import FilterIcon from "@/assets/icons/FilterIcon";
import { IButton, IButtonType } from "@/shared/button";
import { PlusIcon } from "@heroicons/react/24/outline";

const buttonClass: string = " px-2";
const filterButtonClass: string = " p-2";

interface headerButtonTypes {
  save: IButton;
  new: IButton;
  filter: IButton;
  back: IButton;
}

export const HEADER_BUTTONS: headerButtonTypes = {
  save: {
    btnName: "Save",
    color: "tertiary",
    // icon: <FilterIcon height={12} width={12} color="#fff" />,
    className: buttonClass,
    btnType: IButtonType.FormSubmit,
  },
  new: {
    btnName: "New",
    color: "tertiary",
    icon: <PlusIcon className="h-3 w-3" />,
    className: buttonClass,
    btnType: IButtonType.CreateNew,
  },

  filter: {
    btnName: "",
    color: "tertiary",
    icon: <FilterIcon height={12} width={12} color="#fff" />,
    className: filterButtonClass,
    btnType: IButtonType.Filter,
  },
  back: {
    btnName: "Back",
    color: "tertiary",
    // icon: <PlusIcon className="h-3 w-3" />,
    className: buttonClass,
    btnType: IButtonType.GoBack,
  },
};
