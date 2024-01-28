// @ts-nocheck
import React from "react";
import clsx from "clsx";

export enum IButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Accent = "accent",
  Neutral = "neutral",
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "error",
  Light = "light",
}

export enum IButtonType {
  FormSubmit = "formSubmit",
  GoBack = "goBack",
  CreateNew = "createNew",
  Filter = "filter",
  Reset = "reset",
  sortAsc = "sortasc",
  sortDesc = "sortdesc",
  payment = "payment",
  approve = "approve",
  reject = "reject",
  purchase_order_checklist = "purchase_order_checklist",
  add = "add",
}

type ButtonColorType =
  | IButtonColor
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light";

export interface IButton {
  color?: ButtonColorType;
  icon?: JSX.Element | string;
  children?: JSX.Element | string;
  btnName?: string;
  onClick?: (e?: any) => void;
  className?: string;
  btnType?: string;
}

const Button: React.FC<IButton> = ({
  icon,
  children,
  color,
  onClick,
  className,
  btnName,
}) => {
  const bgColorHandler = () => {
    switch (color) {
      case IButtonColor.Primary:
        return "bg-primary text-white";
      case IButtonColor.Secondary:
        return "bg-secondary text-white";
      case IButtonColor.Accent:
        return "bg-accent text-white";
      case IButtonColor.Neutral:
        return "bg-neutral text-white";
      case IButtonColor.Info:
        return "bg-info text-white";
      case IButtonColor.Success:
        return "bg-success text-white";
      case IButtonColor.Warning:
        return "bg-warning text-white";
      case IButtonColor.Light:
        return "bg-light text-white";
      case IButtonColor.Error:
        return "bg-error text-white";
      case IButtonColor.Tertiary:
        return "bg-tertiary text-white";
      default:
        return "";
    }
  };
  return (
    <button
      onClick={onClick}
      className={clsx(
        "btn p-0  py-1  text-center w-fit h-min min-h-min antialiased hover:text-black hover:bg-gray-200 text-xs font-normal gap-1 ",
        bgColorHandler(),
        className
      )}
    >
      {icon || ""}
      {children || btnName}
    </button>
  );
};

export default Button;
