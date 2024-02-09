"use client";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// Create new GridExample component
export const GridExample = ({ rowData, colDefs }: any) => {
  // Row Data: The data to be displayed.

  const autoSizeStrategy = {
    type: "fitGridWidth",
  };

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
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        // autoSizeStrategy={autoSizeStrategy}
        containerStyle={{ borderRadius: "none" }}
      />
    </div>
  );
};
