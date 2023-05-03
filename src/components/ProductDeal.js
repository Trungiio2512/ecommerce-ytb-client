import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import icons from "../until/icon";
import { formatVND, getStars } from "../until/fn";

import * as apiProduct from "../apis/product";
import Countdown from "./Countdown";

const { BsStarFill } = icons;
const ProductDeal = (props) => {
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
    <div className="mt-8 border border-gray-300 p-5">
      <div className="flex items-baseline ">
        <span className="text-main text-xl">
          <BsStarFill />
        </span>
        <h2 className="uppercase font-semibold text-2xl flex-1 text-center">daily deals</h2>
      </div>
      <Link to={`/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`}>
        <figure className="">
          <img src={product?.thumb} alt={product?.title} />
        </figure>
      </Link>
      <div className="flex flex-col gap-2 mb-3">
        <Link to={`/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`}>
          <h2 className="text-base text-third hover:text-main text-center">{product?.title}</h2>
        </Link>
        <div className="flex justify-center items-center gap-1 text-base text-yellow-500 my-2">
          {product?.totalRatings && getStars(product?.totalRatings)}
          {/* {data?.totalRatings} */}
        </div>
        <span className="text-base text-center block">
          {product?.price && formatVND(product?.price)}
        </span>
      </div>
      <div className="mb-3 flex items-center justify-between">
        <Countdown unit={"hours"} number={hours} />
        <Countdown unit={"minutes"} number={minute} />
        <Countdown unit={"seconds"} number={second} />
      </div>
    </div>
  );
};

ProductDeal.propTypes = {};

export default memo(ProductDeal);
