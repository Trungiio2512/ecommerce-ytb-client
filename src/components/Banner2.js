import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Banner2 = () => {
  return (
    <div className="grid-layout">
      <div className="row">
        <div className="col l-6 s-12 c-12">
          <Link
            to={""}
            className="shadow-box mb-4 lg:mb-0"
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
        </div>
        <div className="col l-6 s-12 c-12">
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
      </div>
    </div>
  );
};

Banner2.propTypes = {};

export default memo(Banner2);
