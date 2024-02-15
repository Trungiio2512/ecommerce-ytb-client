import React from "react";
import PropTypes from "prop-types";
import { formatVND, getStars } from "../until/fn";
import { Link } from "react-router-dom";
import path from "../until/path";

const ProductT2 = ({ product, loading = false }) => {
  return (
    <div className="w-full flex items-center gap-4 py-5 border border-transparent hover:border-red-400 transition-all">
      {loading ? (
        <>
          <div className="animate-pulse w-[85px] h-[85px] gap-2 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="animate-pulse flex flex-col gap-2 w-full pr-2">
            <div className="h-4 bg-gray-300 "></div>
            <div className="h-4 bg-gray-300 "></div>
            <div className="h-4 bg-gray-300 "></div>
          </div>
        </>
      ) : (
        <>
          <Link
            to={`/${path.DETAIL_PRODUCT}/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`}
            state={{ id: product?._id }}
            replace
            className="w-[85px] h-[85px] p-2 shrink-0">
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
              replace>
              <h3 className="text-[#2b3743] cursor-pointer hover:text-main line-clamp-2">{product?.title}</h3>
            </Link>
            {product?.totalRatings && (
              <div className="flex items-center gap-1 text-sm text-yellow-500 my-2">
                {getStars(product?.totalRatings)}
                {/* {product?.totalRatings} */}
              </div>
            )}
            {product?.price && (
              <span className="text-gray-500 text-sm line-through mr-2 inline-block">{formatVND(product?.price)}</span>
            )}
            {product?.priceSale && (
              <span className="text-black text-base inline-block">{formatVND(product?.priceSale)}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

ProductT2.propTypes = {};

export default ProductT2;
