"use client";
import { useRouter } from "next/navigation";
import React from "react";
import FormUI, { IDataFormReturnType, IFieldType } from "./FormUI";
import { IInputType } from "./enums";
import { validateEmail, validateMobile } from "@/utils/dataValidation";
import TableHeader from "../table/tableHeader";

/**
 * All form related business logic will be
 * in this parent component of forms
 */

const DataFormWrapper = ({ data, formFields }: any) => {
  const [fieldsState, setFieldsState] = React.useState(formFields);
  const [formError, setFormError] = React.useState(false);
  const router = useRouter();

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
    console.log(verifyFormData, "finished");

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
      console.log(retrunData, "submitted");
      // onSubmit(retrunData);
    } else {
      setFormError(true);
    }
  };

  //  --------------------------------------

  const handleGoBack = () => {
    router.back();
  };

  console.log(data, "data");

  if (!data) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p>No such route: 404</p>
      </div>
    );
  }

  const { THButtons, THtitle, column, showTableHeader, tableContainerCss } =
    data;

  return (
    <div className="m-0">
      {showTableHeader ? (
        <TableHeader
          headerButtons={THButtons}
          title={THtitle}
          handleGoBack={handleGoBack}
          handleFormSubmission={handleSubmitForm}
        />
      ) : null}
      <FormUI
        // formState={formFields}
        formState={fieldsState}
        setFormState={setFieldsState}
        column={column ? column : 3}
        formError={formError}
        containerClassName={tableContainerCss}
      />
    </div>
  );
};

export default DataFormWrapper;
