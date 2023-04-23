import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation } from "../../components";
import PropTypes from "prop-types";

const Public = (props) => {
  return (
    <div className="w-full h-full">
      <Header />
      <Navigation />
      <div className="m-auto main-width h-full mt-5">
        {" "}
        <Outlet />
      </div>
    </div>
  );
};

Public.propTypes = {};

export default Public;
