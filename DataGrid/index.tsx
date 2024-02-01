import React, { useMemo, FC, useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useRouter, usePathname } from "next/navigation";
import {
  CheckboxSelectionCallbackParams,
  HeaderCheckboxSelectionCallbackParams,
} from "@ag-grid-community/core";
import TextInput from "../FormElements/TextInput";
import Button from "../button";
import {
  ArrowPathIcon,
  DocumentArrowDownIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { getIcon } from "@/utils/getIcons";
import { TableCellActionTypes } from "@/constants/tableCols";
import ButtonBorder from "../ButtonGroup/ButtonBorder";
import { TETooltip } from "tw-elements-react";
import GridDropdown from "./GridDropdown";
import { CellEditorComponent } from "ag-grid-community/dist/lib/components/framework/componentTypes";
import CustomPopup from "../popup/index";
import { LocalStorageUtils, getLocalStorage } from "@/utils/localStorage";
import { FunctionPagesApis } from "@/constants/functionPagesApis";
import { IApiRequestsType } from "@/constants/functionPagesApis/apiTypes";
import TaxPatternPopup from "../popup/TaxPatternPopup";
import NotificationIcon from "@/assets/icons/NotificationIcon";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';


var checkboxSelection = function (params: CheckboxSelectionCallbackParams) {
  // we put checkbox on the name if we are not doing grouping
  return params.api.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (
  params: HeaderCheckboxSelectionCallbackParams
) {
  // we put checkbox on the name if we are not doing grouping
  return params.api.getRowGroupColumns().length === 0;
};
const borderBtnStyle: string = "border border-black px-2";

interface IDataGrid {
  rowData: Array<any>;
  columnDefs: Array<any>;
  filter?: boolean;
  onEditPress?: (e: any) => void;
  onDropdownChange?: (rowIndex: number, value: any) => void; // Callback for dropdown
  onTextFieldChange?: (rowIndex: number, value: any) => void; // Callback for text field
  editable?: boolean;
  disablePagination?: boolean;
  defaultPageSize?: number;
  pageSizeSelector?: Array<number>;
  gridHeight?: number | string | undefined | null;
  enableCSVExport?: boolean;
  enablePDFExport?: boolean;
  enableSearch?: boolean;
  propertyForEdit?: string;
  enableEditBtn?: boolean;
  functionType?: string | null;
  pageType?: string | null;
}

const DataGrid: FC<IDataGrid> = ({ rowData, filter, columnDefs, editable, onEditPress, disablePagination, defaultPageSize, pageSizeSelector, gridHeight, enableCSVExport,enablePDFExport, enableSearch, propertyForEdit, enableEditBtn, functionType, pageType, onDropdownChange, onTextFieldChange }) => {
  const gridRef = useRef<AgGridReact>(null);
  const navigateToEditPage = (editId: string, data: any) => {
    if (data && data.id) {
      // Assuming 'edit' is the route for editing, and 'id' is the parameter for the edit page
      router.push(`/edit/${editId}?data=${encodeURIComponent(JSON.stringify(data))}`);
      console.log("Edit ID:", editId); // Log the ID to the console
    } else {
      console.error("Invalid rowData:", data);
    }
  };
  

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

  /** getTooltip utility has been deleted --  */

  // // const updatedColumnDefs = useMemo(() => {

  //   // const renderCell = (e: any) => {
  //   //   const lowercasedSearchValue = quickFilterText.toLowerCase();
  //   //   const originalString = e?.value?.toString().toLowerCase();
  //   //   const isMatch =
  //   //     lowercasedSearchValue &&
  //   //     lowercasedSearchValue !== "" &&
  //   //     lowercasedSearchValue?.length > 0 &&
  //   //     originalString?.includes(lowercasedSearchValue);
  //   //   const splitedString = originalString?.split("");

  //   //   return (
  //   //     <div>
  //   //       {splitedString?.map((char: string, index: number) => (
  //   //         <span
  //   //           key={index}
  //   //           style={{
  //   //             background:
  //   //               isMatch && lowercasedSearchValue?.includes(char)
  //   //                 ? "yellow"
  //   //                 : "",
  //   //           }}
  //   //         >
  //   //           {char}
  //   //         </span>
  //   //       ))}
  //   //     </div>
  //   //   );
  //   // };

  //   // const renderEditCell = (e: any, a: any) => {
  //   //   return (
  //   //     <div className="flex h-full flex-row gap-1 items-center">
  //   //       {getToolTips(cellIcons)}
  //   //     </div>
  //   //   );

  //   // return (
  //   //   <Button
  //   //     onClick={() =>
  //   //       onEditPress &&
  //   //       propertyForEdit &&
  //   //       onEditPress(e?.data?.[propertyForEdit])
  //   //     }
  //   //     icon={<PencilIcon className="h-3 w-3" />}
  //   //     className="px-1 m-0 py-0 bg-transparent hover:bg-transparent"
  //   //   />
  //   // );
  //   // };

  // //   return columnDefs;
  //   // const editColumn = {
  //   //   headerName: "Action",
  //   //   field: "",
  //   //   cellRenderer: renderEditCell,
  //   //   // width: 100,
  //   // };
  //   // const headerColumn = {
  //   //   headerName: "",
  //   //   field: "",
  //   //   checkboxSelection: true,
  //   //   headerCheckboxSelection: true,
  //   //   // width: 50,
  //   // };
  //   // if (enableEditBtn) {
  //   //   return [...newColumnDefs];
  //   // } else return [...newColumnDefs];
  // // }, [quickFilterText, columnDefs]);

  const router = useRouter();
  const pathname = usePathname();

  const isCellRendererType = columnDefs[0]?.hasOwnProperty("isCellrenderer");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<any | null>(null);
  const [showTaxPopup, setShowTaxPopup] = useState<boolean>(false);

  function getClickHandlerCallback(actionType: string, rowData: any) {
    let pageApis =
      functionType &&
      pageType &&
      FunctionPagesApis.hasOwnProperty(functionType) &&
      FunctionPagesApis[functionType][pageType];

    switch (actionType) {
      case TableCellActionTypes.Delete:
        // call detele record
        return () => {
          setSelectedRowData(rowData);
          setShowConfirmation(true);
        };

        case TableCellActionTypes.Edit:
  // call edit record
  return () => {
    if (rowData && rowData.length > 0) {
      const firstRowData = rowData[0]; // Assuming you want the id from the first row
      if (firstRowData && firstRowData.id) {
        // Define the router instance
        const router = useRouter();

        // Fetch data for editing (Replace 'YourAPIEndpoint' with the actual API endpoint)
        fetch(`https://kh-pos-backend-api.onrender.com/api/User/${firstRowData.id}`)
          .then(response => response.json())
          .then(data => {
            // Assuming you have a function to navigate to the edit page
            router.push(`/edit/${firstRowData.id}?data=${encodeURIComponent(JSON.stringify(data))}`);
          })
          .catch(error => console.error('Error fetching data:', error));

        console.log("Edit ID:", firstRowData.id);
      } else {
        console.error("Invalid row data:", firstRowData);
      }
    } else {
      console.error("No row data available");
    }
  };

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
          setShowTaxPopup((prev) => !prev);
        };

      default:
        return () => {
          console.log("button clicked");
        };
    }
  }

  const handleDeleteClick = (rowData: any) => {
    setSelectedRowData(rowData); // Save the selected row data
    setShowConfirmation(true); // Show the confirmation popup
  };
  [selectedRowData];

  const cellRendererFunc = (cellIcons: any) => {
    return (
      <div className="flex h-full flex-row gap-0.5 items-center">
        {cellIcons?.map((item: any, i: number) => {
          const clickHandler = () => {
            const handler = getClickHandlerCallback(
              item?.actionType,
              rowData[i]
            );
            handler();
          };

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
    const actionColumn = columnDefs[0];
    const updatedColumn = {
      headerName: actionColumn.headerName,
      field: actionColumn.field,
      cellRenderer: (params: any) =>
        cellRendererFunc(actionColumn?.cellActions),
    };
    columnDefs[0] = updatedColumn;
    return columnDefs;
  };

  const getNewColumnDefs = () => {
    return columnDefs.map((ele, index) => {
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
    className='ag-theme-balham h-full rounded'
    style={{
      height: gridHeight ? gridHeight : enableSearch || enableCSVExport ? "73vh" : "70vh",
    }}
  >
    {(enableSearch || enableCSVExport || enablePDFExport) && (
      <div
        className='w-full  py-1  px-1  mb-[-2px] rounded-t flex flex-row justify-between content-center border border-s border-gray-300 '
        style={{
          alignItems: "center",
          justifyContent: !enableCSVExport ? "flex-end" : "space-between",
        }}
      >
        <div className='flex gap-2'>
          {enableCSVExport && (
            <>
              {/* ------ Reusable button added -------- */}
              <Button
                className={borderBtnStyle}
                onClick={handleExport}
                btnName='Export to CSV'
              />
            </>
          )}
          {enablePDFExport && (
            <>
              {/* ------ Reusable button added -------- */}
              <Button
                className={borderBtnStyle}
                // onClick={handleExportPDF}
                btnName='Export to PDF'
              />
            </>
          )}
           {enableCSVExport && (
                <Button
                  btnName='Reset All'
                  className={borderBtnStyle}
                  onClick={handleReset}
                  icon={<ArrowPathIcon className='h-3 w-3 ' />}
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
