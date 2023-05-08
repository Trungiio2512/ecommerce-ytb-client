import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";

import path from "../../until/path";
import * as apiProduct from "../../apis/product";
import { formatVND, getStars } from "../../until/fn";
import Button from "../../components/Button";
import ProductT1 from "../../components/ProductT1";
import ProductDetailContent from "../../components/ProductDetailContent";
const tabTitles = ["description", "warranty", "delivery", "payment", "customer reviewer"];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};
const ProductDetail = (props) => {
  const location = useLocation();
  const { brand, category, title } = useParams();
  const id = location.state?.id;
  const [ortherProducts, setOrtherProducts] = useState([]);
  const [product, setProduct] = useState({});

  // console.log(id);
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

  //tab ui
  useEffect(() => {
    if (Object.keys(product).length > 0) {
      const tabTitles = document.querySelectorAll("li.tabTitle");
      const line = document.querySelector("div.line");
      const tabContent = document.querySelectorAll("div.tabContent");
      const tabActive = document.querySelector("li.active.tabTitle");
      line.style.left = tabActive.offsetLeft + "px";
      line.style.width = tabActive.offsetWidth + "px";
      // console.log(tabContent);
      // console.log(tabTitles);
      tabTitles.forEach((ele, index) => {
        const pane = tabContent[index];
        ele.onclick = function () {
          // console.log(pane);
          // console.log(tabActive);
          // console.log(line);
          document.querySelector("li.active.tabTitle").classList.remove("active");
          document.querySelector("div.tabContent.active").classList.remove("active");
          line.style.left = this.offsetLeft + "px";
          line.style.width = this.offsetWidth + "px";

          this.classList.add("active");
          pane.classList.add("active");
        };
      });
    }
  }, [product]);

  useEffect(() => {
    const fetchOrtherProduct = async () => {
      const rs = await apiProduct.getAll({ category: product?.category, limit: 10 });
      // console.log(rs);
      if (rs?.sucess) {
        setOrtherProducts(rs?.data);
      }
    };
    fetchOrtherProduct();
  }, [product]);

  return (
    <div className="">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-black uppercase mb-2">{brand}</h3>
        <div className="flex divide-x-2 divide-gray-500">
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
      {Object.keys(product).length > 0 && (
        <div className="space-y-5">
          <ProductDetailContent product={product} />
          <div>
            <ul className="flex items-center gap-1 relative">
              {tabTitles.map((title, index) => {
                return (
                  <li
                    className={`tabTitle uppercase text-lg px-5 py-2 border border-gray-300 text-gray-600 cursor-pointer ${
                      index === 0 ? "active" : ""
                    }`}
                    key={index}
                  >
                    {title}
                  </li>
                );
              })}
              <div className="line"></div>
            </ul>
            <div
              className={`tabContent active px-5 py-5 mt-5 text-sm border border-gray-300 text-gray-600 `}
            >
              {product?.description}
            </div>{" "}
            <div
              className={`tabContent px-5 py-5 mt-5 text-sm border border-gray-300 text-gray-600 `}
            >
              {product?.warranty}
            </div>
            <div
              className={`tabContent px-5 py-5 mt-5 text-sm border border-gray-300 text-gray-600 `}
            >
              {product?.delivery}
            </div>
            <div
              className={`tabContent px-5 py-5 mt-5 text-sm border border-gray-300 text-gray-600 `}
            >
              {product?.payment}
            </div>
            <div
              className={`tabContent px-5 py-5 mt-5 text-sm border border-gray-300 text-gray-600 `}
            >
              custom review
            </div>
          </div>
        </div>
      )}
      {ortherProducts.length > 0 && (
        <div className="mt-[30px]">
          <h3 className="font-medium text-xl text-third uppercase py-1 border-b-1 border-red-400 mb-[50px]">
            OTHER CUSTOMERS ALSO BUY:
          </h3>
          <Slider {...settings}>
            {ortherProducts.map((el) => {
              return <ProductT1 imgSmall isShowDesModal key={el?._id} data={el} />;
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

ProductDetail.propTypes = {};

export default ProductDetail;
