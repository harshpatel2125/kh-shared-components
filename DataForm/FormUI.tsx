import React, { FC } from "react";
import { IInputType } from "./enums";
import dynamic from "next/dynamic";
import SelectDropdown from "../select/select";
import AddButton from "./formInputPopup";
import { CustomPopupWrapper } from "../tw-elements";
import FormInputPopup from "./formInputPopup";
import DatePickerReact from "../FormElements/DateTimePicker";
import DateTimePicker from "../form/dateTimePicker";

// move this to /shared/tw-element
const TextInput = dynamic(() => import("../FormElements/TextInput"), {
  ssr: false,
});
const ImageInput = dynamic(() => import("../FormElements/ImageInput"), {
  ssr: false,
});

interface optionsType {
  label: string;
  value: string;
}

export interface IFieldType {
  id?: number | undefined;
  label?: string;
  placeholder?: string;
  key: string;
  value?: string | boolean | Array<any> | Object | undefined;
  selectedOption?: Object;
  type: IInputType;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  column?: string;
  binaryFiles?: any;
  finished?: boolean;
  emptyError?: boolean;
  validationError?: boolean;
  validationMessage?: string;
  showPassword?: boolean;
  options?: Array<optionsType>;
  icon?: React.ReactNode; // @harsh need to implement for showing icon after input
  isFilterType?: boolean;
  showPopup?: boolean;
  popupTitle?: string;
  inputReadOnlyBg?: boolean;
  inputMandatoryBg?: boolean;
  mandatory?: boolean;
  dropdownBtnLabel: string;
  defaultValue?: optionsType;
}

export interface IDataFormReturnType {
  key: string;
  value?: string | boolean | Array<any> | Object | undefined;
  binaryFiles?: any | undefined;
}

interface DataFormProps {
  formState: any;
  setFormState?: any;
  formError?: any;
  handleTogglePassword?: any;
  column?: number;
  containerClassName?: string;
}

const FormUI: FC<DataFormProps> = ({
  formState,
  formError,
  setFormState,
  column,
  containerClassName,
  handleTogglePassword,
}) => {
  //modify
  const getFileUri = (event: any, fieldIndex: any) => {
    const binaryFile = event?.target?.files?.[0];

    if (binaryFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imageUrl = event.target.result;
        setFormState((prev: any) =>
          prev?.map((ele: any, index: number) => {
            if (index === fieldIndex) {
              return {
                ...ele,
                value: imageUrl,
              };
            } else return ele;
          })
        );
      };
      reader.readAsDataURL(binaryFile);
    }
  };

  //modify
  const updateState = (event: any, fieldIndex: number) => {
    setFormState((prev: any) =>
      prev?.map((ele: any, index: number) => {
        if (index === fieldIndex) {
          return {
            ...ele,
            value: event?.target?.value,
            emptyError: false,
          };
        } else return ele;
      })
    );
  };

  //modify
  const updateDropDownState = (event: any, fieldIndex: number) => {
    setFormState((prev: any) =>
      prev?.map((ele: any, index: number) => {
        if (index === fieldIndex) {
          console.log({
            ...ele,
            value: event?.value,
            selectedOption: event,
            emptyError: false,
          });
          return {
            ...ele,
            value: event?.value,
            selectedOption: event,
            emptyError: false,
          };
        } else return ele;
      })
    );
  };

  //modify
  // const handleChange = (
  //   event: any,
  //   fieldIndex: number,
  //   fieldType: IInputType
  // ) => {
  //   switch (fieldType) {
  //     case IInputType.Image:
  //       getFileUri(event, fieldIndex);
  //       break;
  //     case IInputType.DropDown:
  //       console.log(event, fieldIndex);
  //       updateDropDownState(event, fieldIndex);
  //       // getFileUri(event, fieldIndex);
  //       break;
  //     default:
  //       updateState(event, fieldIndex);
  //       break;
  //   }
  // };

  function handleChange(key: any, stateValue: any) {
    setFormState({
      ...formState,
      [key]: { ...formState[key], value: stateValue },
    });
  }

  function handleDropdownChange(key: string, stateValue: any) {
    setFormState({
      ...formState,
      [key]: { ...formState[key], value: stateValue.value },
    });
  }

  //modify
  const renderFields = (ele: any) => {
    //change any to type of parameters field can have
    switch (ele?.type) {
      case IInputType.DateTimePicker:
        return (
          <DateTimePicker
            id={ele?.key}
            label={ele?.label || ele?.key}
            value={ele?.value}
            errorMsg={ele?.errorMsg}
            readOnly={ele?.readOnly}
            required={ele?.required}
            onChange={handleChange}
          />
        );
      case IInputType.Text:
      case IInputType.AutoComplete:
        return (
          <TextInput
            id={ele?.key}
            label={ele?.label || ele?.key}
            value={ele?.value}
            errorMsg={ele?.errorMsg}
            readOnly={!!ele?.readOnly}
            required={!!ele?.required}
            onChange={handleChange}
            className="mb-2"
          />
        );
      case IInputType.Number:
        return (
          <TextInput
            id={ele?.key}
            label={ele?.label || ele?.key}
            value={ele?.value}
            errorMsg={ele?.errorMsg}
            readOnly={ele?.readOnly}
            required={ele?.required}
            onChange={handleChange}
            type="number"
            //
            emptyError={ele?.emptyError}
            // className="mb-2"
          />
        );
      case IInputType.Password:
        return (
          <TextInput
            id={ele?.key}
            label={ele?.label || ele?.key}
            value={ele?.value}
            errorMsg={ele?.errorMsg}
            readOnly={ele?.readOnly}
            required={ele?.required}
            onChange={handleChange}
            type="password"
            togglePassword={() => {}} //write toggle password logic
            showPassword={false} //this should be handled in separate state
            // delete these
            emptyError={ele?.emptyError}
            validationError={ele?.validationError}
            validationMessage={ele?.validationMessage}
            className="mb-2"
          />
        );

      case IInputType.DropDown:
        return (
          // <div className={`${ele.className} mb-2 flex w-100 gap-2`}>
          // <div className="flex-1">
          <>
            <SelectDropdown
              id={ele?.key}
              label={ele?.label || ele?.key}
              value={ele?.selectedOption ? [ele?.selectedOption] : []}
              errorMsg={ele?.errorMsg}
              readOnly={ele?.readOnly}
              required={ele?.required}
              onChange={handleDropdownChange}
              dropdownBtnLabel={ele.dropdownBtnLabel}
              options={
                ele?.options ? ele.options : [{ label: "one", value: "one" }]
              }
              isSearchable={true}
              defaultValue={ele?.defaultValue}
            />
            {/* // </div> */}
            {ele?.showPopup ? (
              <div className="h-full">
                <FormInputPopup title={ele?.popupTitle} />
              </div>
            ) : null}
            {/* // </div> */}
          </>
        );

      case IInputType.Email:
        return (
          <TextInput
            className="mb-2"
            type="email"
            readOnly={ele?.readOnly}
            required={ele?.required}
            label={ele?.label || ele?.key}
            value={ele?.value}
            onChange={handleChange}
            emptyError={ele?.emptyError}
            validationError={ele?.validationError}
            validationMessage={ele?.validationMessage}
          />
        );
      // case IInputType.AutoComplete:
      // 	return (
      // 		<SelectDropdown
      // 			onChange={() => {}}
      // 			options={[
      // 				{
      // 					label: "one",
      // 					value: "one",
      // 				},
      // 			]}
      // 			isMulti={false}
      // 			isSearchable={true}
      // 		/>
      // 	);
      case IInputType.Image:
      case IInputType.File:
        return (
          <div
            className={`row-span-4 flex justify-start mb-2 ${ele?.className}`}
          >
            <ImageInput
              required={ele?.required}
              label={ele?.label}
              selectedImageUri={ele?.value?.toString()}
              onChange={handleChange}
            />
          </div>
        );
      case IInputType.Checkbox:
        return (
          <div className={`col-span-1 `}>
            <div className="flex items-center gap-2 h-7">
              {/* need to be change later with actual component  */}
              <input type="checkbox" name="mycheckbox" id="mycheckbox" />
              <label htmlFor="mycheckbox" className="text-xs text-[#737373]">
                {ele.label}
              </label>
            </div>
          </div>
        );
      default:
        return <TextInput label={ele?.label || ele?.key} />;
    }
  };

  return (
    <>
      <div className="border bg-white rounded">
        <div className="h-full p-3  ">
          <div className={containerClassName}>
            {/* using reusable table header for displaying form buttons */}

            <div className={`grid grid-cols-${column || 3} gap-x-3 gap-y-5`}>
              {!!Object.keys(formState)
                ? Object.values(formState)?.map((field, index) => (
                    <React.Fragment key={index}>
                      {renderFields(field)}
                    </React.Fragment>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUI;
