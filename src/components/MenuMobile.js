import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import icons from "../until/icon";
import { menuHome, menuUser, menuAdmin } from "../until/menu";
import path from "../until/path";
import SubMenuMobile from "./SubMenuMobile";
import MenuMobileItem from "./MenuMobileItem";
const { AiOutlineClose, AiFillCaretDown } = icons;

const MenuMobile = ({ open, handleClose = () => {}, shouldCloseOverlayClick, forAdmin = false }) => {
  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);
  const [menus, setMenus] = useState(() => {
    let menu = [...menuHome];
    if (userInfo.role === "user") {
      menu = [...menu, { title: "User Acctions", children: [...menuUser] }];
    } else if (userInfo.role === "admin") {
      menu = [
        ...menu,
        { title: "User Acctions", children: [...menuUser] },
        { title: "Admin Acctions", children: [...menuAdmin] },
      ];
    } else {
      menu = [...menu, { title: "Đăng nhập", path: `/${path.LOGIN}` }, { title: "Đăng ký", path: `/${path.REGISTER}` }];
    }
    return menu;
  });
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
      { once: true }
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
    <div
      className={`z-10 top-0 left-0 right-0  max-h-screen h-full ${
        forAdmin ? "max-md:fixed md:hidden" : "lg:hidden max-lg:fixed "
      }`}>
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 duration-150 bg-black-03`}
        onClick={
          shouldCloseOverlayClick
            ? (e) => {
                e.stopPropagation();
                handleRequestClose();
              }
            : () => {}
        }></div>
      <div
        className={`relative w-full max-w-[350px] h-full bg-gray-700 text-white text-base duration-500  overflow-y-auto ${
          closesing ? "animate-slide-left" : "animate-slide-right"
        }`}
        ref={containerRef}>
        <button className="right-0 p-2 active:text-main duration-200" onClick={() => handleRequestClose()}>
          <AiOutlineClose size={25} />
        </button>
        <ul className="w-full h-full py-2 px-1">
          {menus.map((menu, i) => {
            return <MenuMobileItem key={i} data={menu} onCloseMenuParent={handleRequestClose} />;
          })}
        </ul>
      </div>
    </div>
  );
};

MenuMobile.propTypes = {};

export default MenuMobile;
