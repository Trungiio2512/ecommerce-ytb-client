import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import icons from "../until/icon";
import { formatVND, getStars } from "../until/fn";

import * as apiProduct from "../apis/product";
import Countdown from "./Countdown";

const { BsStarFill } = icons;
const ProductDeal = () => {
  const [product, setproduct] = useState({});
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hours, setHours] = useState(0);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await apiProduct.getAll({
        deal: true,
        fields: "title slug deal thumb totalRatings price",
      });
      if (res?.sucess) {
        setproduct(res?.data[0]);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="mt-8 border border-gray-300 p-5 max-lg:p-2">
      <div className="flex items-baseline mb-4">
        <span className="text-main text-xl">
          <BsStarFill />
        </span>
        <h2 className="uppercase font-semibold lg:text-xl text-base flex-1 text-center">Ưu đãi hôm nay</h2>
      </div>

      {!Object.keys(product).length > 0 ? (
        <div className="flex flex-col gap-2 animate-pulse">
          <div className="lg:w-[200px] lg:h-[200px] flex items-center bg-gray-300 justify-center max-md:max-w-[400px] max-md:max-h-[400px] w-full min-h-[300px] shrink">
            <svg
              className="w-10 h-10 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="h-4 bg-gray-300 "></div>
          <div className="h-4 bg-gray-300 "></div>
          <div className="h-4 bg-gray-300 "></div>
          <div className="mb-3 gap-2 flex items-center justify-between">
            <Countdown loading />
            <Countdown loading />
            <Countdown loading />
          </div>
        </div>
      ) : (
        <>
          <Link
            to={`/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`}
            className="flex items-center justify-center">
            <figure className="lg:w-[200px] lg:h-[200px] max-md:max-w-[400px] max-md:max-h-[400px] w-full h-full shrink">
              <img src={product?.thumb?.url} alt={product?.title} />
            </figure>
          </Link>
          <div className="flex flex-col gap-2 mb-3">
            <Link to={`/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`}>
              <h2 className="text-base text-third hover:text-main text-center">{product?.title}</h2>
            </Link>
            <div className="flex justify-center items-center gap-1 text-base text-yellow-500 my-2">
              {getStars(product?.totalRatings)}
            </div>
            <span className="text-base text-center block">{product?.price && formatVND(product?.price)}</span>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <Countdown unit={"hours"} number={hours} />
            <Countdown unit={"minutes"} number={minute} />
            <Countdown unit={"seconds"} number={second} />
          </div>
        </>
      )}
    </div>
  );
};

ProductDeal.propTypes = {};

export default memo(ProductDeal);
