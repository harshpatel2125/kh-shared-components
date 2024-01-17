import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
const primaryColor = "#2C2C2C";
const secondaryColor = "#eeeff1";

interface Option {
	label?: any;
	value?: any;
}

//  new

interface SelectDropdownProps {
	label?: string;
	isSearchable?: boolean;
	options?: Option[];
	isLoading?: boolean;
	value?: Option | Option[] | null;
	onChange?: (newValue: any) => void;
	onCreateOption?: (inputValue: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
	label,
	isSearchable,
	options,
	isLoading,
	value,
	onChange = () => { },
	onCreateOption,
}) => {
	const [labelColor, setLabelColor] = useState<any>(false);

	return (
		<div className="relative">
			<CreatableSelect
				styles={{
					option: (base) => ({
						...base,
						borderBottom: "1px solid #f1f3f9",
						height: '100%',
						margin: "0px",
						paddingBottom: "3px",
						paddingTop: "3px",
						zIndex: "999",
						borderRadius: "3px",
					}),
					control: (baseStyles, state) => ({
						...baseStyles,
						fontSize: "14px",
						minHeight: "26px",
						margin: "0px",
						border: "1px solid #ccc",
						borderRadius: "3px",
						padding: "0px",
						paddingBottom: "0px",
						paddingTop: "0px",
						borderColor: state.isFocused ? "#ccc" : "#ccc",
						outlineColor: state.isFocused ? "ccc" : "#ccc",

					}),
					valueContainer: (provided, state) => ({
						...provided,
						height: "27px",
						paddingBottom: "0px",
						paddingTop: "0px",
						borderRadius: "3px",
						fontSize: "12px",


					}),

					indicatorSeparator: (state) => ({
						display: "none",
					}),
					indicatorsContainer: (provided, state) => ({
						...provided,
						height: "26px",
					}),
					dropdownIndicator: (provided, state) => ({
						...provided,
						height: "26px",
						paddingBottom: "0px",
						paddingTop: "0px",
						borderRadius: "3px",

					}),
					menuList: (provided, state) => ({
						...provided,
						paddingBottom: "0px",
						paddingTop: "0px",
						borderRadius: "3px",
						color: "#332941",
						zIndex: "999999",

					}),
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 3,

					colors: {
						...theme.colors,
						primary25: "#eeeff1",
						primary: primaryColor,
					},
				})}
				onFocus={() => setLabelColor(true)}
				onBlur={() => setLabelColor(false)}
				isSearchable={isSearchable}
				isClearable
				isDisabled={isLoading}
				isLoading={isLoading}
				onChange={(newValue) => onChange(newValue)}
				onCreateOption={onCreateOption}
				options={options}
				value={value}
			/>
			<label className={`font-light   absolute selectDropDown ${labelColor ? "text-blue-800" : "text-slate-700"} `}>{label ? label : "Label"}</label>		</div>
	);
};

export default SelectDropdown;
