import React, { useState } from "react";
import Button from "@/shared/button";
import AddIcon from "@/assets/icons/AddIcon";
import CustomPopup from "../popup";
import TextInput from "../FormElements/TextInput";
import DataGrid from "../DataGrid";
import { TableCellActionTypes, tableActionsCell } from "@/constants/tableCols";
import { Icons } from "@/utils/getIcons";
import generateRandomData from "@/utils/generateRandomData";

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
      cellActions: [
        { icon: Icons.Bin, actionType: TableCellActionTypes.Delete },
      ],
    },
    { headerName: "Code", field: "code" },

    { headerName: "Name", field: "name" },
  ];

  return (
    <>
      <Button
        icon={<AddIcon />}
        onClick={handleClick}
        className="bg-secondary hover:bg-tertiary"
      />

      <CustomPopup
        title={title}
        showModal={showPopup}
        setShowModal={setShowPopup}
      >
        <div className="flex flex-col gap-5">
          <div className="p_form">
            <form action="" className="flex gap-3">
              <div className="flex-1">
                <TextInput
                  required={true}
                  // emptyError={ele?.emptyError}
                  label={"Code"}
                  value={code}
                  // onChange={(e) => handleChange(e, val)}
                />
              </div>
              <div className="flex-1">
                <TextInput
                  required={true}
                  // emptyError={ele?.emptyError}
                  label={"Name"}
                  value={name}
                  // onChange={(e) => handleChange(e, val)}
                />
              </div>
              <Button
                onClick={handleClick}
                className="bg-tertiary hover:bg-tertiary px-5 text-white"
              >
                Save
              </Button>
            </form>
          </div>
          <div className="p_table  overflow-hidden ">
            <DataGrid
              rowData={generateRandomData(25, columnDefs)}
              columnDefs={columnDefs}
              enableSearch
              enableEditBtn
              defaultPageSize={10}
            />
          </div>
        </div>
      </CustomPopup>
    </>
  );
};

export default FormInputPopup;
