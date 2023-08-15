import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as apiProduct from "../apis/product";
import { useSelector } from "react-redux";
import ProductT2 from "./ProductT2";

const Featured = (props) => {
  const { categories } = useSelector((state) => state.app);

  // const [products, setproducts] = useState([]);
  const [phones, setphones] = useState([]);
  const [laptops, setlaptops] = useState([]);
  const [accessories, setproductAccessories] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await apiProduct.getAll({
        fields: "thumb title price priceSale totalRatings slug",
        features: true,
        limit: 60,
      });
      if (res?.sucess) {
        // setproducts(res?.data);
        const idSmartphone = categories.find((el) => el?.title === "Smartphone")?._id;
        const idLaptop = categories.find((el) => el?.title === "Laptop")?._id;
        const idAccessories = categories.find((el) => el?.title === "Accessories")?._id;

        const productPhone = res?.data.filter((el) => el?.category?._id === idSmartphone);
        const productLaptop = res?.data.filter((el) => el?.category?._id === idLaptop);
        const productAccessories = res?.data.filter((el) => el?.category?._id === idAccessories);
        //   console.log(productLaptop, productPhone, productTablet);
        productPhone.length > 0 && setphones(productPhone);
        productLaptop.length > 0 && setlaptops(productLaptop);
        productAccessories.length > 0 && setproductAccessories(productAccessories);
      }
    };
    fetchApi();
  }, [categories]);
  console.log(accessories)
  return (
    <section>
      <h2 className="uppercase text-xl font-semibold py-4 border-b-[3px] mb-5 border-red-400">
        Gợi ý sản phẩm
      </h2>
      <div className="grid-layout">
        <div className="row">
          <div className="col l-4 s-6 c-12">
            {phones.length > 0 &&
              phones.map((phone, index) => {
                return <ProductT2 product={phone} key={index} />;
              })}
          </div>
          <div className="col l-4 s-6 c-12">
            {laptops.length > 0 &&
              laptops.map((laptop, index) => {
                return <ProductT2 product={laptop} key={index} />;
              })}
          </div>
          <div className="col l-4 s-6 c-12">
            {accessories.length > 0 &&
              accessories.map((accessoriy, index) => {
                return <ProductT2 product={accessoriy} key={index} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

Featured.propTypes = {};

export default memo(Featured);
