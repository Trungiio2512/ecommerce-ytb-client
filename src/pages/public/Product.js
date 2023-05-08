import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import * as apiProduct from "../../apis/product";

const Product = (props) => {
  const location = useLocation();
  const id = location.state?.id;
  const title = location.state?.title;

  const [page, setPage] = useState(2);
  useEffect(() => {
    let category;
    if (id) {
      category = id;
    }
    const fetchApi = async () => {
      const rs = await apiProduct.getAll({ category, page });
      console.log(rs);
    };
    fetchApi();
  }, [id, page]);
  return <div>Product</div>;
};

Product.propTypes = {};

export default Product;
