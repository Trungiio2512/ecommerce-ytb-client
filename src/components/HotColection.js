import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import path from "../until/path";
const HotColection = (props) => {
  const { categories } = useSelector((state) => state.app);
  // console.log(categories);

  return (
    <div className="mt-4">
      <div className="border-b-2 border-red-400 py-4 mb-4">
        <h2 className="uppercase text-2xl max-sm:text-lg font-semibold ">Sản phẩm yêu thích</h2>
      </div>
      <div className="grid-layout">
        <div className="row ">
          {categories.length > 0 &&
            categories.map((ele) => {
              return (
                ele?.brands?.length > 0 && (
                  <div className="col l-4 s-4 c-6 mb-[24px]" key={ele?._id}>
                    <div className="flex sm:flex-row sm:items-center max-sm:flex-col gap-4 border border-gray-300 p-[15px] h-full w-full">
                      <figure className="max-sm:w-[100px] sm:w-6/12 sm:pl-5">
                        <img src={ele?.image} alt={ele?.title} />
                      </figure>
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-500 font-semibold text-left">
                          {ele?.title}
                        </h3>
                        <ul>
                          {ele?.brands?.map((brand) => {
                            return (
                              <li key={brand?._id}>
                                <Link
                                  // eslint-disable-next-line no-octal-escape
                                  className="before:content-['\276F'] before:pr-2 text-gray-400 text-sm hover:text-main"
                                  to={{
                                    pathname: `${path.SEACH}`,
                                    search: `${createSearchParams({
                                      type: ele?.slug,
                                      q: brand?.slug,
                                    })}`,
                                  }}
                                  state={{ idCategory: ele?._id, idBrand: brand?._id }}
                                  // replace
                                >
                                  {brand?.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
};

HotColection.propTypes = {};

export default memo(HotColection);
