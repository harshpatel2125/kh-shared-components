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

  const [data, setData] = useState<any>({});

  React.useEffect(() => {
    // Retrieve data from local storage
    const activeRight = getLocalStorage("activeRight") || null;
    const SignInUserRightsSidebar = JSON.parse(getLocalStorage("SignInUserRightsSidebar") || "[]");

    // Initialize an empty array to store the transformed data
    const transformedData: { value: string; label: string }[] = [];

    // Filter data based on the activeRight
    const data = activeRight
      ? SignInUserRightsSidebar &&
        SignInUserRightsSidebar.length > 0 &&
        SignInUserRightsSidebar.map((ele: any) => {
          if (parseInt(ele?.ModuleID) === parseInt(activeRight)) {
            return ele?.Functions;
          } else return null;
        }).filter((e: any) => e !== null)?.[0]
      : SignInUserRightsSidebar?.[0]?.Functions;

    // Extract function name and page name
    data.forEach((func: any) => {
      func.Pages.forEach((page: any) => {
        transformedData.push({ value: func.FunctionName, label: page.PageName });
      });
    });

    // Set the data state with the filtered result
    setData(transformedData);
  }, []);

  const onChange = (selectedOption: any) => {
    console.log("Selected option:", selectedOption);

    // Check if selectedOption has a value defined
    if (selectedOption?.value !== undefined) {
      // Convert value and label to lowercase and replace spaces with hyphens
      const value = selectedOption.value.toLowerCase().replace(/\s/g, "-");
      const label = selectedOption.label.toLowerCase().replace(/\s/g, "-");

      setSearchQuery(`${value}/${label}`);

      const path = `/${value}/${label}`;
      console.log("Constructed path:", path);

      // Construct the path using both value and label and push the user to that path
      router.push(path);
    } else {
      console.log("Value is undefined, navigation aborted.");
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
