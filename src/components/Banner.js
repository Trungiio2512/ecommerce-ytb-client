import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Slider from "react-slick";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Banner = (props) => {
  const { banners } = useSelector((state) => state.app);
  // console.log(banners);
  return (
    <div className="w-full">
      {banners.length > 0 ? (
        <Slider {...settings}>
          {banners.map((banner, index) => {
            return (
              <div
                className="w-full rounded-lg overflow-hidden lg:h-[480px] md:h-[400px] max-md:h-[300px] max-xs:h-[200px]"
                key={index}>
                <figure className="w-full h-full">
                  <img src={banner?.url} alt="" />
                </figure>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="w-full h-[200px] bg-gray-200"></div>
      )}
    </div>
  );
};

Banner.propTypes = {};

export default memo(Banner);
