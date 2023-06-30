import React, { useState } from "react";
import PropTypes from "prop-types";
import SubMenuMobile from "./SubMenuMobile";
import { NavLink } from "react-router-dom";
import icons from "../until/icon";
const { AiFillCaretDown } = icons;
const MenuMobileItem = ({ data, onCloseMenuParent }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  let Comp = "div";
  let className = `p-[10px] w-full uppercase flex-1 duration-300 cursor-pointer`;
  if (data.path) {
    Comp = NavLink;
  }
  return (
    <div className="w-full">
      <li key={data.id} className="w-full flex items-center relative">
        <Comp
          to={data.path}
          className={
            data?.path
              ? ({ isActive }) => {
                  return `p-[10px] w-full uppercase flex-1 duration-300 ${
                    isActive ? "bg-white text-main" : "hover:bg-white-02"
                  } `;
                }
              : className
          }
          onClick={() => {
            !data?.children && onCloseMenuParent();
            data?.children && setOpenSubmenu(!openSubmenu);
          }}
        >
          {data.title}
        </Comp>
        {data?.children && (
          <span className="absolute text-white top-[30%] right-2">
            <AiFillCaretDown size={20} />
          </span>
        )}
      </li>
      {data?.children && (
        <SubMenuMobile
          data={data.children}
          onCloseMenuParent={onCloseMenuParent}
          open={openSubmenu}
          onCloseMenu={setOpenSubmenu}
        />
      )}
    </div>
  );
};

MenuMobileItem.propTypes = {};

export default MenuMobileItem;
