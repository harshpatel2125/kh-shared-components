import FilterIcon from "@/assets/icons/FilterIcon";
import { IButton, IButtonType } from "@/shared/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import UpArrowIcon from "@/assets/icons/UpArrowIcon";
import DownArrowIcon from "@/assets/icons/DownArrowIcon";
import SaveIcon from "@/assets/icons/SaveIcon";
import BackIconTwo from "@/assets/icons/BackIconTwo";
import BackIcon from "@/assets/icons/back-icon";

const buttonClass: string = "border-0";
const filterButtonClass: string = " p-0";
const btnPadding: string = "px-2";

export interface headerButtonTypes {
  save: IButton;
  new: IButton;
  pay: IButton;
  filter: IButton;
  back: IButton;
  asc: IButton;
  desc: IButton;
  approve: IButton;
  reject: IButton;
  purchase_order_checklist: IButton;
}

export const HEADER_BUTTONS: headerButtonTypes = {
  save: {
    btnName: "Save",
    color: "tertiary",
    icon: <SaveIcon height="16" width="16" color="#000" />,
    className: `${buttonClass} ${btnPadding}`,
    btnType: IButtonType.FormSubmit,
  },
  new: {
    btnName: "New",
    color: "tertiary",
    icon: <PlusIcon className="h-3 w-3" />,
    className: `${buttonClass} ${btnPadding}`,
    btnType: IButtonType.CreateNew,
  },
  pay: {
    btnName: "Pay",
    color: "tertiary",
    // icon: <FilterIcon height={12} width={12} color="#fff" />,
    className: buttonClass,
    btnType: IButtonType.payment,
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
    className: `${buttonClass} ${btnPadding}`,
    btnType: IButtonType.GoBack,
  },

  asc: {
    btnName: "",
    color: "tertiary",
    icon: <DownArrowIcon height="16" width="16" color="#fff" />,
    className: `${buttonClass} bg-transparent hover:bg-transparent`,
    btnType: IButtonType.sortAsc,
  },
  desc: {
    btnName: "",
    color: "tertiary",
    icon: <UpArrowIcon height="16" width="16" color="#fff" />,
    className: `${buttonClass} bg-transparent hover:bg-transparent`,
    btnType: IButtonType.sortDesc,
  },
  approve: {
    btnName: "Approved",
    color: "tertiary",
    // icon: <BackIcon height="14" width="10" color="#000" />,
    className: `${buttonClass} ${btnPadding}`,
    btnType: IButtonType.approve,
  },
  reject: {
    btnName: "Reject",
    color: "tertiary",
    // icon: <BackIcon height="14" width="10" color="#000" />,
    className: `${buttonClass} px-3`,
    btnType: IButtonType.reject,
  },
  purchase_order_checklist: {
    btnName: "PO Checklist",
    color: "tertiary",
    // icon: <BackIcon height="14" width="10" color="#000" />,
    className: `${buttonClass} px-3`,
    btnType: IButtonType.purchase_order_checklist,
  },
};
