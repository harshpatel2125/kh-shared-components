"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";
const TESelect = dynamic(() =>
  import("tw-elements-react").then((res) => res.TESelect)
);

interface Option {
  text: string;
  value: string | number;
}

interface SelectProps {
  label: string;
  selected?: any;
  search?: boolean;
  value?: any;
  options: Option[];
  onChange: (e: React.ChangeEvent<any>) => void;
  // onDeselect: (e: React.ChangeEvent<any>) => void;
}

const DropDown: React.FC<SelectProps> = ({
  label,
  options,
  search,
  value,
  onChange,
}) => {
  const handleOptionSelect = (data: SelectData) => {
    const selectedValue = data.value;
    const syntheticEvent = {
      target: {
        value: selectedValue,
      },
    } as React.ChangeEvent<any>;
    onChange(syntheticEvent);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <div className="">
            <div className="relative mb-3  pt-5">
              <TESelect
                size="sm"
                search={search}
                data={options}
                label={label}
                value={value}
                onOptionSelect={handleOptionSelect}
                clearBtn
                preventFirstSelection
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDown;
