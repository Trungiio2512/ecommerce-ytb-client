import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import icons from "../../until/icon";
import { Button } from "../../components";
const { BsPencilSquare } = icons;

const UserLayout = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className="main-width h-auto bg-white">
      <div className="flex items-center gap-5">
        <div className="w-[20%] hidden md:block">
          <div className="flex lg:flex-row flex-col items-center py-4 gap-5  top-0 left-0">
            <div className="rounded-full border border-gray-300 overflow-hidden bg-white ">
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
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

UserLayout.propTypes = {};

export default UserLayout;
