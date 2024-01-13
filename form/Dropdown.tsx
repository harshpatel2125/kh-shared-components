"use client";

import dynamic from "next/dynamic";
import { DropdownProps } from "@/constants/types";

const TESelect = dynamic(() =>
  import("tw-elements-react").then((res) => res.TESelect)
);

const DropDown = ({ label, options, selected, onChange }: DropdownProps) => {
  return (
    <>
      <TESelect
        data={options}
        label={label}
        preventFirstSelection
        size="sm"
        // clearBtn
      />
    </>
  );
};
export default DropDown;
