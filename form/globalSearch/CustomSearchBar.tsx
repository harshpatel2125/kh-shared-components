import React, { MouseEventHandler, useState } from "react";
import Select, {
    ActionMeta,
    components,
    ControlProps,
    Props,
    StylesConfig,
} from "react-select";
import SearchIcon from "@/assets/icons/SearchIcon";
const primaryColor = "#2C2C2C";
const secondaryColor = "#eeeff1";

interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}
const colourOptions: readonly ColourOption[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#666666', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];
const Control = ({ children, ...props }: ControlProps<ColourOption, false>) => {
    // @ts-ignore
    const { emoji, onEmojiClick } = props.selectProps;
    const style = { cursor: "pointer" };

    return (
        <components.Control {...props}>
            <span onMouseDown={onEmojiClick} style={style}>
                {emoji}
            </span>
            {children}
        </components.Control>
    );
};

const CustomSearchBar = (props: Props<ColourOption>) => {
    // const [clickCount, setClickCount] = useState(0);

    // const onClick: MouseEventHandler<HTMLSpanElement> = (e) => {
    //     setClickCount(clickCount + 1);
    //     e.preventDefault();
    //     e.stopPropagation();
    // };


    const onChange = (
        newValue: ColourOption | ColourOption[] | null,
        actionMeta: ActionMeta<ColourOption>
    ) => {
        // Handle your change logic here
        console.log('Selected Value:', newValue);
    };

    const emoji = <SearchIcon />;

    return (
        <Select
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: "1px solid #d4d4d4",
                    fontSize: "12px",
                    height: "25px",
                    minHeight: "25px",
                    margin: "0px",

                    borderRadius: "14px",
                    padding: "0px 18px",
                    paddingBottom: "0px",
                    paddingTop: "0px",
                    borderColor: state.isFocused ? "#ccc" : "#ccc",
                    outlineColor: state.isFocused ? "ccc" : "#ccc",
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height: "25px",
                    paddingBottom: "0px",
                    paddingTop: "0px",

                    borderRadius: "5px",
                }),
                indicatorSeparator: state => ({
                    display: 'none',
                }),
                indicatorsContainer: (provided, state) => ({
                    ...provided,
                    height: '25px',
                }),
                dropdownIndicator: (provided, state) => ({
                    ...provided,
                    height: "25px",
                    paddingBottom: "0px",
                    paddingTop: "0px",
                    borderRadius: "5px",
                }),
                menuList: (provided, state) => ({
                    ...provided,
                    paddingBottom: "0px",
                    paddingTop: "0px",
                    borderRadius: "3px",
                    color: "#332941",
                    zIndex: "999999",
                    fontSize: "13px",
                }),
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
            {...props}
            // @ts-ignore
            emoji={emoji}
            // onEmojiClick={onClick}
            components={{ Control, DropdownIndicator: null }}
            isSearchable
            isClearable
            name="emoji"
            options={colourOptions}
            onChange={onChange}

        // styles={styles}
        />
    );
};

export default CustomSearchBar;
