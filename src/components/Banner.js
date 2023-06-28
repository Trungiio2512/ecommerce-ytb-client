import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const Banner = (props) => {
  const { banners } = useSelector((state) => state.app);
  return (
    <div className="w-full">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQgAH898kfLohq9kxjsGwPOvfvrDj3DE6kg&usqp=CAU"
        alt="banner"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

Banner.propTypes = {};

export default memo(Banner);
