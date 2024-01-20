import React, { FC } from "react";
import { IInputType } from "./enums";
import dynamic from "next/dynamic";
import SelectDropdown from "../select/select";
import AddButton from "./formInputPopup";
import { CustomPopupWrapper } from "../tw-elements";
import FormInputPopup from "./formInputPopup";

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
}

export interface IDataFormReturnType {
  key: string;
  value?: string | boolean | Array<any> | Object | undefined;
  binaryFiles?: any | undefined;
}

interface DataFormProps {
  setFieldsState?: any;
  handleTogglePassword?: any;
  column?: number;
  containerClassName?: string;
  formError: any;
  formState: any;
}

{
  /** @harsh form submission should be handled by parent of dataForm (component who is invoking) so  moving form callbacks to parent
   *  check --> user-management/user/create
   *
   */
}

const FormUI: FC<DataFormProps> = ({
  column,
  containerClassName,
  formError,
  formState,
  handleTogglePassword,
  setFieldsState,
}) => {
  const getFileUri = (event: any, fieldIndex: any) => {
    const binaryFile = event?.target?.files?.[0];
    if (binaryFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imageUrl = event.target.result;
        setFieldsState((prev: any) =>
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

  const updateState = (event: any, fieldIndex: number) => {
    setFieldsState((prev: any) =>
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

  const updateDropDownState = (event: any, fieldIndex: number) => {
    setFieldsState((prev: any) =>
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

  const handleChange = (
    event: any,
    fieldIndex: number,
    fieldType: IInputType
  ) => {
    switch (fieldType) {
      case IInputType.Image:
        getFileUri(event, fieldIndex);
        break;
      case IInputType.DropDown:
        console.log(event, fieldIndex);
        updateDropDownState(event, fieldIndex);
        // getFileUri(event, fieldIndex);
        break;
      default:
        updateState(event, fieldIndex);
        break;
    }
  };

  const renderFields = (ele: IFieldType, index: number) => {
    switch (ele?.type) {
      case IInputType.Text:
      case IInputType.DateTimePicker:
      case IInputType.AutoComplete:
        return (
          <TextInput
            inputReadOnlyBg={ele.inputReadOnlyBg}
            inputMandatoryBg={ele.inputMandatoryBg}
            readOnly={ele?.readOnly}
            required={ele?.required}
            emptyError={ele?.emptyError}
            label={ele?.label || ele?.key}
            value={ele?.value}
            onChange={(e) => handleChange(e, index, ele?.type)}
          />
        );
      case IInputType.Number:
        return (
          <TextInput
            inputReadOnlyBg={ele.inputReadOnlyBg}
            inputMandatoryBg={ele.inputMandatoryBg}
            type="number"
            readOnly={ele?.readOnly}
            required={ele?.required}
            emptyError={ele?.emptyError}
            label={ele?.label || ele?.key}
            value={ele?.value}
            onChange={(e) => handleChange(e, index, ele?.type)}
          />
        );
      case IInputType.Password:
        return (
          <TextInput
            inputReadOnlyBg={ele.inputReadOnlyBg}
            inputMandatoryBg={ele.inputMandatoryBg}
            type="password"
            readOnly={ele?.readOnly}
            required={ele?.required}
            label={ele?.label || ele?.key}
            value={ele?.value}
            onChange={(e) => handleChange(e, index, ele?.type)}
            togglePassword={() => handleTogglePassword(index)}
            showPassword={ele?.showPassword}
            emptyError={ele?.emptyError}
            validationError={ele?.validationError}
            validationMessage={ele?.validationMessage}
          />
        );

      case IInputType.DropDown:
        return (
          <div className={`${ele.className} flex w-100 gap-2`}>
            <div className="flex-1">
              <SelectDropdown
                label={ele?.label || "label"}
                onChange={(e) => handleChange(e, index, ele?.type)}
                options={
                  ele?.options ? ele.options : [{ label: "one", value: "one" }]
                }
                isSearchable={true}
                value={ele?.selectedOption ? [ele?.selectedOption] : []}
              />
            </div>
            {ele?.showPopup ? (
              <div>
                <FormInputPopup title={ele?.popupTitle} />
              </div>
            ) : null}
          </div>
        );

      case IInputType.Email:
        return (
          <TextInput
            inputReadOnlyBg={ele.inputReadOnlyBg}
            inputMandatoryBg={ele.inputMandatoryBg}
            type="email"
            readOnly={ele?.readOnly}
            required={ele?.required}
            label={ele?.label || ele?.key}
            value={ele?.value}
            onChange={(e) => handleChange(e, index, ele?.type)}
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
          <div className={`row-span-4 flex justify-start ${ele?.className}`}>
            <ImageInput
              selectedImageUri={ele?.value?.toString()}
              onChange={(e) => handleChange(e, index, ele?.type)}
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
      <div className="table-wrapper  bg-white rounded" style={{ height: "82vh" }}>
        <div className="h-full p-3 ">
          <div className={containerClassName}>
            {/* using reusable table header for displaying form buttons */}

            <div
              className={`grid grid-cols-${column || 3} ${
                formError ? "gap-y-6" : "gap-y-3"
              } gap-x-3`}
            >
              {formState &&
                formState?.length > 0 &&
                formState?.map((ele: IFieldType, index: number) => (
                  <React.Fragment key={index}>
                    {renderFields(ele, index)}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUI;
