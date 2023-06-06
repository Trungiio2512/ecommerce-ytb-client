import React, { useState } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Sidebar from "./component/Sidebar";

const AdminLayout = (props) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div className="w-full h-auto">
      <Sidebar
        isShow={isShow}
        onhandleShow={() => {
          setIsShow(!isShow);
        }}
      />
      <div className={`${isShow ? "md:ml-52" : "md:ml-28"} duration-300 ml-0`}>
        <Outlet />
      </div>
    </div>
  );
};

AdminLayout.propTypes = {};

export default AdminLayout;
