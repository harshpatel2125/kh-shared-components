import React, { useMemo, FC, useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRouter, usePathname } from "next/navigation";
import {
  CheckboxSelectionCallbackParams,
  HeaderCheckboxSelectionCallbackParams,
} from "@ag-grid-community/core";
import TextInput from "../FormElements/TextInput";
import Button from "../button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { getIcon } from "@/utils/getIcons";
import { TableCellActionTypes } from "@/constants/tableCols";
import GridDropdown from "./GridDropdown";
import { FunctionPagesApis } from "@/constants/functionPagesApis";

const borderBtnStyle: string = "border border-black px-2";

interface IDataGrid {
  rowData: Array<any>;
  columnDefs: any;
  filter?: boolean;
  onDropdownChange?: (rowIndex: number, value: any) => void; // Callback for dropdown
  onTextFieldChange?: (rowIndex: number, value: any) => void; // Callback for text field
  editable?: boolean;
  disablePagination?: boolean;
  defaultPageSize?: number;
  pageSizeSelector?: Array<number>;
  gridHeight?: number | string | undefined | null;
  enableCSVExport?: boolean;
  enableSearch?: boolean;
  propertyForEdit?: string;
  enableEditBtn?: boolean;
  functionType?: string | null;
  pageType?: string | null;
  enablePDFExport?: any;
  //
  onEditRecord?: any;
}

const DataGrid: FC<IDataGrid> = ({
  rowData,
  filter,
  columnDefs,
  editable,
  disablePagination,
  defaultPageSize,
  pageSizeSelector,
  gridHeight,
  enableCSVExport,
  enablePDFExport,
  enableSearch,
  propertyForEdit,
  enableEditBtn,
  functionType,
  pageType,
  onDropdownChange,
  onTextFieldChange,
  //

  onEditRecord,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const [quickFilterText, setQuickFilterText] = React.useState("");

  const defaultColDef = useMemo<any>(() => {
    return {
      headerClass: "bg-base-50 text-slate-700", // Add this line to set the default header class
      editable: editable || true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: false,
      filter: filter || true,
      cellStyle: function (params: any) {
        if (typeof params.value === "number") {
          return { textAlign: "right" };
        } else {
          return null;
        }
      },
    };
  }, [editable, filter]);

  const router = useRouter();

  const isCellRendererType =
    columnDefs?.actions?.hasOwnProperty("isCellrenderer");

  function getClickHandlerCallback(params: any, actionType: string) {
    switch (actionType) {
      case TableCellActionTypes.Delete:
        // call detele record
        return () => {
          // setSelectedRowData(rowData);
        };

      case TableCellActionTypes.Edit:
        // call edit record
        return () => onEditRecord(params);

      case TableCellActionTypes.Rights:
        // call rights record
        return () => {
          router.push("/user-management/user-rights");
        };

      case TableCellActionTypes.Reset:
        // call reset record
        return () => {
          console.log("reset clicked");
        };

      case TableCellActionTypes.Suspend:
        // call suspend record
        return () => {
          console.log("Suspend clicked");
        };

      case TableCellActionTypes.showTaxPopup:
        // call suspend record

        return () => {
          console.log("tax pattern handle");
        };

      default:
        return () => {
          console.log("button clicked");
        };
    }
  }

  const cellRendererFunc = (params: any, cellIcons: any) => {
    return (
      <div className="flex h-full flex-row gap-0.5 items-center">
        {cellIcons?.map((item: any, i: number) => {
          const clickHandler = getClickHandlerCallback(
            params,
            item?.actionType
          );

          return (
            <div
              key={i}
              className="tooltip tooltip-right"
              data-tip={item?.icon}
            >
              <div
                className={`py-0.5 px-1 rounded-sm hover:bg-slate-300 cursor-pointer`}
                onClick={clickHandler}
              >
                {getIcon(item?.icon)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getUpdatedColumnDefs = () => {
    const actionColumn = columnDefs?.actions;
    const updatedColumn = {
      headerName: actionColumn.headerName,
      field: actionColumn.field,
      cellRenderer: (params: any) =>
        cellRendererFunc(params, actionColumn?.cellActions),
    };

    columnDefs.actions = updatedColumn;

    return columnDefs;
  };

  const getNewColumnDefs = () => {
    return Object.values(columnDefs).map((ele, index) => {
      if (ele?.dropdown) {
        return {
          ...ele,
          cellEditor: GridDropdown,
          cellEditorParams: {
            onDropdownChange: (value: any) => {
              // Handle dropdown change
              if (onDropdownChange) {
                onDropdownChange(index, value);
              }
            },
          },
          editable: true,
        };
      } else if (ele?.textField) {
        return {
          ...ele,
          cellEditor: TextInput,
          cellEditorParams: {
            onTextFieldChange: (value: any) => {
              // Handle text field change
              if (onTextFieldChange) {
                onTextFieldChange(index, value);
              }
            },
          },
          editable: true,
        };
      } else return ele;
    });
  };

  const handleExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  // const handleExportPDF = useCallback(() => {
  //   const gridApi = gridRef.current?.api;

  //   if (gridApi) {
  //     const params = {
  //       fileName: "exported-data.pdf",
  //       onlySelected: false,
  //       exportMode: undefined,
  //     };

  //     gridApi.exportDataAsCsv(params).then((data) => {
  //       const jsonData = gridApi.api.getDataAsCsv(params);
  //       const rows = jsonData.split("\n");
  //       const header = rows[0].split(",");
  //       const tableData = rows.slice(1).map((row) => row.split(","));

  //       const pdfDoc = new jsPDF();

  //       // Add data to the PDF document using autotable
  //       pdfDoc.autoTable({
  //         head: [header],
  //         body: tableData,
  //       });

  //       pdfDoc.save(params.fileName);
  //     });
  //   }
  // }, []);

  const handleSearch = (e: any) => {
    gridRef.current!.api.setGridOption("quickFilterText", e?.target?.value);
    setQuickFilterText(e?.target?.value);
  };

  const handleReset = () => {
    setQuickFilterText("");
    gridRef.current!.api.setFilterModel(null);
    gridRef.current!.api.setGridOption("quickFilterText", "");
  };

  const autoSizeStrategy: any = {
    type: "fitGridWidth",
    width: 1500,
  };

  return (
    <div
      className="ag-theme-balham h-full rounded"
      style={{
        height: gridHeight
          ? gridHeight
          : enableSearch || enableCSVExport
          ? "76vh"
          : "78vh",
      }}
    >
      {(enableSearch || enableCSVExport || enablePDFExport) && (
        <div
          className="w-full  pb-1   mb-[-2px] rounded-t flex flex-row justify-between content-center "
          style={{
            alignItems: "center",
            justifyContent: !enableCSVExport ? "flex-end" : "space-between",
          }}
        >
          <div className="flex gap-2">
            {enableCSVExport && (
              <>
                {/* ------ Reusable button added -------- */}
                <Button
                  className={borderBtnStyle}
                  onClick={handleExport}
                  btnName="Export to CSV"
                />
              </>
            )}
            {enablePDFExport && (
              <>
                {/* ------ Reusable button added -------- */}
                <Button
                  className={borderBtnStyle}
                  // onClick={handleExportPDF}
                  btnName="Export to PDF"
                />
              </>
            )}
            {enableCSVExport && (
              <Button
                btnName="Reset All"
                className={borderBtnStyle}
                onClick={handleReset}
                icon={<ArrowPathIcon className="h-3 w-3 " />}
              />
            )}
          </div>

          {enableSearch && (
            <div className="flex gap-2 content-center ">
              <div className="w-full">
                {/* <TextInput
                  className='h-7  '
                  // label="Search . . ."
                  value={quickFilterText}
                  // formWhite={true}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                /> */}
                <input
                  className="border border-slate-300 focus:outline-none focus:border-slate-900 rounded py-[4px] w-52 px-3"
                  placeholder="search . . . "
                  value={quickFilterText}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                ></input>
              </div>
            </div>
          )}
        </div>
      )}
      <AgGridReact
        autoSizeStrategy={autoSizeStrategy}
        ref={gridRef}
        rowData={rowData}
        columnDefs={
          isCellRendererType ? getUpdatedColumnDefs() : getNewColumnDefs()
        }
        defaultColDef={defaultColDef}
        pivotPanelShow={"always"}
        rowGroupPanelShow={"always"}
        suppressRowClickSelection={true}
        suppressMovableColumns={true}
        suppressMoveWhenRowDragging={true}
        groupSelectsChildren={true}
        rowSelection={"multiple"}
        enableRangeSelection={true}
        suppressExcelExport={true}
        suppressScrollOnNewData={false}
        // Pagination Props
        pagination={disablePagination ? false : true}
        paginationPageSize={defaultPageSize || 10}
        paginationPageSizeSelector={pageSizeSelector || [10, 20, 50]}
      />
      {/* <TaxPatternPopup
        showPopup={showTaxPopup}
        setShowPopup={setShowTaxPopup}
        amount="25"
        taxPattern="pattern"
        taxPercentage="percentage"
      /> */}
      {/* <CustomPopup
        title="Are you sure to delete this data?"
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
      >
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            onClick={handleConfirm}
          >
            Submit
          </button>
        </div>
      </CustomPopup> */}
    </div>
  );
};

export default DataGrid;
