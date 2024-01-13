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
      <div className='mt-1.5 px-3'>
        <SearchIcon />
      </div>
      <div className='w-full'>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: "14px",
              minHeight: "28px",
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
              height: "28px",
              paddingBottom: "0px",
              paddingTop: "0px",
              borderRadius: "5px",
            }),
            
            indicatorSeparator: state => ({
              display: 'none',
            }),
            indicatorsContainer: (provided, state) => ({
              ...provided,
              height: '30px',
            }),
            dropdownIndicator  : (provided, state) => ({
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
