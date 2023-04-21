import React, { memo } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { menuHome } from "../until/menu";
import icons from "../until/icon";
const { AiOutlineMenu } = icons;
const Navigation = (props) => {
  return (
    <div className="main-width py-2 h-[48px] m-auto border-y border-gray-300  md:items-center md:justify-between hidden md:flex">
      <nav className="bg-white items-center gap-8 w-full h-full hidden lg:flex">
        {menuHome.map((menu) => {
          return (
            <NavLink
              key={menu.id}
              to={menu.path}
              className="uppercase h-full flex text-sm  text-second hover:text-main"
            >
              <span className="m-auto">{menu.title}</span>
            </NavLink>
          );
        })}
      </nav>
      <button className="hidden md:block lg:hidden text-2xl">
        <span>
          <AiOutlineMenu />
        </span>
      </button>
      <div>
        <input
          className="w-[250px] text-sm outline-none p-2 bg-gray-100"
          placeholder="Search something"
        />
      </div>
    </div>
  );
};

Navigation.propTypes = {};

export default memo(Navigation);
