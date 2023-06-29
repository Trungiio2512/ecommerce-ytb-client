import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

import * as apiUser from "../apis/user";
import { formatVND, getStars } from "../until/fn";
import Slider from "react-slick";
import Button from "./Button";

const ProductDetailContent = ({ product = {}, selectOption = false, modal = false }) => {
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [internal, setInternal] = useState(null);
  const [ram, setRam] = useState(null);
  const [color, setColor] = useState(null);

  const handleDecrementQuantity = () => {
    if (quantity <= 0) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrementQuantity = () => {
    if (quantity > product?.quantity) {
      return;
    } else {
      setQuantity(quantity + 1);
    }
  };
  // console.log(product);
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      Swal.fire({ icon: "info", title: "Oops...!", text: "You must has logged in" });
    } else {
      if (!internal || !ram || !color || !quantity) {
        Swal.fire({ icon: "warning", title: "Oops....!", text: "Please select information" });
      } else {
        const rs = await apiUser.addOrCreateCart({
          pid: product?._id,
          quantity,
          color,
          internal,
          ram,
        });
        if (rs.sucess) {
          Swal.fire({ icon: "success", title: "Done...!", text: rs?.msg });
        } else {
          Swal.fire({ icon: "error", title: "Oops...!", text: rs?.msg });
        }
      }
    }
  };
  return (
    <div className={`grid-layout`}>
      <div className="row">
        <div className="col l-6 s-6 c-12">
          <div className="space-y-5">
            <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
              {product?.images?.map((image, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="max-w-[453px] max-h-[453px] shrink w-full h-full m-auto">
                      <figure className="w-full h-full">
                        <img
                          src={
                            image?.url ||
                            "https://www.tenforums.com/geek/gars/images/2/types/thumb_15995098370_amera_app.png"
                          }
                          alt=""
                        />
                      </figure>
                    </div>
                  </div>
                );
              })}
            </Slider>
            <Slider
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              slidesToShow={3}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {product?.images.map((image, index) => {
                return (
                  <div className="max-w-[153px] w-full" key={index}>
                    <figure className="w-full h-full">
                      <img
                        src={
                          image?.url ||
                          "https://www.tenforums.com/geek/gars/images/2/types/thumb_15995098370_amera_app.png"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="col l-6 s-6 c-12">
          <div className="space-y-5 pl-5">
            <div className="flex items-center gap-2 md:flex-row flex-col">
              <span
                className={
                  product?.priceSale > 0
                    ? "text-lg text-gray-600 line-through font-normal"
                    : "text-xl text-third font-semibold"
                }
              >
                {formatVND(product?.price)}
              </span>
              {product?.priceSale > 0 && (
                <span className="text-2xl text-third font-semibold">
                  {formatVND(product?.priceSale)}
                </span>
              )}
            </div>
            <div className="flex items-stretch gap-2">
              <span className="flex items-center text-lg"> {getStars(product?.totalRatings)}</span>
              <span className="text-base text-gray-500"> 0 review</span>
            </div>
            <ul className="list-square text-base text-gray-500 space-y-2">
              {product?.specifications?.map((ele, index) => {
                return (
                  <li className="text-sm" key={index}>
                    {ele}
                  </li>
                );
              })}
            </ul>{" "}
            <div className="flex items-center gap-2">
              <span className="text-third text-sm font-semibold capitalize  min-w-[70px]">
                internal
              </span>
              {product?.internals?.map((ele) => {
                return (
                  <div key={ele?._id}>
                    <input
                      id={ele?._id}
                      type="radio"
                      value=""
                      checked={ele?._id === internal}
                      name="internal"
                      className="hidden"
                      onChange={(e) => setInternal(ele?._id)}
                    />
                    <label
                      htmlFor={ele?._id}
                      className={`"bg-white px-2 py-1 text-sm font-medium uppercase border border-gray-400 text-gray-400 block ${
                        ele?._id === internal ? "text-main border-red-400 " : ""
                      }`}
                    >
                      {ele?.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-third text-sm font-semibold capitalize  min-w-[70px]">
                color
              </span>
              {product?.colors?.map((ele) => {
                return (
                  <div key={ele?._id}>
                    <input
                      id={ele?._id}
                      type="radio"
                      value=""
                      name="color"
                      className="hidden"
                      checked={ele?._id === color}
                      onChange={() => setColor(ele?._id)}
                    />
                    <label
                      htmlFor={ele?._id}
                      className={`"bg-white px-2 py-1 text-sm font-medium uppercase border border-gray-400 text-gray-400 block ${
                        ele?._id === color ? "text-main border-red-400 " : ""
                      }`}
                    >
                      {ele?.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-third text-sm font-semibold capitalize  min-w-[70px]">ram</span>
              {product?.rams?.map((ele) => {
                return (
                  <div key={ele?._id}>
                    <input
                      id={ele?._id}
                      type="radio"
                      value=""
                      name="ram"
                      className="hidden"
                      checked={ele?._id === ram}
                      onChange={() => setRam(ele?._id)}
                    />
                    <label
                      htmlFor={ele?._id}
                      className={`"bg-white px-2 py-1 text-sm font-medium uppercase border border-gray-400 text-gray-400 block ${
                        ele?._id === ram ? "text-main border-red-400 " : ""
                      }`}
                    >
                      {ele?.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-third text-sm font-semibold capitalize min-w-[70px]">
                quantity
              </span>
              <div className="relative inline-block">
                <Button
                  className={
                    "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 left-0 h-full px-3 border border-gray-400 rounded-l-md hover:border-red-300 focus:border-red-500"
                  }
                  onHanldeClick={() => handleDecrementQuantity()}
                >
                  -
                </Button>
                <input
                  type="number"
                  className="outline-none text-center border border-gray-400 hover:border-red-300 focus:border-red-500 focus:bg-red-200 focus:text-third transition-all duration-300 text-lg px-1 py-2 rounded-lg w-full md:max-w-[200px]"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button
                  className={
                    "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 right-0 h-full px-3 border border-gray-400 rounded-r-md"
                  }
                  onHanldeClick={() => handleIncrementQuantity()}
                >
                  +
                </Button>
              </div>
            </div>
            <Button
              className={"w-6/12 text-center py-2 uppercase bg-main text-white font-semibold"}
              onHanldeClick={() => handleAddToCart()}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetailContent.propTypes = {};

export default ProductDetailContent;
