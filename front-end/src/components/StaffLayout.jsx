import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const StaffLayout = () => {
  return (
    <>
      <div className="main-content">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default StaffLayout;
