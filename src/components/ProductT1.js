import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductT1 = ({ data }) => {
  console.log(data);
  return (
    <div className="border border-gray-200 mx-[10px] p-4">
      <Link to={"/"}>
        <figure className="h-[243px] w-full">
          <img src={data?.thumb} alt={data?.title} className="w-full h-full" />
        </figure>
      </Link>
      <div className="mt-4">
        <h3 className="text-[#2b3743]">{data?.title}</h3>
        <span className="text-[#333]">{`${data?.price} VND`}</span>
      </div>
    </div>
  );
};

ProductT1.propTypes = {};

export default ProductT1;
