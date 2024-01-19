import React, { useMemo, FC, useCallback, useRef } from "react";
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

interface IDataGrid {
  rowData: Array<any>;
  columnDefs: Array<any>;
  filter?: boolean;
  onEditPress?: (e: any) => void;
  editable?: boolean;
  disablePagination?: boolean;
  defaultPageSize?: number;
  pageSizeSelector?: Array<number>;
  gridHeight?: number | string | undefined | null;
  enableCSVExport?: boolean;
  enableSearch?: boolean;
  propertyForEdit?: string;
  enableEditBtn?: boolean;
}

const DataGrid: FC<IDataGrid> = ({
  rowData,
  filter,
  columnDefs,
  editable,
  onEditPress,
  disablePagination,
  defaultPageSize,
  pageSizeSelector,
  gridHeight,
  enableCSVExport,
  enableSearch,
  propertyForEdit,
  enableEditBtn,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const [quickFilterText, setQuickFilterText] = React.useState("");

  const defaultColDef = useMemo<any>(() => {
    return {
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

  function getClickHandlerCallback(actionType: string) {
    switch (actionType) {
      case TableCellActionTypes.Delete:
        // call detele record
        return () => {
          console.log("delete clicked");
        };

      case TableCellActionTypes.Edit:
        // call edit record

        return () => {
          router.push(`${pathname}/create`);
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

      default:
        return () => {
          console.log("button clicked");
        };
    }
  }

  const cellRendererFunc = (cellIcons: any) => {
    return (
      <div className="flex h-full flex-row gap-1 items-center">
        {cellIcons?.map((item: any, i: number) => {
          const clickHandler = getClickHandlerCallback(item?.actionType);

          return (
            <div
              key={i}
              className={`py-0.5 px-1 rounded-sm  border hover:bg-slate-300 cursor-pointer tooltip ${
                i <= 3 ? "tooltip-right" : "tooltip-left"
              }`}
              data-tip={item?.icon}
              onClick={clickHandler}
            >
              {getIcon(item?.icon)}
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
      cellRenderer: () => cellRendererFunc(actionColumn?.cellActions),
    };

    columnDefs[0] = updatedColumn;
    return columnDefs;
  };

  // if()

  const handleExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

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
          ? "71vh"
          : "74vh",
      }}
    >
      {(enableSearch || enableCSVExport) && (
        <div
          className="w-full  py-1  px-3  mb-[-2px] rounded-t flex flex-row justify-between content-center border border-s border-gray-300 "
          style={{
            alignItems: "center",
            justifyContent: !enableCSVExport ? "flex-end" : "between",
          }}
        >
          {enableCSVExport && (
            <Button
              color="tertiary"
              onClick={handleExport}
              icon={<DocumentArrowDownIcon className="h-3 w-3" />}
            >
              Export to CSV
            </Button>
          )}
          {enableSearch && (
            <div className="flex content-center">
              <div className="w-60  ms-auto">
                <TextInput
                  label="Search"
                  value={quickFilterText}
                  // formWhite={true}
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                />
              </div>
              {enableCSVExport && (
                <Button
                  color="tertiary"
                  onClick={handleReset}
                  icon={<ArrowPathIcon className="h-3 w-3" />}
                  className="ms-8"
                >
                  Reset All
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      <AgGridReact
        autoSizeStrategy={autoSizeStrategy}
        ref={gridRef}
        rowData={rowData}
        columnDefs={isCellRendererType ? getUpdatedColumnDefs() : columnDefs}
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
    </div>
  );
};

export default DataGrid;
