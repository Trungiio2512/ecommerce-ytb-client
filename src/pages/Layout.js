import React, { useState } from "react";
import { Footer, Header, MenuMobile, Navigation } from "../components";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full min-h-screen">
      <Header open={open} handleOpen={setOpen} />
      <Navigation open={open} handleOpen={setOpen} />
      <Outlet />
      <Footer />
      {open && <MenuMobile open={open} handleClose={() => setOpen(false)} />}
      <div id="modal"></div>
    </div>
  );
};
