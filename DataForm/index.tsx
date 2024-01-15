import React, { FC } from "react";
import { IInputType } from "./enums";
import Button, { IButton, IButtonColor } from "../button";
import { useRouter } from "next/navigation";
import {
  CheckIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import SelectDropdown from "../select/select";
import ToggleInput from "../FormElements/ToogleInput";
import TableHeader from "../table/tableHeader";
import { validateEmail, validateMobile } from "@/utils/dataValidation";

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
}

export interface IDataFormReturnType {
  key: string;
  value?: string | boolean | Array<any> | Object | undefined;
  binaryFiles?: any | undefined;
}

interface DataFormProps {
  fields: Array<IFieldType>;
  onSubmit: (e: Array<IDataFormReturnType>) => void;
  column?: number;
  containerClassName?: string;
}

const DataForm: FC<DataFormProps> = ({
  fields,
  onSubmit,
  column,
  containerClassName,
}) => {
  const router = useRouter();

  const [fieldsState, setFieldsState] =
    React.useState<Array<IFieldType>>(fields);

  const [formError, setFormError] = React.useState(false);

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

  const handleChange = (
    event: any,
    fieldIndex: number,
    fieldType: IInputType
  ) => {
    switch (fieldType) {
      case IInputType.Image:
        getFileUri(event, fieldIndex);
        break;
      default:
        updateState(event, fieldIndex);
        break;
    }
  };

  const handleSubmitForm = () => {
    const verifyFormData = fieldsState?.map((ele: IFieldType) => {
      if (
        (ele?.required && !ele?.readOnly) ||
        (ele?.type === IInputType.Email &&
          ele?.value &&
          ele?.value?.toString()?.length > 0) ||
        (ele?.type === IInputType.Phone &&
          ele?.value &&
          ele?.value?.toString()?.length > 0)
      ) {
        if (ele?.type === IInputType.Image || ele?.type === IInputType.File) {
          if (!ele?.binaryFiles || !ele?.value) {
            return {
              ...ele,
              emptyError: true,
            };
          } else return { ...ele, finished: true };
        } else if (
          ele?.type === IInputType.Email &&
          ele?.value &&
          ele?.value?.toString()?.length > 0 &&
          !validateEmail(ele?.value?.toString() || "")
        ) {
          return {
            ...ele,
            validationError: true,
            validationMessage: "Invalid email address.",
          };
        } else if (
          ele?.type === IInputType.Phone &&
          ele?.value &&
          ele?.value?.toString()?.length > 0 &&
          !validateMobile(ele?.value?.toString() || "")
        ) {
          return {
            ...ele,
            validationError: true,
            validationMessage: "Invalid phone number.",
          };
        } else {
          if (!ele?.value && ele?.value === "") {
            return {
              ...ele,
              emptyError: true,
              validationError: false,
            };
          } else return { ...ele, finished: true, validationError: false };
        }
      } else return { ...ele, finished: true };
    });
    setFieldsState(verifyFormData);
    const finished =
      verifyFormData?.filter((ele: IFieldType) => ele?.finished)?.length ===
      fieldsState?.length;
    if (finished) {
      const retrunData: Array<IDataFormReturnType> = fieldsState?.map(
        (ele: IFieldType) => {
          if (ele?.type === IInputType.Image || ele?.type === IInputType.File) {
            return {
              key: ele?.key,
              value: ele?.value,
              binaryFiles: ele?.binaryFiles,
            };
          } else
            return {
              key: ele?.key,
              value: ele?.value,
            };
        }
      );
      onSubmit(retrunData);
    } else {
      setFormError(true);
    }
  };

  const handleTogglePassword = (fieldIndex: number) => {
    setFieldsState((prev: any) =>
      prev?.map((ele: any, index: number) => {
        if (index === fieldIndex) {
          return {
            ...ele,
            showPassword: !ele?.showPassword,
          };
        } else return ele;
      })
    );
  };

  const renderFields = (ele: IFieldType, index: number) => {
    switch (ele?.type) {
      case IInputType.Text:
      case IInputType.DateTimePicker:
      case IInputType.AutoComplete:
        return (
          <TextInput
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
          <div className={`${ele.className}`}>
            <SelectDropdown
              onChange={() => {}}
              options={
                ele?.options ? ele.options : [{ label: "one", value: "one" }]
              }
              isSearchable={true}
            />
          </div>
        );

      case IInputType.Email:
        return (
          <TextInput
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

  const iconButtonClass: string = "h-3 w-3 p-0 m-0";

  return (
    <div className="table-wrapper">
      <div className="h-full p-3">
        <div className={containerClassName}>
          {/* <div className={`w-full mb-5`}>
          <div className="flex justify-end">
            <Button
              color={IButtonColor.Success}
              icon={<CheckIcon className={iconButtonClass} />}
              onClick={handleSubmitForm}
            >
              Save
            </Button>
            <Button
              className="ml-4"
              color={IButtonColor.Error}
              onClick={handleFormDiscard}
              icon={<XMarkIcon className={iconButtonClass} />}
            >
              Discard
            </Button>
          </div>
        </div> */}
          {/* @harsh form submission should be handled by parent of data form (component who is invoking) so we will need to move submit form callback to parent */}

          {/* using reusable table header  */}

          <div
            className={`grid grid-cols-${column || 3} ${
              formError ? "gap-y-4" : "gap-y-3"
            } gap-x-3`}
          >
            {fieldsState &&
              fieldsState?.length > 0 &&
              fieldsState?.map((ele: IFieldType, index: number) => (
                <React.Fragment key={index}>
                  {renderFields(ele, index)}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
