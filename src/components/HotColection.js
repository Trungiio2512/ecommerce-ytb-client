import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import path from "../until/path";
const HotColection = () => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="mt-4">
      <div className="border-b-2 border-red-400 py-4 mb-4">
        <h2 className="uppercase text-2xl max-sm:text-lg font-semibold ">Sản phẩm yêu thích</h2>
      </div>
      <div className="grid-layout">
        <div className="row ">
          {categories.length > 0
            ? categories.map((ele) => {
                return (
                  ele?.brands?.length > 0 && (
                    <div className="col l-4 s-4 c-6 mb-[24px]" key={ele?._id}>
                      <div className="flex sm:flex-row sm:items-center max-sm:flex-col gap-4 border border-gray-300 p-[15px] h-full w-full">
                        <figure className="max-sm:w-[100px] sm:w-6/12 sm:pl-5">
                          <img src={ele?.image?.url} alt={ele?.title} />
                        </figure>
                        <div className="flex-1">
                          <h3 className="text-lg text-gray-500 font-semibold text-left">{ele?.title}</h3>
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
              })
            : [1, 2, 3].map((i) => (
                <div className="col l-4 s-4 c-6 mb-[24px]" key={i}>
                  <div className="flex sm:flex-row animate-pulse sm:items-center max-sm:flex-col gap-4 border border-gray-300 p-[15px] h-full w-full">
                    <div className="max-sm:w-[100px] flex items-center justify-center sm:w-6/12 sm:pl-5">
                      <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="h-6 mb-2 bg-gray-300 w-[100px]"></div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 bg-gray-300 "></div>
                        <div className="h-4 bg-gray-300 "></div>
                        <div className="h-4 bg-gray-300 "></div>
                        <div className="h-4 bg-gray-300 "></div>
                        <div className="h-4 bg-gray-300 "></div>
                        <div className="h-4 bg-gray-300 "></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

HotColection.propTypes = {};

export default memo(HotColection);
