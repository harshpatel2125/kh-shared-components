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

  const handleDivClick = () => {
    // Focus on the date input when the surrounding div is clicked
    dateInputRef.current?.focus();
  };

  return (
    <>
      <div
        style={{ width: "100%", gap: "10px" }}
        className='h-[30px] flex items-center border border-solid border-stone-300 px-2 py-0 rounded focus:border-stone-200 focus:outline-none '
        onClick={handleDivClick} // Attach onClick event handler to the div
      >
        <input
          type='checkbox'
          checked={!!dateTime}
          onClick={handleCheckboxClick}
          className='hover:bg-sky-700'
        />

        <input
          type='date'
          className='prevent-select text-xs outline-0 p-0 py-0 '
          onChange={handleDateTimeChange}
          value={dateTime}
          ref={dateInputRef}
        />
      </div>
    </>
  );
};

export default DateTimePicker;
