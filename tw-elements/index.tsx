/**
 * These are all tw-element wrappers exported from single file due to :** CSR **
 */
"use client";
import dynamic from "next/dynamic";
import {
  DropdownProps,
  TextInputProps,
  CarousalProps,
} from "../../constants/types";

// ----------------------------dynamic imports----------------------------------------
const DynamicTextInput = dynamic(() => import("../FormElements/TextInput"), {
  ssr: false,
});

const DynamicDropdown = dynamic(() => import("../form/Dropdown"), {
  ssr: false,
});

const DynamicCarousal = dynamic(() => import("../carousal"), {
  ssr: false,
});

// ------------------------------tw-inputs wrappers---------------------------------------

export const TextInputWrapper = (props: TextInputProps) => {
  return <DynamicTextInput {...props} />;
};

export const DropdownWrapper = ({ label, options }: DropdownProps) => {
  return <DynamicDropdown label={label} options={options} />;
};

//--------------------------- tw-carousal wrapper-------------------------------------------
export const CarousalWrapper = ({ images }: CarousalProps) => {
  return <DynamicCarousal />;
};
