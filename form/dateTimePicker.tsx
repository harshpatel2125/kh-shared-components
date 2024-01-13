"use client";

import React, { useState, ChangeEvent, useRef } from "react";

const DateTimePicker: React.FC = () => {
  const [dateTime, setDateTime] = useState<string | undefined>();

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateTime(event.target.value);
  };

  const handleCheckboxClick = () => {
    if (dateTime) {
      setDateTime("");
    } else {
      // Open date input by focusing on it
      dateInputRef.current?.focus();
    }
  };

  return (
    <>
      <div
        style={{ width: "175px", gap: "10px" }}
        className="flex items-center border border-solid border-base-300 px-2 py-1 rounded-md focus:border-blue-500 focus:outline-none "
      >
        <input
          type="checkbox"
          checked={!!dateTime}
          onClick={handleCheckboxClick}
          className="hover:bg-sky-700"
        />

        <input
          type="date"
          className="prevent-select text-sm outline-0"
          onChange={handleDateTimeChange}
          value={dateTime}
          ref={dateInputRef}
        />
      </div>
    </>
  );
};

export default DateTimePicker;
