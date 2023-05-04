import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";

import path from "../../until/path";
import * as apiProduct from "../../apis/product";
import { formatVND, getStars } from "../../until/fn";
import Button from "../../components/Button";

const ProductDetail = (props) => {
  const location = useLocation();
  const { brand, category, title } = useParams();

  const [product, setProduct] = useState({});
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const [quantity, setQuantity] = useState(0);
  const id = location.state?.id;
  // console.log(id);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiProduct.getOne(id);
      console.log(rs);
      if (rs?.sucess) {
        setProduct(rs?.data);
      }
    };
    fetchApi();
  }, [id]);

  return (
    <div className="">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-black uppercase mb-2">{brand}</h3>
        <div className="flex divide-x-2 divide-gray-500">
          <Link
            to={`/${path.HOME}`}
            className="text-sm text-gray-500 
          hover:text-main capitalize pr-2"
          >
            Home
          </Link>
          <Link
            to={`/`}
            className="text-sm text-gray-500 
          hover:text-main px-2 "
          >
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </Link>
          <Link
            to={`/`}
            className="text-sm text-gray-500 
          hover:text-main px-2"
          >
            {brand}
          </Link>
          <span className="text-sm text-gray-500 px-2">{title}</span>
        </div>
      </div>
      {Object.keys(product).length > 0 && (
        <div className="grid-layout">
          <div className="row">
            <div className="col l-6 s-6 c-12">
              <div className="space-y-5">
                <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
                  {product?.images.map((image, index) => {
                    return (
                      <div className="flex">
                        <div className="w-[458px] m-auto" key={index}>
                          <figure className="w-full h-full">
                            <img src={image} alt="" />
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
                      <div className="w-[153px]" key={index}>
                        <figure className="w-full h-full">
                          <img src={image} alt="" />
                        </figure>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="col l-6 s-6 c-12">
              <div className="space-y-5 pl-5">
                <div className="flex items-center gap-2">
                  <span className="text-xl text-gray-600 line-through font-normal">
                    {formatVND(product?.price)}
                  </span>
                  <span className="text-2xl text-third font-semibold">
                    {formatVND(product?.priceSale)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center text-xl">
                    {" "}
                    {getStars(product?.totalRatings)}
                  </span>
                  <span className="text-base text-gray-500"> 0 review</span>
                </div>
                <ul className="list-square text-base text-gray-500 space-y-2">
                  {product?.specifications?.map((ele, index) => {
                    return (
                      <li className="" key={index}>
                        {ele}
                      </li>
                    );
                  })}
                </ul>
                <div>
                  <div className="relative inline-block">
                    <Button
                      className={
                        "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 left-[-10px] h-full px-3 "
                      }
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      className="outline-none text-center border border-gray-400 hover:border-red-300 focus:border-red-500 focus:bg-red-200 focus:text-third transition-all duration-300 text-lg px-1 py-2 rounded-lg w-full md:max-w-[200px]"
                    />
                    <Button
                      className={
                        "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 right-[-20px] h-full px-3"
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductDetail.propTypes = {};

export default ProductDetail;
