"use client";

import NotificationIcon from "@/assets/icons/NotificationIcon";
import SearchIcon from "@/assets/icons/search-icon";
import React, { useState } from "react";
import Select from "react-select";

interface Option {
  label: any;
  value: any;
}

interface SelectProps {
  label?: string;
  selected?: any;
  options: Option[];
  onChange?: (e: any) => void;
  isMulti?: boolean;
  isSearchable?: boolean;
}

const components = {
  DropdownIndicator: null,
};

// 
interface Option {
  label: any;
  value: any;
}

//  new

interface SearchBarProps {
  options?: Option[];
  isLoading?: boolean;
  value?: Option | null;
  onChange?: (newValue: Option | null) => void;
  onCreateOption?: (inputValue: string) => void;
  isMulti?: boolean;
  isSearchable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> =({isSearchable, isMulti, options, isLoading, value,  onChange = () => {}, onCreateOption }) => {
  return (
    <div className='flex border rounded-lg'>
      <div className='mt-1 px-3'>
        <SearchIcon />
      </div>
      <div className='w-full'>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: "12px",
              minHeight: "26px",
              margin: "0px",
              border: 0,
              borderRadius: "5px",
              padding: "0px",
              paddingBottom: "0px",
              paddingTop: "0px",
              borderColor: state.isFocused ? "white" : "",
              outlineColor: state.isFocused ? "none" : "",
            }),
            valueContainer: (provided, state) => ({
              ...provided,
              height: "26px",
              paddingBottom: "0px",
              paddingTop: "0px",
              borderRadius: "5px",
            }),
            indicatorSeparator: state => ({
              display: 'none',
            }),
            indicatorsContainer: (provided, state) => ({
              ...provided,
              height: '26px',
            }),
            dropdownIndicator  : (provided, state) => ({
              ...provided,
              height: "26px",
              paddingBottom: "0px",
              paddingTop: "0px",
              borderRadius: "5px",
            }),
            menuList  :  (provided, state) => ({
              ...provided,
              paddingBottom: "0px",
              paddingTop: "0px",
              borderRadius: "3px",
              color: "#332941",
              zIndex: "999999",
              fontSize: "13px",
            }),
            option: (base) => ({
              ...base,
              borderBottom : "1px solid #f1f3f9",
              height: '100%',
              margin: "0px",
              paddingBottom: "3px",
              paddingTop: "3px",
              zIndex: "999",
              borderRadius: "3px",
              
            }),
            
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 3,
            
            colors: {
              ...theme.colors,
              primary25: "#eeeff1",
              primary: "#eeeff1",
            },
          })}
          placeholder='type here  . . .'
          isClearable
          onChange={(newValue) => onChange(newValue)}
          closeMenuOnSelect
          isSearchable={isSearchable}
          options={options}
          components={components}
        />
      </div>
    </div>
  );
};

//

export default SearchBar;
