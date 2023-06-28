import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Banner3 = (props) => {
  return (
    <section className="mt-5 flex sm:items-center sm:h-[655px] flex-col sm:flex-row gap-4 overflow-hidden">
      <div className="flex-1 h-full">
        <Link
          to={""}
          className="shadow-box"
          style={{
            backgroundImage:
              "https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661",
          }}
        >
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
            alt="1"
          />
        </Link>
      </div>{" "}
      <div className="flex-1 h-full grid grid-cols-2 gap-4">
        <div className="grid grid-rows-2 gap-4">
          <Link
            to={""}
            className="shadow-box mb-4 lg:mb-0"
            style={{
              backgroundImage:
                "https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661",
            }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661"
              alt="1"
            />
          </Link>
          <Link
            to={""}
            className="shadow-box"
            style={{
              backgroundImage:
                "https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661",
            }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661"
              alt="1"
            />
          </Link>
        </div>{" "}
        <Link
          to={""}
          className="shadow-box"
          style={{
            backgroundImage:
              "https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661",
          }}
        >
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
            alt="1"
          />
        </Link>
      </div>
    </section>
  );
};

Banner3.propTypes = {};

export default Banner3;
