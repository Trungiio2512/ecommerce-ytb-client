import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import ProductT1 from "./ProductT1";
const tabs = [
  {
    id: 0,
    title: "Television",
  },
  {
    id: 1,
    title: "Camera",
  },
  {
    id: 2,
    title: "Speaker",
  },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const NewArrivals = (props) => {
  const { categories, newProducts } = useSelector((state) => state.app);

  const [tvs, setTvs] = useState([]);
  const [cams, setCams] = useState([]);
  const [speaker, setSpeaker] = useState([]);
  const [tabActive, settabActive] = useState(0);
  // console.log(newProducts);
  useEffect(() => {
    if (categories.length > 0 && newProducts.length > 0) {
      const data = categories.map((el) => ({
        [el?.title]: newProducts?.filter((pd) => pd?.category?._id === el?._id),
      }));
      const productTvs = data.find((el) => el["Television"])?.Television;
      const productCams = data.find((el) => el["Camera"])?.Camera;
      const productSpeaker = data.find((el) => el["Speaker"])?.Speaker;
      //   console.log(productCams);
      productTvs.length > 0 && setTvs(productTvs);
      productCams.length > 0 && setCams(productCams);
      productSpeaker.length > 0 && setSpeaker(productSpeaker);
    }
  }, [categories, newProducts]);
  //   console.log(newProducts);
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between py-4 border-b-2 border-red-400 mb-4">
        <h2 className="text-2xl text-gray-800 uppercase font-semibold">New Arrivals</h2>
        <ul className="divide-x">
          {tabs.map((tab) => {
            return (
              <li
                key={tab.id}
                className={`${
                  tabActive === tab.id ? "text-main" : "text-gray-400"
                } font-normal inline text-base cursor-pointer  ${tab.id === 0 ? "" : "pl-5 ml-5"}`}
                onClick={() => settabActive(tab.id)}
              >
                {" "}
                {tab.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${tabActive === 0 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {tvs.map((el) => {
            return <ProductT1 isShowDesModal key={el?._id} data={el} />;
          })}
        </Slider>
      </div>{" "}
      <div className={`${tabActive === 1 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {cams.map((el) => {
            return <ProductT1 isShowDesModal key={el?._id} data={el} />;
          })}
        </Slider>
      </div>{" "}
      <div className={`${tabActive === 2 ? "block" : "hidden"}`}>
        <Slider {...settings}>
          {speaker.map((el) => {
            return <ProductT1 isShowDesModal key={el?._id} data={el} />;
          })}
        </Slider>
      </div>
    </section>
  );
};

NewArrivals.propTypes = {};

export default NewArrivals;
