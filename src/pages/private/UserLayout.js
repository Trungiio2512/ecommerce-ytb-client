import React, { memo } from "react";
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
      <div className="md:flex">
        <div className="md:w-2/12 md:shrink-0 md:block hidden ">
          <div className="flex xl:flex-row flex-col items-center py-4 gap-5  top-0 left-0">
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
          </div>
        </div>
        <div className="md:w-10/12 mt-4 ">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

UserLayout.propTypes = {};

export default memo(UserLayout);
