import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Banner,
  Banner2,
  Banner3,
  Featured,
  Footer,
  HotColection,
  NewArrivals,
  ProductDeal,
  Sidebar,
  TabProduct,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
// import { getAll } from "../../app/actions/category";
const Home = (props) => {
  return (
    <main>
      {" "}
      <div className="block sm:flex sm:flex-row sm:gap-4">
        <div className="md:w-3/12 md:block hidden">
          {" "}
          <Sidebar />
        </div>
        <div className="md:w-9/12">
          <Banner />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-3/12">
          <ProductDeal />
        </div>
        <div className="md:w-9/12">
          <TabProduct />
          <Banner2 />
        </div>
      </div>
      <Featured />
      <Banner3 />
      <NewArrivals />
      <HotColection />
      {/* <div> daily</div> */}
    </main>
  );
};

Home.propTypes = {};

export default Home;
