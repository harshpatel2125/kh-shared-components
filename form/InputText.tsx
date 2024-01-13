"use client";
import EyeOutline from "@/assets/icons/EyeIcon";
import React, { useState } from "react";

interface InputTextProps {
  labelTitle?: string;
  labelStyle?: string;
  type?: string;
  inputStyle?: string;
  containerStyle?: string;
  defaultValue?: string;
  placeholder?: string;
  updateType?: string;
  updateFormValue?: any;
}

const InputText: React.FC<InputTextProps> = ({
  labelTitle,
  labelStyle,
  type,
  inputStyle,
  containerStyle,
  defaultValue,
  placeholder,
  updateType,
  updateFormValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [toggleType, setToggleType] = useState(true);
  const updateInputValue = (val: string) => {
    setValue(val);

    updateFormValue(updateType, val);
  };
  const getType = () => {
    if (type === "password") {
      return toggleType ? "password" : "text";
    }
    return type || "text";
  };
  return (
    <div
      className={`form-control w-full ${containerStyle} ${
        type === "password" ? "relative" : ""
      }`}
    >
      <label className="label pt-2 m-0 pb-0.5">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type={getType()}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        // className={`input m-0 input-bordered w-full ${inputStyle}`}
        className={`border input-bordered rounded-md px-4 py-2 w-full text-sm ${inputStyle}`}
      />
      {type === "password" && (
        <span
          className="absolute right-2 top-10 cursor-pointer"
          onClick={() => setToggleType((state) => !state)}
        >
          <EyeOutline />
        </span>
      )}
    </div>
  );
};

export default InputText;
