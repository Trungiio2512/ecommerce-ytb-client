import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormInput, Pagination } from "../../components";
import * as apiProduct from "../../apis/product";
import { formatVND } from "../../until/fn";
import { useDebounce } from "../../until/hook";
import path from "../../until/path";

const ManagerProduct = (props) => {
  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [searchValue, setSearchValue] = useState(null);

  const debounced = useDebounce(searchValue, 1000);
  useEffect(() => {
    const obj = {};
    if (debounced && debounced.length > 0) {
      obj.title = debounced;
    }
    const fetchApi = async () => {
      const rs = await apiProduct.getAll({
        fields: "thumb title slug price priceSale",
        page,
        ...obj,
      });
      if (rs.sucess) {
        setproducts(rs.data);
        setTotalPage(rs?.count);
        setLoading(false);
      }
    };
    fetchApi();
  }, [debounced, page]);
  return (
    <div className="w-full p-5">
      <div className="flex flex-col sm:flex-row items-start sm:justify-between sm:items-center mb-5">
        <h2 className="text-xl text-third font-medium sm:mb-0 mb-5">Manager Product</h2>
        <FormInput
          className="outline-none border border-gray-300 px-5 py-2 hover:border-blue-300 w-full sm:w-[300px]"
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Link
        className="px-5 py-2 rounded-md bg-blue-300 "
        to={`/${path.ADMIN}/${path.CREATE_PRODUCT}`}
      >
        Create new product
      </Link>
      <div className="relative hidden xl:block shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={product?._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900  dark:text-white"
                    >
                      {product?.title}
                    </th>{" "}
                    <td className="px-6 py-4">
                      <div className="w-[100px] h-[100px]">
                        <figure className="w-full h-full">
                          <img src={product?.thumb} alt="" />
                        </figure>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-2">
                        <span
                          className={`${
                            product?.priceSale
                              ? "l ine-through text-gray-500"
                              : "text-third text-lg"
                          } text-sm`}
                        >
                          {formatVND(product?.price)}
                        </span>
                        {product?.priceSale && (
                          <span
                            className={`text-white text-base
                           `}
                          >
                            {formatVND(product?.priceSale)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{product?.category?.title}</td>
                    <td className="px-6 py-4">{product?.brand?.title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-white text-third rounded-md active:bg-red-300">
                          Delete
                        </button>
                        <button className={`bg-green-400  px-3 py-1 rounded-md text-white`}>
                          change
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="xl:hidden block mt-5">
        <div className="grid-layout ">
          <div className="row">
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <div className="col l-6 s-6 c-12 mb-5" key={product?._id}>
                    <div className="w-full p-4 rounded-md bg-white border-b dark:bg-gray-900 shadow-lg dark:border-gray-700 text-white">
                      <h2 className="font-medium text-gray-900  dark:text-white line-clamp-1 mb-2">
                        {product?.title}
                      </h2>{" "}
                      <div className="flex flex-col sm:flex-row sm:items-start items-start gap-5">
                        <div className="w-[100px] h-[100px] shrink-0">
                          <figure className="w-full h-full">
                            <img src={product?.thumb} alt="" />
                          </figure>
                        </div>
                        <div className="flex flex-col items-start w-full gap-2">
                          <span
                            className={`${
                              product?.priceSale
                                ? "line-through text-gray-500"
                                : "text-third text-lg"
                            } text-sm`}
                          >
                            {formatVND(product?.price)}
                          </span>
                          {product?.priceSale && (
                            <span
                              className={`text-white text-lg
                               `}
                            >
                              {formatVND(product?.priceSale)}
                            </span>
                          )}
                          <span className="">Cartegory: {product?.category?.title}</span>
                          <span className="">Brand: {product?.brand?.title}</span>
                          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                            <button className="px-3 w-full py-1 bg-white text-third rounded-md active:bg-red-300">
                              Delete
                            </button>
                            <button
                              className={` w-full bg-green-400  px-3 py-1 rounded-md text-white`}
                            >
                              change
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Pagination current={page} pageSize={totalPage} onChange={setPage} />
    </div>
  );
};

ManagerProduct.propTypes = {};

export default ManagerProduct;
