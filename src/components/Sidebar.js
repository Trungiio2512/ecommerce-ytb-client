import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import icons from "../until/icon";
import path from "../until/path";
import * as category from "../apis/category";

const { FaList } = icons;

const Sidebar = (props) => {
  // // const [categories, setcategories] = useState([]);
  // useEffect(() => {
  //   const api = async () => {
  //     const res = await category.getAll();
  //     // console.log(res);
  //     setcategories(res.data);
  //   };
  //   api();
  // }, []);
  const { isLoading, categories } = useSelector((state) => state.app);
  // console.log(categories);
  return (
    <div className="w-full ">
      <aside className="border-1 border-main border-solid rounded-sm bg-white">
        <div className="bg-main text-base text-white px-5 py-4 flex items-center gap-3">
          <span className="">
            <FaList />
          </span>
          <span className="uppercase font-semibold">all colections</span>
        </div>
        <ul>
          {categories.length > 0 &&
            categories.map((category) => (
              <li className="px-5 py-3" key={category?._id}>
                <Link
                  to={{
                    pathname: `${path.SEACH}`,
                    search: `${createSearchParams({ type: category?.slug })}`,
                  }}
                  className="flex items-center gap-2 hover:text-main text-second"
                  state={{ idCategory: category?._id }}
                >
                  <span className="">icon</span>
                  <span className="text-sm">{category?.title}</span>
                </Link>
              </li>
            ))}
        </ul>
      </aside>
    </div>
  );
};

Sidebar.propTypes = {};

export default memo(Sidebar);
