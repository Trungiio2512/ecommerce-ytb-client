import React, { memo, useEffect, useState } from "react";
import * as product from "../apis/product";
import PropTypes from "prop-types";
import Slider from "react-slick";
import ProductT1 from "./ProductT1";
import { useSelector } from "react-redux";
import TabActive from "./TabActive";
const tabs = [
  {
    id: 0,
    title: "Thịnh hành",
  },
  {
    id: 1,
    title: "Laptop",
  },
  {
    id: 2,
    title: "Máy tính bảng",
  },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const TabProduct = () => {
  const { categories, newProducts } = useSelector((state) => state.app);

  const [bestSeller, setBestSeller] = useState([]);
  const [newarrivals, setnewarrivals] = useState([]);
  const [tablet, settablet] = useState([]);
  const [tabActive, settabActive] = useState(0);

  useEffect(() => {
    if (categories?.length > 0 && newProducts?.length > 0) {
      const data = categories.map((el) => ({
        [el?.title]: newProducts?.filter((pd) => pd?.category?._id === el?._id),
      }));

      const productPhone = data.find((el) => el["Smartphone"])?.Smartphone;
      const productLaptop = data.find((el) => el["Laptop"])?.Laptop;
      const productTablet = data.find((el) => el["Tablet"])?.Tablet;
      //   console.log(productLaptop, productPhone, productTablet);
      productPhone.length > 0 && setBestSeller(productPhone);
      productLaptop.length > 0 && setnewarrivals(productLaptop);
      productTablet.length > 0 && settablet(productTablet);
      // console.log(productPhone);
    }
  }, [categories, newProducts]);
  // console.log(bestSeller);
  return (
    <div className="mt-8 mb-4">
      {/* <div>
        <ul className="mb-5 divide-x border-b-2 border-red-500 pb-4 sm:block hidden">
          {tabs.map((tab) => {
            return (
              <li
                key={tab.id}
                className={`capitalize ${
                  tabActive === tab.id ? "text-black" : "text-gray-400"
                } font-medium inline text-xl cursor-pointer  ${tab.id === 0 ? "" : "pl-5 ml-5"}`}
                onClick={() => settabActive(tab.id)}
              >
                {" "}
                {tab.title}
              </li>
            );
          })}
        </ul>
        <div className="divide-x border-b-2 border-red-500 sm:hidden block mb-5">
          <select
            className=" text-xl  uppercase outline-none font-medium "
            onChange={(e) => settabActive(+e.target.value)}
          >
            {tabs.map((tab) => {
              return (
                <option key={tab.id} className="text-base font-normal">
                  {tab.title}
                </option>
              );
            })}
          </select>
        </div>
      </div> */}
      <TabActive data={tabs} value={tabActive} setValue={settabActive} />
      <div className={`${tabActive === 0 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {bestSeller.map((el) => {
            return <ProductT1 imgSmall key={el?._id} data={el} />;
          })}
        </Slider>
      </div>{" "}
      <div className={`${tabActive === 1 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {newarrivals.map((el) => {
            return <ProductT1 imgSmall key={el?._id} data={el} />;
          })}
        </Slider>
      </div>{" "}
      <div className={`${tabActive === 2 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {tablet.map((el) => {
            return <ProductT1 imgSmall key={el?._id} data={el} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

TabProduct.propTypes = {};

export default memo(TabProduct);
