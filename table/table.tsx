import Pagination from "../pagination/pagination";
import React from "react";

// Define the props for the Table component
interface TableProps {
  data: Array<any>;
  columns: Array<any>;
  pages?: number;
  activePage?: number;
  onPageChange?: any;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  pages = 0,
  activePage = 1,
  onPageChange = () => {},
}) => {
  return (
    <div className="flex flex-col justify-between">
      <table className="table w-full bg-base-100 shadow-lg min-h-[220px] overflow-y-auto">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(99, 99, 99, 0.3)" }}>
            {columns.map((col, iDx) => (
              <th
                key={iDx}
                style={{
                  borderRight:
                    iDx === columns?.length - 1
                      ? "0px"
                      : "1px solid rgba(99, 99, 99, 0.3)",
                }}
              >
                {col.headerName ?? ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((l: any, k: number) => {
            return (
              <tr key={k}>
                {columns.map((d, iDx) => (
                  <td
                    key={iDx}
                    style={{
                      borderRight:
                        iDx === columns?.length - 1
                          ? "0px"
                          : "1px solid rgba(99, 99, 99, 0.3)",
                    }}
                  >
                    {d?.render ? d.render(l) : l[d.column]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pages > 0 && (
        <div className="flex w-full mt-6 p-3 justify-between items-center">
          <span className="text-[15px]">Total Records:0</span>
          <Pagination
            pages={pages}
            activePage={activePage}
            onPageChange={onPageChange}
          />
          <span className="text-[15px] underline underline-offset-2 cursor-pointer">
            List 10 Records
          </span>
        </div>
      )}
    </div>
  );
};

export default Table;
