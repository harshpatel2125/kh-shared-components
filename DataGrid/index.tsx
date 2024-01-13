import React, { useMemo, FC, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
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
    };
  }, [editable, filter]);

  const updatedColumnDefs = useMemo(() => {
    const renderCell = (e: any) => {
      const lowercasedSearchValue = quickFilterText.toLowerCase();
      const originalString = e?.value?.toString().toLowerCase();
      const isMatch =
        lowercasedSearchValue &&
        lowercasedSearchValue !== "" &&
        lowercasedSearchValue?.length > 0 &&
        originalString.includes(lowercasedSearchValue);
      const splitedString = originalString?.split("");

      return splitedString?.map((char: string, index: number) => (
        <span
          key={index}
          style={{
            background:
              isMatch && lowercasedSearchValue?.includes(char) ? "yellow" : "",
          }}
        >
          {char}
        </span>
      ));
    };
    const renderEditCell = (e: any, a: any) => {
      return (
        <Button
          onClick={() =>
            onEditPress &&
            propertyForEdit &&
            onEditPress(e?.data?.[propertyForEdit])
          }
          icon={<PencilIcon className="h-3 w-3" />}
          className="px-1 m-0 py-0 bg-transparent hover:bg-transparent"
        />
      );
    };
    const newColumnDefs = columnDefs?.map((ele) => {
      if (ele?.checkboxSelection && ele?.headerCheckboxSelection) {
        return {
          ...ele,
          checkboxSelection: checkboxSelection,
          headerCheckboxSelection: headerCheckboxSelection,
          cellRenderer: renderCell,
        };
      } else if (ele?.checkboxSelection) {
        return {
          ...ele,
          checkboxSelection: checkboxSelection,
          cellRenderer: renderCell,
        };
      } else if (ele?.headerCheckboxSelection) {
        return {
          ...ele,
          headerCheckboxSelection: headerCheckboxSelection,
          cellRenderer: renderCell,
        };
      } else
        return {
          ...ele,
          cellRenderer: renderCell,
        };
    });
    const editColumn = {
      headerName: "",
      field: "",
      cellRenderer: renderEditCell,
      width: 50,
    };
    const headerColumn = {
      headerName: "",
      field: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      // width: 50,
    };
    if (enableEditBtn) {
      return [headerColumn, editColumn, ...newColumnDefs];
    } else return [headerColumn, ...newColumnDefs];
  }, [
    quickFilterText,
    columnDefs,
    onEditPress,
    propertyForEdit,
    enableEditBtn,
  ]);

  const handleExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  const handleSearch = (e: any) => {
    setQuickFilterText(e?.target?.value);
  };

  const handleReset = () => {
    setQuickFilterText("");
    gridRef.current!.api.setFilterModel(null);
    gridRef.current!.api.setGridOption("quickFilterText", "");
  };
  const autoSizeStrategy: any = {
    type: "fitGridWidth",
    columnLimits: [
      {
        colId: "0",
        minWidth: 40,
        maxWidth: 40,
      },
    ],
  };
  return (
    <div
      className="ag-theme-balham h-full"
      style={{
        height: gridHeight
          ? gridHeight
          : enableSearch || enableCSVExport
          ? "75vh"
          : "80vh",
      }}
    >
      {(enableSearch || enableCSVExport) && (
        <div
          className="w-full  py-1  px-3 mb-[-2px] rounded-t-[7px] flex flex-row justify-between content-center border border-s border-gray-300 rounded-none"
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
              <div className="w-60 mr-8 ms-auto">
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
        columnDefs={updatedColumnDefs}
        defaultColDef={defaultColDef}
        pivotPanelShow={"always"}
        rowGroupPanelShow={"always"}
        suppressRowClickSelection={true}
        suppressMovableColumns={false}
        suppressMoveWhenRowDragging={false}
        groupSelectsChildren={true}
        rowSelection={"multiple"}
        enableRangeSelection={true}
        suppressExcelExport={true}
        // Pagination Props
        pagination={disablePagination ? false : true}
        paginationPageSize={defaultPageSize || 20}
        paginationPageSizeSelector={pageSizeSelector || [10, 20, 50]}
      />
    </div>
  );
};

export default DataGrid;
