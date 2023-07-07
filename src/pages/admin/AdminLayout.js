import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import { MenuMobile } from "../../components";

import icons from "../../until/icon";
import path from "../../until/path";
const { AiOutlineMenu } = icons;

const AdminLayout = (props) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="w-full h-auto">
      <Sidebar
        isShow={isShow}
        onhandleShow={() => {
          setIsShow(!isShow);
        }}
      />

      <div className={`${isShow ? "md:ml-52" : "md:ml-28"} duration-300 ml-0 max-md:w-full`}>
        <div className="flex items-center justify-between xs:px-5 py-2 md:hidden max-xs:p-2">
          <button
            className="min-w-[40px] md:hidden py-3 mr-4 max-xs:mr-2 active:text-main"
            onClick={() => setIsShow(!isShow)}
          >
            <span>
              <AiOutlineMenu size={25} />
            </span>
          </button>
          <Link to={`/${path.HOME}`} className="shrink">
            <figure>
              <img
                src="	https://cdn.shopify.com/s/files/1/1903/4853/files/logo_digital_new_250x.png?v=1613166683"
                alt="Logo"
              />
            </figure>
          </Link>
        </div>
        <Outlet />
      </div>
      {isShow && (
        <MenuMobile
          shouldCloseOverlayClick
          forAdmin
          open={isShow}
          handleClose={() => setIsShow(false)}
        />
      )}
      <div id="modal"></div>
    </div>
  );
};

AdminLayout.propTypes = {};

export default AdminLayout;
