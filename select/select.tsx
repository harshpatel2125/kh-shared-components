import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
const primaryColor = "#2C2C2C";
const secondaryColor = "#eeeff1";
import { components } from "react-select";

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
  mandatory?: boolean;
  btnName?: string;
  defaultValue?: Option;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ defaultValue, btnName, mandatory, label, isSearchable, options, isLoading, value, onChange = () => {}, onCreateOption }) => {
  const [labelColor, setLabelColor] = useState<any>(false);
  const [addBtn, setAddBtn] = useState(true);
  return (
    <div className='relative'>
      <CreatableSelect
        components={{
          MenuList: (props) => (
            <components.MenuList {...props}>
              {props.children}
              {btnName && (
                <div className='p-3'>
                  <button
                    className='rounded px-4 btn btn-xs w-fit btn-outline'
                    onClick={() => alert("hello buddy")}
                  >
                    {btnName}
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
          control: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "14px",
            minHeight: "26px",
            margin: "0px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            padding: "0px",
            paddingBottom: "0px",
            paddingTop: "0px",
            borderColor: state.isFocused ? "#ccc" : "#ccc",
            outlineColor: state.isFocused ? "ccc" : "#ccc",
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
        onChange={(newValue) => onChange(newValue)}
        onCreateOption={onCreateOption}
        options={options}
        // value={value}
      />
      <label className={`font-light absolute  text-[10px] bg-[white] px-[3px] py-0 rounded-[10px] left-[2%] selectDropDown ${labelColor ? "text-blue-800" : "text-slate-700"} `}>
        {label ? label : "Label"}
        {mandatory ? "*" : ""}
      </label>
    </div>
  );
};

export default SelectDropdown;
