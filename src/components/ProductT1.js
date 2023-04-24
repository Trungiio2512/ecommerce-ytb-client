import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatVND, getStars } from "../until/fn";
import icons from "../until/icon";
import newpng from "../assets/new.png";

const { BsStarHalf, BsStarFill } = icons;
const ProductT1 = ({ data }) => {
  // console.log(data);

  return (
    <div className="border border-gray-200 mx-[10px] p-4">
      <Link to={`/${data?.category?.slug}/${data?.slug}`} className="relative">
        <figure className="h-[243px] w-full">
          <img
            src={
              data?.thumb ||
              "https://www.tenforums.com/geek/gars/images/2/types/thumb_15995098370_amera_app.png"
            }
            alt={data?.title}
          />
        </figure>
        <div className="absolute top-[-10px] right-[-20px] z-10">
          <figure className="w-[80px] h-[20px]">
            <img src={data?.news && newpng} alt={"news"} />
          </figure>
        </div>
      </Link>
      <div className="mt-4 ">
        <Link to={`/${data?.brand?.slug}/${data?.slug}`}>
          <h3 className="text-[#2b3743] line-clamp-1 cursor-pointer hover:text-main">
            {data?.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-xs text-yellow-500 my-2">
          {getStars(data?.totalRatings, <BsStarFill />, <BsStarHalf />)}
        </div>
        <span className="text-[#333]">{formatVND(data?.price)}</span>
      </div>
    </div>
  );
};

ProductT1.propTypes = {};

export default ProductT1;
