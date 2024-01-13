// @ts-nocheck
import React from "react";
import Button from "../button";

interface Button {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface ButtonGroupProps {
  buttons: Button[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
  return (
    <div className="button-group">
      {buttons.map((button, index) => (
        <Button key={index} href={button.path} className="btn-ghost">
          <span className={`btn-icon ${button?.bgCss}`}>{button.icon}</span>
          <span className="btn-label">{button.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
