import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import path from "../../until/path";

const Login = (props) => {
  return (
    <div className="bg-yellow-100 flex items-center justify-center lg:h-screen">
      <div className="login-container container w-full lg:w-2/5 lg:bg-white h-screen lg:h-screen-75 lg:border border-gray-300 rounded-lg flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-between group">
        {/* <Link to={`${path.HOME}`} className="text-lg capitalize text-gray-500  font-medium text-l">Trở về trang chủ</Link> */}
        <div className="w-full">
          <div className=" flex items-center lg:h-full px-10 pt-16 lg:pt-0">
            <div className="w-full space-y-5">
              <div className="flex items-end justify-center text-center space-x-3 mb-20">
                <span className="text-3xl font-semibold text-gray-700">Login</span>
                <span className="text-base text-gray-800">Form</span>
              </div>
              {/* <!-- form caption --> */}

              <div className="form-element">
                <label className="space-y-2 w-full lg:w-4/5 mx-auto">
                  <span className="block text-lg text-gray-800 tracking-wide">Email</span>
                  <span className="block">
                    <input
                      type="text"
                      className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"
                    />
                  </span>
                </label>
              </div>
              {/* <!-- form element --> */}

              <div className="form-element">
                <label className="space-y-2 w-full lg:w-4/5 mx-auto">
                  <span className="block text-lg text-gray-800 tracking-wide">Password</span>
                  <span className="block">
                    <input
                      type="password"
                      className="bg-yellow-100 lg:bg-white border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"
                    />
                  </span>
                </label>
              </div>
              {/* <!-- form element --> */}

              <div className="form-element">
                <div className="w-full lg:w-4/5 mx-auto flex items-center justify-between">
                  <label className="text-gray-800 tracking-wide flex items-center space-x-2 select-none">
                    <input type="checkbox" name="" id="" />
                    <span className="block text-gray-800 tracking-wide">Remember me</span>
                  </label>
                  <Link
                    to="/"
                    className="text-gray-800 tracking-wide inline-block border-b border-gray-300"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              {/* <!-- form element --> */}

              <div className="form-element">
                <span className="w-full lg:w-4/5 mx-auto ">
                  <input
                    type="submit"
                    className="cursor-pointer border-2 border-yellow-200 w-full p-3 bg-yellow-200 focus:outline-none active:outline-none focus:bg-theme-yellow active:bg-theme-yellow hover:bg-theme-yellow transition-all"
                  />
                </span>
              </div>
              {/* <!-- form element --> */}
            </div>
          </div>
          {/* <!-- form wrapper --> */}
        </div>
        {/* <!-- Login Form End--> */}
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
