import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const Public = (props) => {
  return (
    <div>
      Public <Outlet />
    </div>
  );
};

Public.propTypes = {};

export default Public;
