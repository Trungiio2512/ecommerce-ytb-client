import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const HotColection = (props) => {
  const { categories } = useSelector((state) => state.app);
  console.log(categories);
  return (
    <div className="mt-4">
      <div className="border-b-2 border-red-400 mb-4 py-4">
        <h2 className="uppercase text-2xl font-semibold ">Hot Colection</h2>
      </div>
      <div className="grid">
        <div className="row">
          {categories.length > 0 &&
            categories.map((ele) => {
              return (
                <div className="col l-4 s-6 c-12" key={ele?._id}>
                  <Link to={`/${ele?.slug}`}>
                    <figure>
                      <img src={ele?.image} alt={ele?.title} />
                    </figure>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

HotColection.propTypes = {};

export default HotColection;
