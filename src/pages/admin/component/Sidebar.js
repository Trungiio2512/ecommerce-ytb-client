import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { menuAdmin } from "../../../until/menu";
import path from "../../../until/path";
import icons from "../../../until/icon";
const { AiOutlineLeft } = icons;
const Sidebar = (props) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div
      className={`hidden lg:block ${
        isShow ? "w-52" : "w-28"
      } bg-blue-900  p-5  pt-8 relative duration-300 min-h-screen`}
    >
      <button
        className={`absolute cursor-pointer -right-4 top-[70 px] border-blue-900 border-2 rounded-full duration-300 bg-white p-2 ${
          !isShow && "rotate-180"
        }`}
        onClick={() => setIsShow(!isShow)}
      >
        <AiOutlineLeft />
      </button>
      <div className=" flex items-center gap-5 py-5 ">
        <div className="w-[70px] h-[70px] shrink-0 border border-gray-400 rounded-full overflow-hidden">
          <figure className="w-full h-full">
            <img
              src="https://png.pngtree.com/png-vector/20190118/ourmid/pngtree-user-vector-icon-png-image_328702.jpg"
              alt=""
              className={`cursor-pointer duration-500 ${isShow && "rotate-[360deg]"}`}
            />
          </figure>{" "}
        </div>
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !isShow && "scale-0"
          }`}
        >
          Admin
        </h1>
      </div>
      <ul className="pt-6">
        {menuAdmin.map((menu) => {
          return (
            <li key={menu.id}>
              <NavLink
                className={({
                  isActive,
                }) => `flex items-center rounded-md p-4 cursor-pointer hover:bg-light-white text-gray-300  gap-x-4 
               content-none mt-2 duration-300 ${isActive && "bg-light-white"} `}
                to={menu.path}
              >
                <span className="text-2xl">{menu.icon}</span>
                <span
                  className={`${!isShow && "scale-0"} text-sm  scale-1 origin-left duration-300 `}
                >
                  {menu.title}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {};

export default memo(Sidebar);
