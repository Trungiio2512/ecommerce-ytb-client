import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const ProductDetail = (props) => {
  const location = useLocation();

  const id = location.state?.id;
  console.log(id);
  return <div>ProductDetail</div>;
};

ProductDetail.propTypes = {};

export default ProductDetail;
