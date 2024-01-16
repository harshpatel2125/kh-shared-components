import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
const primaryColor = "#2C2C2C";
const secondaryColor = "#eeeff1";

interface Option {
  label?: any;
  value?: any;
}

//  new

interface SelectDropdownProps {
  isSearchable?: boolean;
  options?: Option[];
  isLoading?: boolean;
  value?: Option | Option[] | null;
  onChange?: (newValue: Option | Option[] | null) => void;
  onCreateOption?: (inputValue: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  isSearchable,
  options,
  isLoading,
  value,
  onChange = () => {},
  onCreateOption,
}) => {
  return (
    <div className="relative">
      <CreatableSelect
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "14px",
            minHeight: "28px",
            margin: "0px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "0px",
            paddingBottom: "0px",
            paddingTop: "0px",
            borderColor: state.isFocused ? "#ccc" : "#ccc",
            outlineColor: state.isFocused ? "ccc" : "#ccc",
          }),
          valueContainer: (provided, state) => ({
            ...provided,
            height: "28px",
            paddingBottom: "0px",
            paddingTop: "0px",
            borderRadius: "5px",
            fontSize: "12px",
          }),

          indicatorSeparator: (state) => ({
            display: "none",
          }),
          indicatorsContainer: (provided, state) => ({
            ...provided,
            height: "30px",
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            height: "28px",
            paddingBottom: "0px",
            paddingTop: "0px",
            borderRadius: "5px",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,

          colors: {
            ...theme.colors,
            primary25: "#eeeff1",
            primary: primaryColor,
          },
        })}
        isSearchable={isSearchable}
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => onChange(newValue)}
        onCreateOption={onCreateOption}
        options={options}
        value={value}
      />
      <label className="font-light  absolute selectDropDown">
        Pattern thumb
      </label>
    </div>
  );
};

export default SelectDropdown;
