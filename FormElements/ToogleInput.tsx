"use client";
import React, { useState } from "react";

interface ToggleInputProps {
	labelTitle: string;
	labelStyle?: string;
	containerStyle?: string;
	defaultValue: boolean;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
	labelTitle,
	labelStyle,
	containerStyle,
	defaultValue,
}) => {
	const [value, setValue] = useState(defaultValue);

	const updateToggleValue = () => {
		setValue(!value);
	};

	return (
		<div className={`form-control w-full ${containerStyle}`}>
			<label className="label cursor-pointer">
				<span className={"label-text text-base-content " + labelStyle}>
					{labelTitle}
				</span>
				<input
					type="checkbox"
					className="toggle"
					checked={value}
					onChange={(e) => updateToggleValue()}
				/>
			</label>
		</div>
	);
};

export default ToggleInput;
