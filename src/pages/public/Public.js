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
    <div className="w-full h-full">
      <Header />
      <Navigation />
      <div className="main-width h-auto mt-5">
        {" "}
        <Outlet />
      </div>{" "}
      <Footer />
    </div>
  );
};

Public.propTypes = {};

export default Public;
