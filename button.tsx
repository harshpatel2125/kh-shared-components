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
  formSubmit = "formSubmit",
  goBack = "goBack",
  createNew = "createNew",
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
        "btn border-0 py-[6px] px-[5px] pe-[6px]  h-min min-h-min antialiased hover:text-white hover:bg-tertiary-dark text-xs font-normal gap-1 rounded-[5px]",
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
