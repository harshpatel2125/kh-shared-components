import NotificationIcon from "@/assets/icons/NotificationIcon";
import Adminicon from "@/assets/icons/adminIcon";
import BPMIcon from "@/assets/icons/bpmIcon";
import TicketIcon from "@/assets/icons/ticketIcon";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";

interface Option {
	label: string;
	value: string;
}

interface SelectProps {
	label: string;
	selected?: any;
	options: Option[];
	onChange?: (e: any) => void;
	handleChange: (e: any) => void;
}

interface selectedOption {
	label?: string;
}

const CustomSelect: React.FC<SelectProps> = ({ options, handleChange }) => {
	const [selectedOption, setSelectedOption] = React.useState<selectedOption>({});

	const dropDownRef = useRef<any>(null);

	const renderIcon = (label: string) => {
		switch (label) {
			case "admin":
				return <Adminicon />;
			case "bpm":
				return <BPMIcon />;
			case "ticket":
				return <TicketIcon />;
			case "hrms":
				return <Adminicon />;
			case "subcontract":
				return <BPMIcon />;
			case "order management":
				return <BPMIcon />;
			case "supply chain management":
				return <Adminicon />;
			case "production process":
				return <TicketIcon />;
			default:
				break;
		}
	};
	return (
		<div className="dropdown  ">
			<div className="px-4 mt-3 w-fit rounded-md ">
			<div
				tabIndex={0}
				role="button"
				className="w-56 text-slate-800 flex text-sm  text-left font-normal items-left mt-1 mb-1"
			>
				{selectedOption.label ? selectedOption.label : options[0]?.label}  
				<ChevronDownIcon  className="w-4 ml-3"/> 
				</div>
				
			</div>
			<ul
				tabIndex={0}
				className=" dropdown-content menu border-t-2 border-solid border-accent menu-dropdown-toggle p-1 mt-2 shadow-md z-[9] bg-base-100 rounded flex flex-row min-w-[400px] ml-2"
			>
				{options.map((option, index) => (
					<li
						className="w-1/3 p-1"
						key={index}
						value={option.value}
						onClick={() => {
							setSelectedOption(option);
							if (handleChange) {
								handleChange(option.value);
							}
							const aa: any = document?.activeElement;
							if (aa) {
								aa?.blur();
							}
						}}
					>
						<div className="flex text-salt-700 flex-col items-center font-light text-center justify-center cursor-pointer text-xs ">
							{renderIcon(option?.label?.toLowerCase())}
							{option.label}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
	// return (
	// 	<details
	// 		className="dropdown min-w-[500px]"
	// 		ref={dropDownRef}
	// 		onClick={() => {
	// 			dropDownRef?.current?.removeAttribute("open");
	// 		}}
	// 	>
	// 		<summary className="select select-ghost font-bold items-center mt-1 mb-1">
	// 			{selectedOption.label ? selectedOption.label : options[0]?.label}
	// 		</summary>
	// 		<ul className="dropdown-content menu menu-dropdown-toggle p-2 shadow-md z-[9] bg-base-100 rounded-box flex flex-row">
	// 			{options.map((option, index) => (
	// 				<li
	// 					className="w-1/3 p-2"
	// 					key={index}
	// 					value={option.value}
	// 					onClick={() => {
	// 						setSelectedOption(option);
	// 						if (handleChange) {
	// 							handleChange(option.value);
	// 						}
	// 						dropDownRef?.current?.removeAttribute("open");
	// 					}}
	// 				>
	// 					<div className="flex flex-col items-center text-center justify-center cursor-pointer text-xs font-semibold">
	// 						{renderIcon(option?.label?.toLowerCase())}
	// 						{option.label}
	// 					</div>
	// 				</li>
	// 			))}
	// 		</ul>
	// 	</details>
	// );
};

export default CustomSelect;
