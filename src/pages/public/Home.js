import React from "react";
import PropTypes from "prop-types";
import { Header, Sidebar } from "../../components";
const Home = (props) => {
  return (
    <div className="">
      <div>
        <div className="flex ">
          {" "}
          <div className="w-4/12">
            <Sidebar />
          </div>
          <div className="w-8/12">slider</div>
        </div>
        <div> daily</div>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
