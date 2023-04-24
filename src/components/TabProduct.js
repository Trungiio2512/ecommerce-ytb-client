import React, { useEffect, useState } from "react";
import * as product from "../apis/product";
import PropTypes from "prop-types";
import Slider from "react-slick";
import ProductT1 from "./ProductT1";
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
const TabProduct = ({ categories }) => {
  const [bestSeller, setBestSeller] = useState([]);
  const [newarrivals, setnewarrivals] = useState([]);
  const [tablet, settablet] = useState([]);
  const [tabActive, settabActive] = useState(0);
  useEffect(() => {
    if (categories.length > 0) {
      const fetchApi = async () => {
        const res = await product.getAll({
          news: true,
        });
        if (res?.success) {
          const idSmartphone = categories.find((el) => el?.title === "Smartphone")?._id;
          const idLaptop = categories.find((el) => el?.title === "Laptop")?._id;
          const idTablet = categories.find((el) => el?.title === "Tablet")?._id;

          const productPhone = res?.data.filter((el) => el?.category?._id === idSmartphone);
          const productLaptop = res?.data.filter((el) => el?.category?._id === idLaptop);
          const productTablet = res?.data.filter((el) => el?.category?._id === idTablet);
          //   console.log(productLaptop, productPhone, productTablet);
          setBestSeller(productPhone);
          setnewarrivals(productLaptop);
          settablet(productTablet);
        }
      };

      fetchApi();
    }
  }, [categories]);
  return (
    <div className="mt-5">
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
      <div>
        <Slider {...settings}>
          {bestSeller.map((el) => {
            return <ProductT1 key={el?._id} data={el} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

TabProduct.propTypes = {};

export default TabProduct;
