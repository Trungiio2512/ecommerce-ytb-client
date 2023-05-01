import React, { memo } from "react";
import PropTypes from "prop-types";
import icons from "../until/icon";
const { IoIosMail } = icons;

const Footer = (props) => {
  return (
    <div className="w-full">
      <div className="bg-main ">
        <div className="text-white main-width py-6">
          <div className="grid-layout">
            <div className="row">
              <div className="s-6 c-12">
                <div className="flex-col">
                  <h2 className="uppercase font-medium text-2xl">SIGN UP TO NEWSLETTER</h2>
                  <span className="text-sm">Subscribe now and receive weekly newsletter</span>
                </div>
              </div>
              <div className="s-6 c-12">
                <div className="w-full h-full relative">
                  <input
                    className="w-full h-full p-5 bg-white-02 rounded-[30px] outline-none placeholder:text-sm placeholder:text-gray-400"
                    placeholder="Email address"
                  />
                  <span className="absolute right-[30px] top-[50%] translate-y-[-50%] text-2xl">
                    <IoIosMail />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#191919] text-gray-500">
        <footer className="py-[50px] main-width">
          <div className="grid-layout">
            <div className="row">
              <div className="col l-3 s-6 c-12">
                <h2 className="pl-4 text-lg uppercase font-semibold border-l-4 border-red-500 text-left">
                  about us
                </h2>
                <ul>
                  <li></li>
                </ul>
              </div>
              <div className="col l-3 s-6 c-12">
                <h2 className="pl-4 text-lg uppercase font-semibold border-l-4 border-red-500 text-left">
                  information
                </h2>
                <ul>
                  <li></li>
                </ul>
              </div>
              <div className="col l-3 s-6 c-12">
                <h2 className="pl-4 text-lg uppercase font-semibold border-l-4 border-red-500 text-left">
                  who we are
                </h2>
                <ul>
                  <li></li>
                </ul>
              </div>
              <div className="col l-3 s-6 c-12">
                <h2 className="pl-4 text-lg uppercase font-semibold border-l-4 border-red-500 text-left">
                  #digitalworldstore
                </h2>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

Footer.propTypes = {};

export default memo(Footer);
