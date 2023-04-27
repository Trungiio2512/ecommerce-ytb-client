import React, { memo, useEffect, useState } from "react";
import * as product from "../apis/product";
import PropTypes from "prop-types";
import Slider from "react-slick";
import ProductT1 from "./ProductT1";
import { useSelector } from "react-redux";
const tabs = [
  {
    id: 0,
    title: "best seller",
  },
  {
    id: 1,
    title: "new arrivals",
  },
  {
    id: 2,
    title: "tablet",
  },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const TabProduct = () => {
  const { categories, newProducts } = useSelector((state) => state.app);

  const [bestSeller, setBestSeller] = useState([]);
  const [newarrivals, setnewarrivals] = useState([]);
  const [tablet, settablet] = useState([]);
  const [tabActive, settabActive] = useState(0);

  useEffect(() => {
    if (categories.length > 0 && newProducts.length > 0) {
      const idSmartphone = categories.find((el) => el?.title === "Smartphone")?._id;
      const idLaptop = categories.find((el) => el?.title === "Laptop")?._id;
      const idTablet = categories.find((el) => el?.title === "Tablet")?._id;

      const productPhone = newProducts.filter((el) => el?.category?._id === idSmartphone);
      const productLaptop = newProducts.filter((el) => el?.category?._id === idLaptop);
      const productTablet = newProducts.filter((el) => el?.category?._id === idTablet);
      //   console.log(productLaptop, productPhone, productTablet);
      productPhone.length > 0 && setBestSeller(productPhone);
      productLaptop.length > 0 && setnewarrivals(productLaptop);
      productTablet.length > 0 && settablet(productTablet);
    }
  }, [categories, newProducts]);
  // console.log(bestSeller);
  return (
    <div className="mt-8">
      <ul className="mb-5 divide-x border-b-2 border-red-500 pb-4">
        {tabs.map((tab) => {
          return (
            <li
              key={tab.id}
              className={`uppercase ${
                tabActive === tab.id ? "text-black" : "text-gray-400"
              } font-medium inline text-2xl cursor-pointer  ${tab.id === 0 ? "" : "pl-5 ml-5"}`}
              onClick={() => settabActive(tab.id)}
            >
              {" "}
              {tab.title}
            </li>
          );
        })}
      </ul>
      <div className={`${tabActive === 0 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {bestSeller.map((el) => {
            return <ProductT1 key={el?._id} data={el} />;
          })}
        </Slider>
      </div>{" "}
      <div className={`${tabActive === 1 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {newarrivals.map((el) => {
            return <ProductT1 key={el?._id} data={el} />;
          })}
        </Slider>
      </div>{" "}
      <div className={`${tabActive === 2 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {tablet.map((el) => {
            return <ProductT1 key={el?._id} data={el} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

TabProduct.propTypes = {};

export default memo(TabProduct);
