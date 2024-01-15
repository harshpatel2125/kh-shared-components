import React from "react";

const Drawer = ({
  drawerId,
  openSide,
  children,
}: {
  drawerId: string | undefined;
  openSide: string;
  children: any;
}) => {
  return (
    <div
      className={`drawer table-drawer ${openSide ? openSide : "drawer-start"}`}
    >
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-20">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-96  h-full bg-base-200 text-base-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
