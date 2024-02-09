import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerReactProps {
  placeholder?: string;
  initialDate?: Date;
  onChange?: ((date: Date | null) => void) | undefined;
  value?: Date | null;
}

const DatePickerReact: React.FC<DatePickerReactProps> = ({ onChange, placeholder, initialDate, value }) => {
  const [date, setDate] = useState<Date | null>(initialDate || null);

  useEffect(() => {
    setDate(value || null);
  }, [value]);

  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
    onChange && onChange(selectedDate);
  };

  return (
    <DatePicker
      className='border py-1 px-2 text-xs rounded'
      selected={date}
      isClearable
      placeholderText={placeholder || "Please pick the date"}
      onChange={handleDateChange}
    />
  );
};

export default DatePickerReact;
