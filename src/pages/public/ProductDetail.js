import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";
import path from "../../until/path";
import * as apiProduct from "../../apis/product";

const ProductDetail = (props) => {
  const location = useLocation();
  const { brand, category, title } = useParams();

  const [product, setProduct] = useState({});
  const id = location.state?.id;
  console.log(id);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiProduct.getOne(id);
      console.log(rs);
      if (rs?.sucess) {
        setProduct(rs?.data);
      }
    };
    fetchApi();
  }, [id]);

  return (
    <div className="">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-black uppercase mb-2">{brand}</h3>
        <div className="flex divide-x-2">
          <Link
            to={`/${path.HOME}`}
            className="text-sm text-gray-500 
          hover:text-main capitalize pr-2"
          >
            Home
          </Link>
          <Link
            to={`/`}
            className="text-sm text-gray-500 
          hover:text-main px-2 "
          >
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </Link>
          <Link
            to={`/`}
            className="text-sm text-gray-500 
          hover:text-main px-2"
          >
            {brand}
          </Link>
          <span className="text-sm text-gray-500 px-2">{title}</span>
        </div>
      </div>
      <div className="grid-layout">
        <div className="row">
          <div className="col l-6 s-6 c-12"></div>
          <div className="col l-6 s-6 c-12"></div>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {};

export default ProductDetail;
