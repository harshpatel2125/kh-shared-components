"use client";

import React, { useState } from "react";
import { GridExample } from "@/shared/AgGrid/agGridWrapper";
import Image from "next/image";
import copy from "../../../assets/icons/copy.png";
import edit from "../../../assets/icons/pen.png";
import reset from "../../../assets/icons/reset.png";
import bin from "../../../assets/icons/bin.png";
import rights from "../../../assets/icons/rights.png";
import close from "../../../assets/icons/close.png";
import TableHeader from "../tableHeader";

const UserTable = () => {
  const [rowData, setRowData] = useState([
    {
      action: "",
      factoryName: "HO",
      subDivision: "Footwear Division	",
      newUser: "MDMAdmin",
      userGroup: "MDM",
      department: "Sourcing",
      email: "Info@Kh.Com	",
      phone_no: "43243242",
      status: "Active",
    },
    {
      action: "",
      factoryName: "GD",
      subDivision: "Glove Division",
      newUser: "GDPD1",
      userGroup: "PD-GD",
      department: "Packing",
      email: "",
      phone_no: "",
      status: "Active",
    },
    {
      action: "",
      factoryName: "HO",
      subDivision: "Footwear Division	",
      newUser: "MDMFWD",
      userGroup: "MDM",
      department: "Packing",
      email: "aniketbshirke07@gmail.com",
      phone_no: "",
      status: "Active",
    },
  ]);

  /**
   * Icons library needs to be manage separately for tables
   */

  /** Column Definitions: Defines & controls grid columns.*/
  const [colDefs, setColDefs] = useState([
    {
      field: "action",
      cellRenderer: (params: any) => {
        const iconName =
          params?.value === "active" ? "check-circle" : "cancel-circle";
        return (
          <div className="flex items-center gap-2 place-content-center align-center justify-center my-auto h-full">
            <div
              className="cursor-pointer tooltip-primary  tooltip tooltip-right"
              onClick={() => alert("edit clicked")}
              data-tip="edit"
            >
              <Image src={edit} alt="edit image" width={12} height={12} />
            </div>
            <div
              className="cursor-pointer tooltip  tooltip-right"
              onClick={() => alert("bin clicked")}
              data-tip="delete"
            >
              <Image src={bin} alt="edit image" width={12} height={12} />
            </div>
            <div
              className="cursor-pointer tooltip  tooltip-right"
              onClick={() => alert("copy clicked")}
              data-tip="rights"
            >
              <Image src={rights} alt="copy image" width={12} height={12} />
            </div>
            <div
              className="cursor-pointer tooltip  tooltip-right"
              onClick={() => alert("reset clicked")}
              data-tip="reset"
            >
              <Image src={close} alt="reset image" width={12} height={12} />
            </div>
            <div
              className="cursor-pointer tooltip  tooltip-left"
              onClick={() => alert("bin clicked")}
              data-tip="copy"
            >
              <Image src={copy} alt="edit image" width={12} height={12} />
            </div>

            <div
              className="cursor-pointer tooltip  tooltip-left"
              onClick={() => alert("reset clicked")}
              data-tip="reset"
            >
              <Image src={reset} alt="reset image" width={12} height={12} />
            </div>
          </div>
        );
      },
    },
    { field: "factoryName" },
    { field: "subDivision" },
    { field: "newUser" },
    { field: "userGroup" },
    { field: "department" },
    { field: "email" },
    { field: "phoneNumber" },
    { field: "status" },
  ]);

  return (
    <div>
      {/* <TableHeader headerButtons={["+ New"]} /> */}
      <GridExample rowData={rowData} colDefs={colDefs} />
    </div>
  );
};

export default UserTable;
