import React, { memo } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import { FaFacebookF, FaInstagramSquare } from "react-icons/fa";
// import { BsTwitter } from "react-icons/bs";
// import { AiOutlineGoogle } from "react-icons/ai";
import icons from "../until/icon";
import { Link } from "react-router-dom";
import path from "../until/path";
const {
  AiOutlineGoogle,
  BsTwitter,
  FaFacebookF,
  FaInstagramSquare,
  BsPinterest,
  AiFillPhone,
  HiMail,
  AiOutlineHeart,
  BsFillBagHeartFill,
  HiShoppingCart,
  AiOutlineMenu,
} = icons;
const Header = (props) => {
  const { user, token, isLoggedIn } = useSelector((state) => state.user);
  // console.log(user);
  const linkRight = [
    {
      i: 0,
      icon: <FaFacebookF />,
      path: "",
    },
    {
      i: 1,
      icon: <AiOutlineGoogle />,
      path: "",
    },
    {
      i: 2,
      icon: <BsTwitter />,
      path: "",
    },
    {
      i: 3,
      icon: <FaInstagramSquare />,
      path: "",
    },
    {
      i: 5,
      icon: <BsPinterest />,
      path: "",
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <div className="bg-main text-white text-xs py-[10px] md:block hidden ">
        <div className="main-width m-auto ">
          <div className="float-left">
            <ul className="divide-x divide-red-300">
              <li className="uppercase pr-2 inline-block">
                ORDER ONLINE OR CALL US (+1800) 000 8808
              </li>
              <li className="uppercase px-2 inline-block">Vnd</li>
            </ul>
          </div>
          <div className="float-right">
            <ul className="divide-x divide-red-300 flex items-center">
              <li className="px-2 hover:text-black">
                <Link to={`${path.LOGIN}`}>Sign in or create a new account</Link>
              </li>
              {linkRight.map((el, index) => {
                return (
                  <li
                    key={el.i}
                    className={`${index === linkRight.length - 1 ? "pl-2" : "px-2"} ${
                      index === 0 ? "hover:text-black" : ""
                    }`}
                  >
                    {" "}
                    {el.icon || el.content}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="main-width m-auto lg:h-[110px] h-[80px]  flex items-center justify-between ">
        <button className="md:hidden text-2xl">
          <span>
            <AiOutlineMenu />
          </span>
        </button>
        <Link to={`/${path.HOME}`}>
          <figure>
            <img
              src="	https://cdn.shopify.com/s/files/1/1903/4853/files/logo_digital_new_250x.png?v=1613166683"
              alt="Logo"
            />
          </figure>
        </Link>
        <div className="hidden md:flex md:items-center">
          <div className="header-item">
            <div className="flex items-center">
              <span className="text-main mr-2">
                <AiFillPhone />
              </span>
              <span className="block text-center uppercase text-sm font-bold text-gray-600">
                (+1800) 000 8808
              </span>
            </div>
            <span className="text-xs text-gray-500 leading-4">Mon-Sat 9:00AM - 8:00PM</span>
          </div>
          <div className="header-item">
            <div className="flex items-center">
              <span className="text-main mr-2">
                <HiMail />
              </span>
              <span className="uppercase text-sm font-bold text-gray-600">
                SUPPORT@TADATHEMES.COM
              </span>
            </div>
            <span className="text-xs text-gray-500 leading-4">Online Support 24/7</span>
          </div>
          <div className="header-wishlist">
            <div className="header-wishlist--cart">
              <span className="text-main ">
                <AiOutlineHeart />
              </span>
            </div>
            <div className="header-wishlist--cart">
              <span className="text-main ">
                <BsFillBagHeartFill />
              </span>
              <span className="text-sm text-third hover:text-main">4 item</span>
            </div>
          </div>
        </div>
        <button className="text-4xl hover:text-main md:hidden ">
          <span>
            <HiShoppingCart />
          </span>
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default memo(Header);
