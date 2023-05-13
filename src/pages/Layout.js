import React from "react";
import { Footer, Header } from "../components";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <Outlet />
      <Footer />
      <div id="modal"></div>
    </div>
  );
};
