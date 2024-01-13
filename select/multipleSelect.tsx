"use client";
import React, { useEffect } from "react";

interface MultiSelectProps {
  options: Array<{ text: string; value: number }>;
  label?: string;
  ref?: any;
  onChange?: any;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  label = "Select Option",
  ref,
  onChange,
}) => {
  useEffect(() => {
    const init = async () => {
      const { Select, initTE } = await import("tw-elements");
      initTE({ Select });
    };
    init();
  }, []);

  return (
    <>
      <select
        data-te-select-init
        multiple
        ref={ref}
        onChange={(e) => (onChange ? onChange(e) : {})}
      >
        {options.map((op, iDx) => (
          <option key={iDx} value={op.value}>
            {op.text}
          </option>
        ))}
      </select>
      <label data-te-select-label-ref>{label}</label>
    </>
  );
};

export default MultiSelect;
