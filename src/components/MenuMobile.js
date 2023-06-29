import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import icons from "../until/icon";
import { menuHome } from "../until/menu";
const { AiOutlineClose, AiFillCaretDown } = icons;

const MenuMobile = ({ open, handleClose = () => {}, shouldCloseOverlayClick }) => {
  const menus = [...menuHome];
  const [closesing, setClosing] = useState(false);
  const containerRef = useRef();

  const handleRequestClose = useCallback(() => {
    setClosing(true);
    containerRef.current.addEventListener(
      "animationend",
      (e) => {
        e.stopPropagation();
        setClosing(false);
        handleClose();
      },
      { once: true },
    );
  }, [handleClose]);

  useEffect(() => {
    const handleClickOnKeyboard = (e) => {
      if (open && e.code === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleClickOnKeyboard);

    return () => {
      document.removeEventListener("keydown", handleClickOnKeyboard);
    };
  }, [open, handleClose]);

  if (!open) return null;
  return (
    <div className="max-lg:fixed lg:hidden z-10 absolute top-0 left-0 h-screen">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-white-02"
        onClick={shouldCloseOverlayClick ? handleClose() : () => {}}
      ></div>
      <div
        className={`max-xs:w-full relative xs:w-[350px] h-full bg-black text-white text-base duration-500  overflow-hidden ${
          closesing ? "animate-slide-left" : "animate-slide-right"
        }`}
        ref={containerRef}
      >
        <button
          className="right-0 p-2 active:text-main duration-200"
          onClick={() => handleRequestClose()}
        >
          <AiOutlineClose size={25} />
        </button>
        <ul className="w-full h-full py-2 px-1">
          {menus.map((menu) => {
            return (
              <li key={menu.id} className="w-full flex items-center">
                <NavLink
                  to={menu.path}
                  className={({ isActive }) => {
                    return `p-[10px] w-full uppercase flex-1 duration-300 ${
                      isActive ? "bg-white text-main" : "hover:bg-white-02"
                    } `;
                  }}
                >
                  {menu.title}
                </NavLink>
                {menu?.children && (
                  <span className="absolute top-[50%] right-5">
                    <AiFillCaretDown size={20} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

MenuMobile.propTypes = {};

export default MenuMobile;
