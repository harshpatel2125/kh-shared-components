import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { IInputType } from "../DataForm/enums";
import { COLORS } from "@/constants/colors";
import ErrorMessage from "../errorMessage";

const TEInput = dynamic(() =>
  import("tw-elements-react").then((res) => res.TEInput)
);

const TERipple = dynamic(() =>
  import("tw-elements-react").then((res) => res.TERipple)
);

interface InputTextProps {
  id: string;
  label: string;
  value: string;
  errorMsg: string;
  readOnly: boolean;
  required: boolean;
  onChange: (key: string, stateValue: string) => void;

  // not in use
  type?: React.HTMLInputTypeAttribute;
  emptyError?: boolean;
  togglePassword?: () => void;
  showPassword?: boolean;
  className?: string;
  formWhite?: boolean;
  validationError?: boolean;
  validationMessage?: string;
}

const TextInput: React.FC<InputTextProps> = ({
  id,
  label,
  value,
  errorMsg,
  readOnly = false,
  required = false,
  onChange,

  //
  type,
  emptyError = false,
  togglePassword,
  className = "",
  formWhite,
  validationError,
  validationMessage,
  showPassword,
}) => {
  // Define the style object based on the 'mandatory' state
  const dynamicBgClass = readOnly
    ? COLORS.READ_ONLY
    : required
    ? COLORS.REQUIRED
    : "";

  function changeHandler(e: any) {
    let stateValue = e.target.value;
    onChange(id, stateValue);
  }

  return (
    <div className="flex flex-col ">
      {/* ------ new custom input ----- */}
      <div className={` form__div ${className}`}>
        <input
          id={id}
          className={`  form__input ${dynamicBgClass}`}
          disabled={readOnly}
          type={showPassword ? "text" : type ? type : "text"}
          onChange={changeHandler}
          value={value}
          placeholder="type here . . . "
        ></input>
        <label className="font-light rounded-full form__label">{`${
          label || ""
        }${required && !readOnly && !emptyError ? "*" : ""}`}</label>

        {/* {(emptyError || (validationError && validationMessage)) && (
          <div
            className="absolute   w-full text-[10px] ml-[2px] mt-[-1px] text-[red] dark:text-[red]"
            data-te-input-helper-ref
          >
            {emptyError
              ? `${label || "Input"}${emptyError ? " is required." : ""}*`
              : validationError
              ? validationMessage
              : ""}
          </div>
        )} */}
        {type === IInputType.Password && togglePassword && (
          <div className="absolute right-0 top-0 h-full">
            <TERipple
              className="h-full w-7 flex justify-center items-center"
              onClick={() => togglePassword()}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </TERipple>
          </div>
        )}
      </div>
      <ErrorMessage errorMessage={errorMsg} />
    </div>
  );
};

export default TextInput;
