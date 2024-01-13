import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  selected?: any;
  options: Option[];
  onChange?: (e:any) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, onChange,selected }) => {
  console.log('options',options)
  return (
    <select className="select select-ghost border-none" onChange={onChange ? onChange : () => {}}>
      {options.map((option, index) => (
        <option key={index} value={option.value} selected={option.value === selected}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
