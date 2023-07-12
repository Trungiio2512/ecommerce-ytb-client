import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import ProductT1 from "./ProductT1";
import TabActive from "./TabActive";
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
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
const NewArrivals = (props) => {
  const { categories, newProducts } = useSelector((state) => state.app);

  const [tvs, setTvs] = useState([]);
  const [cams, setCams] = useState([]);
  const [speaker, setSpeaker] = useState([]);
  const [tabActive, settabActive] = useState(0);

  // console.log(newProducts);
  useEffect(() => {
    if (categories?.length > 0 && newProducts?.length > 0) {
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
  console.log(tabActive);
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="sm:text-2xl text-xl text-gray-800 uppercase font-semibold">Sản phẩm khác</h2>
        <TabActive data={tabs} value={tabActive} setValue={settabActive} />
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
