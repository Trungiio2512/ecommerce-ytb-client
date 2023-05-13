import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation } from "../../components";
import PropTypes from "prop-types";

// const Footer = lazy(() => fakeDelay(import("../../components/Footer")));
const fakeDelay = (promise) => {
  return new Promise((resolve) => setTimeout(resolve, 3000)).then(() => promise);
};
const Public = (props) => {
  return (
    <div className="w-full">
      <Navigation />
      <div className="main-width h-auto ">
        {" "}
        <Outlet />
      </div>{" "}
    </div>
  );
};

Public.propTypes = {};

export default Public;
