import { COLORS } from "@/constants/colors";
import React, { useState, ChangeEvent, useRef } from "react";

interface DateTimePickerProps {
  readOnly?: boolean;
  required?: boolean;
  onChange?: (value: string | undefined) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ readOnly, required, onChange }) => {
  const [dateTime, setDateTime] = useState<string | undefined>();

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      const value = event.target.value;
      setDateTime(value);
      onChange && onChange(value);
    }
  };

  const handleCheckboxClick = () => {
    if (!readOnly) {
      if (dateTime) {
        setDateTime("");
        onChange && onChange("");
      } else {
        // Open date input by focusing on it
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

  const dynamicBgClass = readOnly ? COLORS.READ_ONLY : required ? COLORS.REQUIRED : "";

  return (
    <>
      <div
        style={{ width: "100%", gap: "10px" }}
        className={`${dynamicBgClass}  h-[30px] flex items-center border border-solid border-stone-300 px-2 py-0 rounded focus:border-stone-200 focus:outline-none`}
        onClick={handleDivClick} // Attach onClick event handler to the div
      >
        <input
          type='checkbox'
          checked={!!dateTime}
          onClick={handleCheckboxClick}
          className='hover:bg-sky-700'
          readOnly={readOnly} // Add readOnly attribute to prevent checkbox changes
        />

        <input
          type='date'
          className={`'prevent-select text-xs outline-0 p-0 py-0   ${dateTime ? " text-stone-800" : "text-stone-400"} '`}
          onChange={handleDateTimeChange}
          value={dateTime || ''}
          ref={dateInputRef}
          readOnly={readOnly} // Add readOnly attribute to prevent date input changes
        />
      </div>
    </>
  );
};

export default DateTimePicker;
