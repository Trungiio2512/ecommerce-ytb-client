import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Banner, Sidebar, TabProduct } from "../../components";
import { useDispatch, useSelector } from "react-redux";
// import { getAll } from "../../app/actions/category";
const Home = (props) => {
  const { categories } = useSelector((state) => state.app);

  return (
    <main>
      <div className="flex ">
        {" "}
        <div className="w-4/12">
          <Sidebar />
        </div>
        <div className="w-8/12 pl-5">
          <Banner />
          <TabProduct categories={categories} />
        </div>
      </div>
      <div> daily</div>
    </main>
  );
};

Home.propTypes = {};

export default Home;
