"use client";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useMemo } from "react";

// Create new GridExample component
export const GridExample = ({ rowData, colDefs }: any) => {
  // Row Data: The data to be displayed.

  const autoSizeStrategy = {
    type: "fitGridWidth",
  };
  const getRowId = useMemo(() => {
    return (params: any) => {
      console.log(params.data.id);
      return params.data.id;
    };
  }, []);

  return (
    <div
      className={"ag-theme-quartz"}
      style={{
        width: "100vw",
        height: "400px",
        maxWidth: "100%",
        fontSize: "13px",
      }}
    >
      <AgGridReact
        getRowId={getRowId}
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        // autoSizeStrategy={autoSizeStrategy}
        containerStyle={{ borderRadius: "none" }}
      />
    </div>
  );
};
