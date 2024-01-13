import React, { useEffect } from "react";
import SearchIcon from "@/assets/icons/SearchIcon";

interface AutoCompleteCProps {
	options: Array<string>;
	label?: string;
	ref?: any;
	onChange?: any;
	icon?: boolean;
}

const AutoCompleteC: React.FC<AutoCompleteCProps> = ({
	options,
	label = "",
	ref,
	onChange,
	icon = false,
}) => {
	const id = Math.floor(Date.now()).toString();

	useEffect(() => {
		const init = async () => {
			const { Autocomplete, initTE } = await import("tw-elements");
			initTE({ Autocomplete });
			const data = options;
			const dataFilter = (value: any) => {
				return data.filter((item) => {
					return item.toLowerCase().startsWith(value.toLowerCase());
				});
			};
			const basicAutocomplete = document.querySelector(`#autoc-${id}`);
			basicAutocomplete &&
				new Autocomplete(basicAutocomplete, {
					filter: dataFilter,
				});
		};
		init();
	}, [options, id]);

	useEffect(() => {}, [options, id]);

	return (
    <div
      className="relative flex gap-2 items-center peer min-h-[auto] w-full rounded-full border border-gray-200 focus:border-blue-400 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear peer-focus:text-primary motion-reduce:transition-none bg-[#F0F2F1] !shadow-none"
      data-te-input-wrapper-init
      id={`autoc-${id}`}
    >
      {icon && <SearchIcon />}
      <input
        type="text"
        className="bg-transparent outline-none"
        id={id}
        ref={ref}
        onChange={(e) => (onChange ? onChange(e) : {})}
        placeholder={label}
      />
    </div>
  );
};

export default AutoCompleteC;
