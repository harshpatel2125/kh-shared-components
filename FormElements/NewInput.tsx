import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { IInputType } from "../DataForm/enums";

const TEInput = dynamic(() =>
    import("tw-elements-react").then((res) => res.TEInput)
);

const TERipple = dynamic(() =>
    import("tw-elements-react").then((res) => res.TERipple)
);

interface InputTextProps {
    label: string;
    type?: React.HTMLInputTypeAttribute;
    value?: any;
    readOnly?: boolean;
    required?: boolean;
    emptyError?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    togglePassword?: () => void;
    showPassword?: boolean;
    className?: string;
    formWhite?: boolean;
    validationError?: boolean;
    validationMessage?: string;
    inputMandatoryBg?: boolean | undefined;
    inputReadOnlyBg?: boolean | undefined;
}

const TextInput: React.FC<InputTextProps> = ({
    label,
    type,
    value,
    readOnly = false,
    required = false,
    emptyError = false,
    onChange,
    togglePassword,
    className = "",
    formWhite,
    validationError,
    validationMessage,
    showPassword,
    inputMandatoryBg,
    inputReadOnlyBg,

}) => {


    // Define the style object based on the 'mandatory' state
    const dynamicStyle = {
        backgroundColor: inputReadOnlyBg ? '#efefef' : inputMandatoryBg ? '#fdf5ca63' : 'transparent',
    };

    return (
        <>
            <div className="form__div">
                <input type="text" className="form__input" placeholder=" "></input>
                <label className="form__label">Email Enter here</label>
            </div>
            <TEInput
                style={dynamicStyle}
                type={showPassword ? "text" : type ? type : "text"}
                label={`${label || "Input"}${required && !readOnly && !emptyError ? "*" : ""
                    }`}
                size="sm"
                value={value}
                onChange={onChange}
                disabled={readOnly}
                className={`${className} p-0 m-0 text-lg`}
                formWhite={formWhite}
                theme={{
                    focusedNotchLeadingDefault:
                        "shadow-[-1px_0_0_#2C2C2C,_0_1px_0_0_#2C2C2C,_0_-1px_0_0_#2C2C2C] border-primary dark:border-primary ",
                    focusedNotchMiddleDefault:
                        "shadow-[0_1px_0_0_#2C2C2C] border-primary dark:border-primary",
                    focusedNotchTrailingDefault:
                        "shadow-[1px_0_0_#2C2C2C,_0_-1px_0_0_#2C2C2C,_0_1px_0_0_#2C2C2C] border-primary dark:border-primary",
                }}
            >
                {(emptyError || (validationError && validationMessage)) && (
                    <div
                        className="absolute  w-full text-[10px] ml-[2px] mt-[-1px] text-[red] dark:text-[red]"
                        data-te-input-helper-ref
                    >
                        {emptyError
                            ? `${label || "Input"}${emptyError ? " is required." : ""}*`
                            : validationError
                                ? validationMessage
                                : ""}
                    </div>
                )}
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
            </TEInput>
        </>
    );
};

export default TextInput;
