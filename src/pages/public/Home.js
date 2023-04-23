import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Banner, Sidebar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
// import { getAll } from "../../app/actions/category";
import * as product from "../../apis/product";
const Home = (props) => {
  const [bestSeller, setBestSeller] = useState([]);
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    if (categories.length > 0) {
      const fetchApi = async () => {
        const res = await Promise.all([
          product.getAll({
            news: true,
            category: categories.find((el) => el?.title === "Smartphone")?._id,
          }),
          // product.getAll({ sort: "-sold" }),
        ]);
        if (res[0]?.success) {
          setBestSeller(res[0].data);
        }
      };

      fetchApi();
    }
  }, [categories]);
  console.log(bestSeller);
  return (
    <main>
      <div className="flex ">
        {" "}
        <div className="w-4/12">
          <Sidebar />
        </div>
        <div className="w-8/12 pl-5">
          <Banner />
        </div>
      </div>
      <div> daily</div>
    </main>
  );
};

Home.propTypes = {};

export default Home;
