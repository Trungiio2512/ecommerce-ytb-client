import React, { memo } from "react";
import PropTypes from "prop-types";
import icons from "../until/icon";
import { Button } from "../components";
const {
  IoIosMail,
  BsFillTelephoneFill,
  AiFillMail,
  ImLocation2,
  FaFacebookF,
  AiFillInstagram,
  FaPinterestP,
  ImGooglePlus,
  FaLinkedinIn,
  BsDiscord,
} = icons;
const infor = [
  {
    title: "about us",
    children: [
      {
        icon: <IoIosMail />,
        title: "Address",
        content: "474 Ontario St Toronto, ON M4X 1M7 Canada",
      },
      { icon: <BsFillTelephoneFill />, title: "phone", content: "(+1234)56789xxx" },
      { icon: <AiFillMail />, title: "mail", content: "snakecaplia@gmail.com" },
    ],
  },
  {
    title: "information",
    children: [
      { content: "Typography" },
      { content: "Gallery" },
      { content: "Today's Deals" },
      { content: "Contact" },
    ],
  },
  {
    title: "who we are",
    children: [
      { content: "help" },
      { content: "Free Shipping" },
      { content: "FAQs" },
      { content: "Return & Exchange" },
      { content: "Testimonials" },
    ],
  },
  {
    title: "#DIGITALWORLDSTORE",
  },
];
const social = [FaFacebookF, AiFillInstagram, FaPinterestP, ImGooglePlus, FaLinkedinIn, BsDiscord];

const Footer = (props) => {
  return (
    <div className="w-full mt-10">
      <div className="bg-main ">
        <div className="text-white main-width py-6">
          <div className="grid-layout">
            <div className="row">
              <div className="l-6 s-6 c-12 mb-4">
                <div className="flex-col">
                  <h2 className="uppercase font-medium lg:text-2xl md:text-xl  max-xs:text-lg">
                    SIGN UP TO NEWSLETTER
                  </h2>
                  <span className="text-sm max-xs:text-xs">
                    Subscribe now and receive weekly newsletter
                  </span>
                </div>
              </div>
              <div className="l-6 s-6 c-12">
                <div className="w-full h-full relative">
                  <input
                    className="w-full h-full md:p-5 xs:px-3 xs:py-2 max-xs:px-5 max-xs:py-2 bg-white-02 rounded-[30px] outline-none placeholder:text-sm placeholder:text-white"
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
      <div className="bg-[#191919] text-gray-500">
        <footer className="py-[50px] main-width">
          <div className="grid-layout">
            <div className="row">
              {infor.map((ele) => {
                return (
                  <div className="col l-3 s-6 c-12 mb-4" key={ele?.title}>
                    <h2 className="pl-4 text-lg max-xs:text-base uppercase font-semibold border-l-4 border-red-500 text-left mb-5 text-white">
                      {ele?.title}
                    </h2>
                    {ele?.children && (
                      <ul className="space-y-4">
                        {ele?.children.map((child, index) => {
                          return (
                            <li
                              className="flex items-center gap-2 text-base max-xs:text-sm"
                              key={index}
                            >
                              {child?.title && (
                                <span className="capitalize flex items-center gap-2 text-white">
                                  {child?.icon} {child?.title}
                                </span>
                              )}
                              <span className="text-gray-300 text-sm max-xs:text-xs  capitalize">
                                {child?.content}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </footer>
        <div className="flex items-center gap-4 main-width pb-6 border-b-1 border-gray-600">
          {social.map((Icon, index) => {
            return (
              <Button
                key={index}
                className={"text-lg flex bg-gray-600 rounded-sm text-white w-10 h-10"}
              >
                <Icon className="m-auto" />
              </Button>
            );
          })}
        </div>
      </div>
      <div className="bg-black">
        <div className="flex items-center justify-between main-width py-5">
          <span className="text-sm text-gray-400">© 2023, Digital World 2 Powered by Shopify</span>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {};

export default memo(Footer);
