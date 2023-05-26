import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Sidebar from "./component/Sidebar";

const AdminLayout = (props) => {
  return (
    <div className="w-full flex  min-h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};

AdminLayout.propTypes = {};

export default AdminLayout;
