"use client";

import React, { useState } from "react";

interface Option {
  label: string;
  value: any; // Replace 'any' with the specific type of your option values
}

interface SelectInputProps {
  labelTitle?: string;
  labelStyle?: React.CSSProperties;
  inputStyle?: any;
  containerStyle?: React.CSSProperties;
  defaultValue?: string;
  placeholder?: string;
  updateType: string;
  updateFormValue: Function;
  options: Option[]; // Array of objects with label and value properties
}

const SelectInput: React.FC<SelectInputProps> = ({
  labelTitle,
  labelStyle,
  inputStyle,
  containerStyle,
  defaultValue,
  placeholder,
  updateType,
  updateFormValue,
  options, // Array of options for the select dropdown
}) => {
  const [value, setValue] = useState(defaultValue);
  const updateInputValue = (val: string) => {
    setValue(val);
    updateFormValue(updateType, val);
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label pt-2 m-0 pb-0">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <select
        value={value}
        onChange={(e) => updateInputValue(e.target.value)}
        // className={`select m-0 select-bordered w-full ${inputStyle}`}
        className={`border input-bordered rounded-md px-4 py-2.5 w-full text-sm ${inputStyle}`}
      >
        <option value="" disabled>
          {placeholder || `Select ${labelTitle}`}
        </option>
        {options.map((option: Option, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
