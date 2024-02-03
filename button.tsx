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

type ButtonColorType = IButtonColor | "primary" | "secondary" | "tertiary" | "accent" | "neutral" | "info" | "success" | "warning" | "error" | "light";

export interface IButton {
  color?: ButtonColorType;
  icon?: JSX.Element | string;
  children?: JSX.Element | string;
  btnName?: string;
  onClick?: (e?: any) => void;
  className?: string;
  btnType?: string;
  iconClassName?: string;
}

const Button: React.FC<IButton> = ({ iconClassName, icon, children, color, onClick, className, btnName }) => {
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
    <>
      {/* <button
        onClick={onClick}
        className={clsx("btn btn-xs btn-style flex align-middle justify-center    text-center     hover:text-black hover:bg-gray-200 text-[11px] text-slate-700 font-normal gap-1 ", bgColorHandler(), className)}
      >
        <span className=''> {icon || ""}</span>
        {children || btnName}
      </button> */}
      <button
        onClick={onClick}
        className={clsx("flex text-[10px]  h-5 w-fit items-center justify-center  py-[3px] rounded-sm", bgColorHandler(), className)}
      >
        <p className={` ${icon ? "mr-0.5" : ""} `}> {icon || ""}</p> {children || btnName}
      </button>
    </>
  );
};

export default Button;
