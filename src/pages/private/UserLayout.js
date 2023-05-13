import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import icons from "../../until/icon";
import { Button } from "../../components";
const { BsPencilSquare } = icons;

const UserLayout = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo);
  return (
    <div className="main-width h-auto">
      <div className="flex ">
        <div className="">
          <div className="flex items-center py-4 gap-5">
            <div className="rounded-full border border-gray-300 overflow-hidden bg-white">
              <figure className="w-12 h-12">
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
            <div></div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

UserLayout.propTypes = {};

export default UserLayout;
