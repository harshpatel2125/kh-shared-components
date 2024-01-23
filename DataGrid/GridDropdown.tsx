import React, { useState, useEffect, useRef } from "react";

const GridDropdown = ({ value, rowIndex, colDef, colId, api }: any) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const dropdownRef = useRef<any>(null);

  //   useEffect(() => {
  //     // Focus on the dropdown when the component mounts
  //     dropdownRef.current.focus();
  //   }, []);

  const onValueChanged = () => {
    // Save the selected value when the dropdown changes
    // api.applyTransaction({
    //   update: [{ rowIndex, data: { [colId]: selectedValue } }],
    // });
    console.log("api", api);
    api.applyTransaction({
      update: [{ rowIndex: 10, data: { [colDef.field]: selectedValue } }],
    });
  };

  console.log("selectedValue", selectedValue);

  const onDropdownChange = (e: any) => {
    dropdownRef.current.blur();
    // Update the state when the dropdown changes
    setSelectedValue(e.target.value);
  };
  return (
    <div className="ag-input-wrapper">
      <select
        style={{
          width: "100%",
          height: 27,
        }}
        ref={dropdownRef}
        value={selectedValue}
        onChange={onDropdownChange}
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
