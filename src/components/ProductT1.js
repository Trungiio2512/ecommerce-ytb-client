import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatVND, getStars } from "../until/fn";
import icons from "../until/icon";
import newpng from "../assets/new.png";
import Button from "./Button";

const { BsStarHalf, BsStarFill, AiOutlineMenu, AiOutlineEye, AiOutlineHeart } = icons;
const ProductT1 = ({ data, isShowDesModal = false }) => {
  console.log(data);
  // const getStars = (rating) => {};
  const [isShowModal, setShowModal] = useState(false);

  return (
    <div
      className="border border-gray-300 rounded-sm mx-[10px] p-4"
      onMouseOver={(e) => setShowModal(true)}
      onMouseLeave={(e) => setShowModal(false)}
    >
      <div className="relative">
        <div className="absolute top-[-10px] right-[-20px] z-[1]">
          <figure className="w-[80px] h-[20px]">
            <img src={data?.news && newpng} alt={"news"} />
          </figure>
        </div>
        {isShowDesModal && (
          <div
            className={`absolute bottom-0 left-0 right-0 bg-black-05  z-[5]  p-4   ease-out transition-all duration-500 ${
              isShowModal ? "top-0 opacity-100 visible block" : "opacity-0 invisible hidden"
            }`}
          >
            <p className="text-white">{data?.description}</p>
          </div>
        )}

        <div
          className={`absolute left-0  w-full flex justify-center gap-6 items-center  duration-500 transition-all z-10 ${
            isShowModal
              ? "bottom-[-10px] visible opacity-[1]"
              : "bottom-[-40px] invisible opacity-0"
          }`}
        >
          <Button circle>{<AiOutlineMenu />}</Button>
          <Button circle>{<AiOutlineEye />}</Button>
          <Button circle>{<AiOutlineHeart />}</Button>
        </div>

        <Link to={`/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}>
          <figure className="h-[243px] w-full">
            <img
              src={
                data?.thumb ||
                "https://www.tenforums.com/geek/gars/images/2/types/thumb_15995098370_amera_app.png"
              }
              alt={data?.title}
            />
          </figure>
        </Link>
      </div>
      <div className="mt-4">
        <Link to={`/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}>
          <h3 className="text-[#2b3743] line-clamp-1 cursor-pointer hover:text-main">
            {data?.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-xs text-yellow-500 my-2">
          {getStars(data?.totalRatings)}
          {/* {data?.totalRatings} */}
        </div>
        <span className="text-gray-500 text-sm line-through mr-2">{formatVND(data?.price)}</span>
        <span className="text-black text-base">{formatVND(data?.priceSale)}</span>
      </div>
    </div>
  );
};

ProductT1.propTypes = {
  data: PropTypes.object.isRequired,
  isShowDesModal: PropTypes.bool,
};

export default ProductT1;
