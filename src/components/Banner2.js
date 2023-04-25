import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Banner2 = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-5">
      <Link
        to={""}
        className="shadow-box"
        style={{
          backgroundImage:
            "url(https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657)",
        }}
      >
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt=""
        />
      </Link>
      <Link
        to={""}
        className="shadow-box"
        style={{
          backgroundImage:
            "url(https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657)",
        }}
      >
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt=""
        />
      </Link>
    </div>
  );
};

Banner2.propTypes = {};

export default Banner2;
