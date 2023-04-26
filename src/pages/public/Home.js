import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Banner, Banner2, ProductDeal, Sidebar, TabProduct } from "../../components";
import { useDispatch, useSelector } from "react-redux";
// import { getAll } from "../../app/actions/category";
const Home = (props) => {
  const { categories } = useSelector((state) => state.app);

  return (
    <main>
      <div className="flex ">
        {" "}
        <div className="w-3/12">
          <Sidebar />
          <ProductDeal />
        </div>
        <div className="w-9/12 pl-5">
          <Banner />
          <TabProduct categories={categories} />
          <Banner2 />
        </div>
      </div>
      <div> daily</div>
    </main>
  );
};

Home.propTypes = {};

export default Home;
