import React, { useState } from "react";
import Select, { CSSObjectWithLabel, ControlProps, GroupBase } from "react-select";
import CreatableSelect from "react-select/creatable";
const primaryColor = "#2C2C2C";
const secondaryColor = "#eeeff1";
import { components } from "react-select";
import { COLORS } from "@/constants/colors";

interface Option {
  label?: any;
  value?: any;
}

//  new
interface SelectDropdownProps {
  label?: string;
  isSearchable?: boolean;
  options?: Option[] | undefined;
  isLoading?: boolean;
  value?: Option | Option[] | null;
  onChange?: (newValue: any) => void;
  onCreateOption?: (inputValue: string) => void;
  readOnly?: boolean;
  dropdownBtnLabel?: string;
  defaultValue?: Option;
  required?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ readOnly, required, defaultValue, dropdownBtnLabel, label, isSearchable, options, isLoading, value, onChange = () => { }, onCreateOption }) => {
  
  const handleInputChange = (newValue: Option | null) => {
    if (!readOnly && onChange) {
      onChange(newValue);
    }
  };

  const [labelColor, setLabelColor] = useState<any>(false);
  const [addBtn, setAddBtn] = useState(true);
  return (
    <div className='relative'>
      <CreatableSelect
        components={{
          MenuList: (props) => (
            <components.MenuList {...props}>
              {props.children}
              {dropdownBtnLabel && (
                <div className='p-3'>
                  <button
                    className='rounded px-4 btn btn-xs w-fit btn-outline'
                    onClick={() => alert("hello buddy")}
                  >
                    {dropdownBtnLabel}
                  </button>
                </div>
              )}
            </components.MenuList>
          ),
        }}
        styles={{
          option: (base) => ({
            ...base,
            borderBottom: "1px solid #f1f3f9",
            height: "100%",
            margin: "0px",
            paddingBottom: "3px",
            paddingTop: "3px",
            zIndex: "9999",
            borderRadius: "3px",
          }),
          control: (base: CSSObjectWithLabel, props: ControlProps<Option, false, GroupBase<Option>>) => ({
            ...base,
            backgroundColor: readOnly ? COLORS.READ_ONLY_CSS : required ? COLORS.REQUIRED_CSS : "transparent",
            fontSize: "14px",
            minHeight: "26px",
            margin: "0px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            padding: "0px",
            paddingBottom: "0px",
            paddingTop: "0px",
            borderColor: props.isFocused ? "#ccc" : "#ccc",
            outlineColor: props.isFocused ? "#ccc" : "#ccc",
          }),

          valueContainer: (provided, state) => ({
            ...provided,
            height: "27px",
            paddingBottom: "0px",
            paddingTop: "0px",
            borderRadius: "3px",
            fontSize: "12px",
          }),
          clearIndicator: (provided, state) => ({
            ...provided,
            padding: "0px",
          }),
          indicatorSeparator: (state) => ({
            display: "none",
          }),
          indicatorsContainer: (provided, state) => ({
            ...provided,
            height: "26px",
            padding: "0px",
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            height: "20px",
            paddingBottom: "0px",
            paddingTop: "0px",
            borderRadius: "3px",
            padding: "0px",
            paddingRight: "7px",
          }),
          menuList: (provided, state) => ({
            ...provided,
            paddingBottom: "0px",
            paddingTop: "0px",
            borderRadius: "3px",
            color: "#332941",
            zIndex: "9999",
            fontSize: "13px",
            overflow: "hidden",
          }),
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 3,

          colors: {
            ...theme.colors,
            primary25: "#eeeff1",
            primary: primaryColor,
          },
        })}
        defaultValue={defaultValue}
        onFocus={() => setLabelColor(true)}
        onBlur={() => setLabelColor(false)}
        isSearchable={isSearchable}
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={handleInputChange}
        onCreateOption={onCreateOption}
        options={options}
        // value={value}
      />
      <label className={`font-light absolute  text-[10px] bg-[white] px-[3px] py-0 rounded-[10px] left-[2%] selectDropDown ${labelColor ? "text-blue-800" : "text-slate-700"} `}>
        {label ? label : "Label"}
        {required ? "*" : ""}
      </label>
    </div>
  );
};

export default SelectDropdown;
