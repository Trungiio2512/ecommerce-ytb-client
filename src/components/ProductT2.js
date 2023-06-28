import React from "react";
import PropTypes from "prop-types";
import { formatVND, getStars } from "../until/fn";
import { Link } from "react-router-dom";
import path from "../until/path";

const ProductT2 = ({ product }) => {
  return (
    <div className="w-full flex items-center gap-4 py-5 border border-transparent hover:border-red-400 transition-all">
      <Link
        to={`/${path.DETAIL_PRODUCT}/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`}
        state={{ id: product?._id }}
        replace
        className="w-[85px] h-[85px] p-2 shrink-0"
      >
        <figure className="w-full h-full">
          <img
            src={
              product?.thumb?.url ||
              "https://www.tenforums.com/geek/gars/images/2/types/thumb_15995098370_amera_app.png"
            }
            alt={product?.title}
          />
        </figure>
      </Link>
      <div className="">
        <Link
          to={`/${path.DETAIL_PRODUCT}/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`}
          state={{ id: product?._id }}
          replace
        >
          <h3 className="text-[#2b3743] cursor-pointer hover:text-main line-clamp-2">
            {product?.title}
          </h3>
        </Link>
        {product?.totalRatings && (
          <div className="flex items-center gap-1 text-sm text-yellow-500 my-2">
            {getStars(product?.totalRatings)}
            {/* {product?.totalRatings} */}
          </div>
        )}
        {product?.price && (
          <span className="text-gray-500 text-sm line-through mr-2 inline-block">
            {formatVND(product?.price)}
          </span>
        )}
        {product?.priceSale && (
          <span className="text-black text-base inline-block">{formatVND(product?.priceSale)}</span>
        )}
      </div>
    </div>
  );
};

ProductT2.propTypes = {};

export default ProductT2;
