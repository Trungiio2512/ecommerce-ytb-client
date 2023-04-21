import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation } from "../../components";
import PropTypes from "prop-types";

const Public = (props) => {
  return (
    <div className="w-full ">
      <Header />
      <Navigation />
      <div className="m-auto w-main">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};

Public.propTypes = {};

export default Public;
