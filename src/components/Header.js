import React, { memo, useState } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import icons from "../until/icon";
import path from "../until/path";
import { Button } from "../components";
import { menuUser } from "../until/menu";
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
  AiOutlineUser,
} = icons;
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
const Header = (props) => {
  const navigate = useNavigate();
  const { userInfo, token, isLoggedIn } = useSelector((state) => state.user);

  const [showMenu, setShowMenu] = useState(false);
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
              {!isLoggedIn && (
                <li className="px-2 hover:text-black">
                  <Link to={`${path.LOGIN}`}>Sign in or create a new account</Link>
                </li>
              )}
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
          {token && isLoggedIn && (
            <div className="header-wishlist">
              <div className="header-wishlist--cart">
                <span
                  className="text-main "
                  onClick={() => {
                    navigate(`/${path.USER}/${path.WISH_LIST}`);
                  }}
                >
                  <AiOutlineHeart />
                </span>
              </div>
              <div className="header-wishlist--cart relative">
                <span
                  className="text-main"
                  onClick={() => {
                    navigate(`/${path.USER}/${path.CART}`);
                  }}
                >
                  <BsFillBagHeartFill />
                </span>
                {userInfo?.cart?.length > 0 && (
                  <span className="absolute -top-1 right-2 text-sm text-white rounded-full bg-red-600 px-1 py-[0.5] text-center">
                    {userInfo?.cart?.length}
                  </span>
                )}
              </div>
              <div className="header-wishlist--cart">
                <Tippy
                  placement="bottom-end"
                  delay={[200, 300]}
                  interactive
                  visible={showMenu}
                  render={(attrs) => (
                    <div
                      className="w-[300px] border border-gray-300 shadow-md bg-white animate-scale-up-tr"
                      {...attrs}
                    >
                      <div className="flex flex-col text-sm ">
                        {menuUser.map((menu) => {
                          return (
                            <Link
                              className="text-right px-5 py-2 hover:text-blue-300 active:text-main"
                              key={menu.id}
                              to={menu.path}
                              onClick={() => setShowMenu(false)}
                            >
                              {menu.title}
                            </Link>
                          );
                        })}
                        <Button
                          className={
                            "w-full text-right px-5 p-2 hover:text-blue-300 active:text-main"
                          }
                          onHanldeClick={() => {}}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  )}
                >
                  <div
                    className="rounded-full bg-white border border-gray-300 hover:border-blue-300 active:border-red-300"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <figure className="w-[30px] h-[30px]">
                      <img
                        src={
                          userInfo?.avata ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ5R6uBDeXW4AQ_AQnhX1iC2JCWJyGfPPIyqj-gEo&s"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                </Tippy>
              </div>
            </div>
          )}
        </div>
        {token && isLoggedIn && (
          <button className="text-4xl hover:text-main md:hidden ">
            <span>
              <HiShoppingCart />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {};

export default memo(Header);
