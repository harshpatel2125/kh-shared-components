import { COLORS } from "@/constants/colors";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
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
  // const [dateTime, setDateTime] = useState<string | undefined>(value);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      const date: string = event.target.value;
      // console.log(date, "date");
      onChange(id, date);
    }
  };

  const handleCheckboxClick = () => {
    if (!readOnly) {
      if (value) {
        onChange(id, "");
      } else {
        dateInputRef.current?.focus();
      }
    }
  };

  const handleDivClick = () => {
    // Focus on the date input when the surrounding div is clicked
    if (!readOnly) {
      dateInputRef.current?.focus();
    }
  };

  const dynamicBgClass = readOnly
    ? COLORS.READ_ONLY
    : required
    ? COLORS.REQUIRED
    : "";

  useEffect(() => {
    if (readOnly) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      let currDate = yyyy + "-" + mm + "-" + dd;
      onChange(id, currDate);
    }
  }, [readOnly]);

  return (
    <div className="flex flex-col">
      <div
        style={{ width: "100%", gap: "10px" }}
        className={`${dynamicBgClass}  h-[30px] flex items-center border border-solid border-stone-300 px-2 py-0 rounded focus:border-stone-200 focus:outline-none`}
        onClick={handleDivClick} // Attach onClick event handler to the div
      >
        <input
          type="checkbox"
          checked={!!value}
          onClick={handleCheckboxClick}
          className="hover:bg-sky-700"
          readOnly={readOnly} // Add readOnly attribute to prevent checkbox changes
          disabled={readOnly}
        />

        <input
          id={id}
          type="date"
          className={`'prevent-select text-xs outline-0 p-0 py-0   ${
            value ? " text-stone-800" : "text-stone-400"
          } '`}
          onChange={handleDateTimeChange}
          value={value}
          ref={dateInputRef}
          readOnly={readOnly} // Add readOnly attribute to prevent date input changes
          disabled={readOnly}
        />
      </div>

      {/* @arun write style for error msg : create reusable component with all styles and pass dynamic error msg  */}
      <ErrorMessage errorMessage={errorMsg} />
    </div>
  );
};

export default DateTimePicker;
