import { COLORS } from "@/constants/colors";
import React, { useState, ChangeEvent, useEffect } from "react";
import ErrorMessage from "../errorMessage";

interface DateTimePickerProps {
  id: string;
  label: string;
  value: string;
  errorMsg: string;
  onChange: (key: string, stateValue: string) => void;
  readOnly?: boolean;
  required?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  id,
  label,
  value,
  errorMsg,
  readOnly,
  required,
  onChange,
}) => {
  const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      const date: string = event.target.value;
      onChange(id, date);
    }
  };

  useEffect(() => {
    if (readOnly) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      let currDate = yyyy + "-" + mm + "-" + dd;
      onChange(id, currDate);
    }
  }, [readOnly]);

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={handleDateTimeChange}
        className={`prevent-select text-xs outline-none px-4 py-2 rounded border border-solid border-stone-300 focus:border-stone-200 ${
          value ? "text-stone-800" : "text-stone-400"
        } ${readOnly ? COLORS.READ_ONLY : ""}`}
        readOnly={readOnly}
        disabled={readOnly}
        placeholder={label}
      />
      <ErrorMessage errorMessage={errorMsg} />
    </div>
  );
};

export default DateTimePicker;
