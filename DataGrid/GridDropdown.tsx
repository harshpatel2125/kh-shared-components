import React, { useState, useEffect, useRef } from "react";
const GridDropdown = ({ value, rowIndex, colDef, colId, api, onDropdownChange }: any) => {
  const dropdownRef = useRef<any>(null);

  const onValueChanged = () => {
    // Save the selected value when the dropdown changes
    onDropdownChange(rowIndex, dropdownRef.current.value);
  };

  const onDropdownChangeLocal = (e: any) => {
    dropdownRef.current.blur();
    // Update the selected value in the parent component
    onDropdownChange(rowIndex, e.target.value);
  };
  return (
    <div className="ag-input-wrapper">
    <select
      style={{
        width: "100%",
        height: 27,
      }}
      ref={dropdownRef}
      value={value}
      onChange={onDropdownChangeLocal}
      onBlurCapture={onValueChanged}
      onKeyDown={(e) => {
        // Save the value when Enter is pressed
        if (e.key === "Enter") {
          onValueChanged();
        }
      }}
    >
        <option
          value="newUser-8"
          style={{
            width: "100%",
            height: 27,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 27,
            }}
          >
            newUser-8
          </div>
        </option>
        <option value="newUser-9">newUser-9</option>
        <option value="newUser-10">newUser-10</option>
      </select>
    </div>
  );
};

export default GridDropdown;
