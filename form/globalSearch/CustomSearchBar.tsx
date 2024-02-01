"use client";

import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import Select, { ActionMeta, components, ControlProps, Props, StylesConfig } from "react-select";
import SearchIcon from "@/assets/icons/SearchIcon";
import { getLocalStorage } from "@/utils/localStorage";
import { usePathname, useRouter } from "next/navigation";
const primaryColor = "#2C2C2C";
const secondaryColor = "#eeeff1";

const Control = ({ children, ...props }: ControlProps<any, false>) => {
  // @ts-ignore
  const { emoji, onEmojiClick } = props.selectProps;
  const style = { cursor: "pointer" };

  return (
    <components.Control {...props}>
      <span
        onMouseDown={onEmojiClick}
        style={style}
      >
        {emoji}
      </span>

      {children}
    </components.Control>
  );
};

const CustomSearchBar = (props: Props<any>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const [matchedPages, setMatchedPages] = React.useState<string[]>([]);

  const [data, setData] = useState<any>([]);

  React.useEffect(() => {
    const activeRight = getLocalStorage("signInUserRightsSidebar") || null;

    const SignInUserRightsSidebar = JSON.parse(getLocalStorage("signInUserRightsSidebar") || "[]");

    const transformedData: { value: string; label: string }[] = [];

    SignInUserRightsSidebar.forEach((item: any) => {
      item.Functions.forEach((func: any) => {
        func.Pages.forEach((page: any) => {
          transformedData.push({ value: func.FunctionName, label: page.PageName });
        });
      });
    });
    setData(transformedData);
  }, []);

  const onChange = (selectedOption: any) => {
    if (selectedOption?.value !== undefined) {
      const value = selectedOption.value.toLowerCase().replace(/\s/g, "-");
      const label = selectedOption.label.toLowerCase().replace(/\s/g, "-");

      setSearchQuery(`${value}/${label}`);

      const path = `/${value}/${label}`;

      router.push(path);
    } else {
    }
  };

  const emoji = <SearchIcon />;

  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "1px solid #fff",
          fontSize: "12px",
          height: "25px",
          minHeight: "25px",
          margin: "0px",

          borderRadius: "6px",
          padding: "0px 18px",
          paddingBottom: "0px",
          paddingTop: "0px",
          borderColor: state.isFocused ? "#ccc" : "#ccc",
          outlineColor: state.isFocused ? "none" : "none",
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          height: "25px",
          paddingBottom: "0px",
          paddingTop: "0px",

          borderRadius: "5px",
        }),
        indicatorSeparator: (state) => ({
          display: "none",
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: "25px",
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          height: "25px",
          paddingBottom: "0px",
          paddingTop: "0px",
          borderRadius: "5px",
        }),
        menuList: (provided, state) => ({
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
          borderBottom: "1px solid #f1f3f9",
          height: "100%",
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
          primary: primaryColor,
        },
      })}
      {...props}
      // @ts-ignore
      emoji={emoji}
      // onEmojiClick={onClick}
      components={{ Control, DropdownIndicator: null }}
      isSearchable
      isClearable
      name='emoji'
      options={data}
      onChange={onChange}

      // styles={styles}
    />
  );
};

export default CustomSearchBar;
