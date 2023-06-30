import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SubMenuMobile = ({ data, onCloseMenuParent, open }) => {
  return (
    <ul className={` duration-300 overflow-hidden w-full  ${open ? " h-auto px-5 py-1" : "h-0"}`}>
      {data.map((menu) => {
        let Comp = "div";
        let className = `px-3 py-1 w-full  flex-1 duration-300 cursor-pointer`;
        if (menu.path) {
          Comp = NavLink;
        }
        return (
          <div className="w-full" key={menu.id}>
            <li key={menu.id} className="w-full flex items-center relative">
              <Comp
                to={menu.path}
                className={
                  menu?.path
                    ? ({ isActive }) => {
                        return `px-3 py-1 w-full  flex-1 duration-300 ${
                          isActive ? "bg-white text-main" : "hover:bg-white-02"
                        } `;
                      }
                    : className
                }
                onClick={menu?.children ? () => {} : () => onCloseMenuParent()}
              >
                {menu.title}
              </Comp>
            </li>
            {menu?.children && <SubMenuMobile data={menu.children} />}
          </div>
        );
      })}
    </ul>
  );
};

SubMenuMobile.propTypes = {};

export default memo(SubMenuMobile);
