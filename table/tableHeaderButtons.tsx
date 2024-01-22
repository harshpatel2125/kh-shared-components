import FilterIcon from "@/assets/icons/FilterIcon";
import { IButton, IButtonType } from "@/shared/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import UpArrowIcon from "@/assets/icons/UpArrowIcon";
import DownArrowIcon from "@/assets/icons/DownArrowIcon";
import SaveIcon from "@/assets/icons/SaveIcon";
import BackIconTwo from "@/assets/icons/BackIconTwo";
import BackIcon from "@/assets/icons/back-icon";

const buttonClass: string = " px-2 border-0";
const filterButtonClass: string = " p-0";

interface headerButtonTypes {
  save: IButton;
  new: IButton;
  filter: IButton;
  back: IButton;
  asc: IButton;
  desc: IButton;
}

export const HEADER_BUTTONS: headerButtonTypes = {
  save: {
    btnName: "Save",
    color: "tertiary",
    icon: <SaveIcon height="16" width="16" color="#000" />,
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
    icon: <FilterIcon height="15" width="15" color="#fff" />,
    className: filterButtonClass,
    btnType: IButtonType.Filter,
  },
  back: {
    btnName: "Back",
    color: "tertiary",
    icon: <BackIcon height="14" width="10" color="#000" />,
    className: buttonClass,
    btnType: IButtonType.GoBack,
  },

  asc: {
    btnName: "",
    color: "tertiary",
    icon: <DownArrowIcon  height="16" width="16" color="#fff" />,
    className: `${buttonClass} bg-transparent hover:bg-transparent`,
    btnType: IButtonType.sortAsc,
  },
  desc: {
    btnName: "",
    color: "tertiary",
    icon: <UpArrowIcon  height="16" width="16" color="#fff" />,
    className: `${buttonClass} bg-transparent hover:bg-transparent`,
    btnType: IButtonType.sortDesc,
  },
};
