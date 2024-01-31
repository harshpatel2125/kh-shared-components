"use client";

import React, { useState } from "react";
import Button from "@/shared/button";
import AddIcon from "@/assets/icons/AddIcon";
import TextInput from "../FormElements/TextInput";
import DataGrid from "../DataGrid";
import { TableCellActionTypes, tableActionsCell } from "@/constants/tableCols";
import { Icons } from "@/utils/getIcons";
import generateRandomData from "@/utils/generateRandomData";
import { CustomPopupWrapper } from "../tw-elements";

const FormInputPopup = ({ title }: { title: string | undefined }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();

  const handleClick = () => {
    setShowPopup((prev) => !prev);
  };

  const columnDefs = [
    {
      headerName: "Action",
      field: "",
      isCellrenderer: true,
      cellActions: [{ icon: Icons.Bin, actionType: TableCellActionTypes.Delete }],
    },
    { headerName: "Code", field: "code" },

    { headerName: "Name", field: "name" },
  ];

  return (
    <>
      <Button
        icon={<AddIcon />}
        onClick={handleClick}
        className=' btn-outline border-stone-400  h-full rounded-sm px-1'
      />

      <CustomPopupWrapper
        title={title}
        showModal={showPopup}
        setShowModal={setShowPopup}
      >
        <div className='flex flex-col gap-5'>
          <div>
            <form
              action=''
              className=' flex gap-3 items-center'
            >
              <div className='flex-1'>
                <TextInput
                  required={true}
                  // emptyError={ele?.emptyError}
                  label={"Code"}
                  value={code}
                  // onChange={(e) => handleChange(e, val)}
                />
              </div>
              <div className='flex-1'>
                <TextInput
                  required={true}
                  // emptyError={ele?.emptyError}
                  label={"Name"}
                  value={name}
                  // onChange={(e) => handleChange(e, val)}
                />
              </div>
            </form>
          </div>
          <div className='p_table  overflow-hidden pb-9'>
            <DataGrid
              rowData={generateRandomData(7, columnDefs)}
              columnDefs={columnDefs}
              enableSearch
              enableEditBtn
              defaultPageSize={10}
              gridHeight={250}
            />
          </div>
          <div className=' flex justify-end'>
            <Button
              onClick={handleClick}
              className='bg-black rounded  text-white px-5 py-1.5 '
            >
              Save
            </Button>
          </div>
        </div>
      </CustomPopupWrapper>
    </>
  );
};

export default FormInputPopup;
