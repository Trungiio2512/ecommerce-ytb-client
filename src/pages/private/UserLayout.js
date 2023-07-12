import React, { memo } from "react";
import PropTypes from "prop-types";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import icons from "../../until/icon";
import { Button } from "../../components";
import { menuUser } from "../../until/menu";
const { BsPencilSquare } = icons;

const UserLayout = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="main-width h-auto bg-white">
      <div className="lg:flex">
        <div className="lg:w-2/12 lg:shrink-0 lg:block hidden ">
          <div className="flex flex-col items-center py-4 gap-5  top-0 left-0">
            <div className="rounded-full border shrink-0 border-gray-300 overflow-hidden bg-white ">
              <figure className="w-[50px] h-[50px]">
                <img
                  src={
                    userInfo?.avata ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9jO1ey8-tvqc5C5dHVNX2D4aAkoKipwjqg&usqp=CAU"
                  }
                  alt=""
                />
              </figure>
            </div>
            <div className="">
              <h2 className="text-base font-medium">{`${userInfo?.firstName} ${userInfo?.lastName}`}</h2>
              <Button className={"flex items-center gap-2 text-gray-500 text-base"}>
                <BsPencilSquare />
                <span className="">Sửa hồ sơ</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {menuUser.map((menu) => {
                return (
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? "text-red-400" : "text-gray-400"} px-3 py-1 text-sm `
                    }
                    to={menu.path}
                  >
                    {menu.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:w-10/12 mt-4 w-full ">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

UserLayout.propTypes = {};

export default memo(UserLayout);
