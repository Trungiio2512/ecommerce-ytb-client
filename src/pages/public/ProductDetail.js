import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";

import path from "../../until/path";
import * as apiProduct from "../../apis/product";
import { formatVND, getStars } from "../../until/fn";
import Button from "../../components/Button";
import ProductT1 from "../../components/ProductT1";
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
  const [product, setProduct] = useState({});
  const [ortherProducts, setOrtherProducts] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const handleDecrementQuantity = () => {
    if (quantity <= 0) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrementQuantity = () => {
    if (quantity > product?.quantity) {
      return;
    } else {
      setQuantity(quantity + 1);
    }
  };
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
          <div className="grid-layout">
            <div className="row">
              <div className="col l-6 s-6 c-12">
                <div className="space-y-5">
                  <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
                    {product?.images.map((image, index) => {
                      return (
                        <div className="flex" key={index}>
                          <div className="w-[458px] m-auto">
                            <figure className="w-full h-full">
                              <img src={image} alt="" />
                            </figure>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                  <Slider
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  >
                    {product?.images.map((image, index) => {
                      return (
                        <div className="w-[153px]" key={index}>
                          <figure className="w-full h-full">
                            <img src={image} alt="" />
                          </figure>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
              <div className="col l-6 s-6 c-12">
                <div className="space-y-5 pl-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-600 line-through font-normal">
                      {formatVND(product?.price)}
                    </span>
                    <span className="text-2xl text-third font-semibold">
                      {formatVND(product?.priceSale)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center text-xl">
                      {" "}
                      {getStars(product?.totalRatings)}
                    </span>
                    <span className="text-base text-gray-500"> 0 review</span>
                  </div>
                  <ul className="list-square text-base text-gray-500 space-y-2">
                    {product?.specifications?.map((ele, index) => {
                      return (
                        <li className="" key={index}>
                          {ele}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex items-center gap-2">
                    <span className="text-third text-lg font-semibold capitalize"> quantity</span>
                    <div className="relative inline-block">
                      <Button
                        className={
                          "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 left-0 h-full px-3 border border-gray-400 rounded-l-md hover:border-red-300 focus:border-red-500"
                        }
                        onHanldeClick={() => handleDecrementQuantity()}
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        className="outline-none text-center border border-gray-400 hover:border-red-300 focus:border-red-500 focus:bg-red-200 focus:text-third transition-all duration-300 text-lg px-1 py-2 rounded-lg w-full md:max-w-[200px]"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <Button
                        className={
                          "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 right-0 h-full px-3 border border-gray-400 rounded-r-md"
                        }
                        onHanldeClick={() => handleIncrementQuantity()}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    className={"w-6/12 text-center py-2 uppercase bg-main text-white font-semibold"}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
