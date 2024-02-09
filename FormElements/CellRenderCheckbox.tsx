"use client"

import React, { forwardRef, useImperativeHandle } from "react";

interface CheckboxRendererProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const CheckboxRenderer = forwardRef((props: CheckboxRendererProps, ref) => {
  const { value, onChange } = props;

  useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    },
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <input
      type='checkbox'
      checked={value}
      onChange={handleChange}
    />
  );
});

// Set display name for the component
CheckboxRenderer.displayName = "CheckboxRenderer";

export default CheckboxRenderer;
