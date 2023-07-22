import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import * as apiProduct from "../../apis/product";
import path from "../../until/path";
import icons from "../../until/icon";
import { useDebounce } from "../../until/hook";
import { Button, Pagination, ProductT1 } from "../../components";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react/headless";

const { AiFillCaretDown } = icons;
const Product = (props) => {
  const location = useLocation();
  const { rams, colors, internals, brands, categories } = useSelector((state) => state.app);
  const [searchParams, setSearchParams] = useSearchParams();

  const idCategory = location.state?.idCategory;
  const idBrand = location.state?.idBrand;

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPage, settotalPage] = useState(0);
  const [values, setValues] = useState({
    priceFrom: 0,
    priceTo: 0,
    colors: [],
    rams: [],
    internals: [],
  });
  const [title, setTitle] = useState();
  const [resset, setResset] = useState(false);

  const handleValue = (id, name) => {
    const isChecked = values[name].includes(id);
    if (isChecked) {
      setValues((prev) => ({
        ...prev,
        [name]: [...values[name].filter((idName) => idName !== id)],
      }));
    } else {
      setValues((prev) => ({ ...prev, [name]: [...values[name], id] }));
    }
  };
  const debounceValue = useDebounce(values, 1200);
  useEffect(() => {
    let queryObj = {};
    if (idCategory) {
      queryObj.category = idCategory;
    }
    if (idBrand) {
      queryObj.brand = idBrand;
    }
    if (searchParams.get("title")) {
      queryObj.title = searchParams.get("title");
    }
    const fetchApi = async () => {
      const rs = await apiProduct.getAll({
        limit: 8,
        page,
        ...queryObj,
        ...debounceValue,
      });
      // console.log(rs);
      if (rs?.sucess) {
        setProducts(rs?.data);
        settotalPage(rs?.count);
      }
    };
    fetchApi();
  }, [debounceValue, idCategory, page, idBrand, searchParams]);

  useEffect(() => {
    if (
      values.colors.length > 0 ||
      values.rams.length > 0 ||
      values.internals.length > 0 ||
      +values.priceFrom > 0 ||
      +values.priceTo > 0
    ) {
      // setSearchParams({...values});
      setResset(true);
    } else {
      // setSearchParams({});
      setResset(false);
    }
  }, [values]);

  return (
    <div className="space-y-5 text-base max-md:text-sm">
      {searchParams.get("q") && (
        <div className="py-[15px]">
          <h3 className="text-xl font-semibold text-black uppercase mb-2 ">
            {searchParams.get("q")}
          </h3>
          <div className="flex divide-x-2 divide-gray-500">
            <Link
              to={`/${path.HOME}`}
              className="text-sm text-gray-500 
              hover:text-main capitalize pr-2"
            >
              Home
            </Link>
            <span className="text-sm text-gray-500 px-2 ">
              {searchParams.get("q").charAt(0).toUpperCase() +
                searchParams.get("q").slice(1).toLowerCase()}
            </span>
          </div>
        </div>
      )}
      <div className="bg-white p-2 border flex max-xs:flex-col max-md:items-start items-center justify-between border-gray-300 space-y-2 gap-5">
        <div className="max-md:w-full">
          <h2 className="font-semibold text-third capitalize">filter by</h2>
          <div className="flex md:flex-row items-center max-md:flex-col max-md:w-full gap-2 ">
            <div className="w-full">
              <Tippy
                placement="bottom-start"
                interactive
                delay={[200, 300]}
                render={(attrs) => (
                  <div
                    className="w-[330px] h-screen-50 overflow-y-auto  border-gray-300 border bg-white relative  text-gray-400 "
                    tabIndex="-1"
                    {...attrs}
                  >
                    {" "}
                    <div className="fixed bg-white top-0 left-0 w-full h-[76px] border boder-gray-400  z-10 justify-center items-center flex flex-col">
                      <span>Default price VND </span>
                      <span>Please enter price example 1000000</span>
                    </div>
                    <div className="mt-[96px] space-y-5 flex flex-col justify-around items-center pl-5">
                      <div className="relative">
                        <input
                          type="number"
                          id="username"
                          className="border border-gray-300 py-2 pl-5 pr-[40px]  transition-colors outline-none w-full focus:border-red-300  peer "
                          onChange={(e) =>
                            setValues((prev) => ({
                              ...prev,
                              priceFrom: e.target.value,
                            }))
                          }
                          value={values.priceFrom}
                        />
                        <label
                          htmlFor="username"
                          className={`absolute -left-7  text-gray-600 cursor-text   ${
                            values.priceFrom > 0
                              ? "-top-5"
                              : "top-[50%] -translate-y-[50%] peer-focus:-top-2 peer-focus:text-sm transition-all"
                          }  `}
                        >
                          From
                        </label>
                        <span className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-600 cursor-text ">
                          VND
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          id="username"
                          className="border border-gray-300 py-2 pl-5 pr-[40px]  transition-colors outline-none w-full focus:border-red-300  peer "
                          onChange={(e) =>
                            setValues((prev) => ({
                              ...prev,
                              priceTo: e.target.value,
                            }))
                          }
                          value={values.priceTo}
                        />
                        <label
                          htmlFor="username"
                          className={`absolute -left-7  text-gray-600 cursor-text   ${
                            values.priceTo > 0
                              ? "-top-5"
                              : "top-[50%] -translate-y-[50%] peer-focus:-top-2 peer-focus:text-sm transition-all"
                          }  `}
                        >
                          To
                        </label>
                        <span className="absolute right-2 top-[50%] -translate-y-[50%] text-gray-600 cursor-text ">
                          VND
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              >
                <div className="flex items-center gap-2 px-5 py-4 max-md:py-2 border border-gray-400  text-gray-400 appearance-none">
                  <span>Price</span>
                  <AiFillCaretDown />
                </div>
              </Tippy>
            </div>
            <div className="w-full">
              <Tippy
                placement="bottom-start"
                // hideOnClick
                // maxWidth={"330px"}
                interactive
                delay={[200, 300]}
                render={(attrs) => (
                  <div
                    className="w-[330px] h-screen-50 overflow-y-auto border border-gray-300 bg-white relative  text-gray-400"
                    tabIndex="-1"
                    {...attrs}
                  >
                    <div className="fixed bg-white top-0 left-0 w-full h-[76px] border boder-gray-400 flex items-center justify-center z-10">
                      <span>0 selected</span>
                    </div>
                    <ul className="space-y-2 mt-[76px] ">
                      {colors?.map((color) => {
                        return (
                          <li
                            key={color?._id}
                            className="w-full px-5 py-2 border-b-2 hover:border-gray-400 flex items-center justify-center gap-2 relative"
                          >
                            <input
                              type="checkbox"
                              id={color?.name}
                              className="relative h-5 w-5 shrink-0 appearance-none rounded-sm border  border-gray-300 hover:border-blue-300 checked:border-red-300 checked:text-main  focus:outline-none"
                              checked={values.colors.includes(color?._id)}
                              onChange={() => handleValue(color?._id, "colors")}
                            />
                            <label
                              htmlFor={color?.name}
                              className={`w-full cursor-pointer font-medium text-gray-600 ${
                                values.colors.includes(color?._id) ? "text-main" : ""
                              }`}
                            >
                              {color?.name}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              >
                <div className="flex items-center gap-2 px-5 py-4 max-md:py-2 border border-gray-400  text-gray-400 appearance-none">
                  <span>Color</span>
                  <AiFillCaretDown />
                </div>
              </Tippy>
            </div>
            <div className="w-full">
              <Tippy
                placement="bottom-start"
                // hideOnClick
                // maxWidth={"330px"}
                interactive
                delay={[200, 300]}
                render={(attrs) => (
                  <div
                    className="w-[330px] h-screen-50 overflow-y-auto border border-gray-300 bg-white relative  text-gray-400"
                    tabIndex="-1"
                    {...attrs}
                  >
                    <div className="fixed bg-white top-0 left-0 w-full h-[76px] border boder-gray-400 flex items-center justify-center z-10">
                      <span>0 selected</span>
                    </div>
                    <ul className="space-y-2 mt-[76px] ">
                      {rams?.map((ram) => {
                        return (
                          <li
                            key={ram?._id}
                            className="w-full px-5 py-2 border-b-2 hover:border-gray-400 flex items-center justify-center gap-2 relative"
                          >
                            <input
                              type="checkbox"
                              id={ram?.name}
                              className="relative h-5 w-5 shrink-0 appearance-none rounded-sm border  border-gray-300 hover:border-blue-300 checked:border-red-300 checked:text-main  focus:outline-none"
                              checked={values.rams.includes(ram?._id)}
                              onChange={() => handleValue(ram?._id, "rams")}
                            />
                            <label
                              htmlFor={ram?.name}
                              className={`w-full cursor-pointer font-medium text-gray-600 ${
                                values.rams.includes(ram?._id) ? "text-main" : ""
                              }`}
                            >
                              {ram?.name}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              >
                <div className="flex items-center gap-2 px-5 py-4 max-md:py-2 border border-gray-400  text-gray-400 appearance-none">
                  <span>Ram</span>
                  <AiFillCaretDown />
                </div>
              </Tippy>
            </div>
            <div className="w-full">
              <Tippy
                placement="bottom-start"
                // hideOnClick
                // maxWidth={"330px"}
                interactive
                delay={[200, 300]}
                render={(attrs) => (
                  <div
                    className="w-[330px] h-screen-50 overflow-y-auto border border-gray-300 bg-white relative  text-gray-400"
                    tabIndex="-1"
                    {...attrs}
                  >
                    <div className="fixed bg-white top-0 left-0 w-full h-[76px] border boder-gray-400 flex items-center justify-center z-10">
                      <span>0 selected</span>
                    </div>
                    <ul className="space-y-2 mt-[76px] ">
                      {internals?.map((internal) => {
                        return (
                          <li
                            key={internal?._id}
                            className="w-full px-5 py-2 border-b-2 hover:border-gray-400 flex items-center justify-center gap-2 relative"
                          >
                            <input
                              type="checkbox"
                              id={internal?.name}
                              className="relative h-5 w-5 shrink-0 appearance-none rounded-sm border  border-gray-300 hover:border-blue-300 checked:border-red-300 checked:text-main  focus:outline-none"
                              checked={values.internals.includes(internal?._id)}
                              onChange={() => handleValue(internal?._id, "internals")}
                            />
                            <label
                              htmlFor={internal?.name}
                              className={`w-full cursor-pointer font-medium text-gray-600 ${
                                values.internals.includes(internal?._id) ? "text-main" : ""
                              }`}
                            >
                              {internal?.name}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              >
                <div className="flex items-center gap-2 px-5 py-4 max-md:py-2 border border-gray-400  text-gray-400 appearance-none">
                  <span>Internal</span>
                  <AiFillCaretDown />
                </div>
              </Tippy>
            </div>
            {resset && (
              <Button
                className="flex items-center gap-2 px-5 py-4 max-md:py-2 border border-gray-400  text-gray-400 appearance-none hover:border-blue-300 active:border-red-300 w-full"
                onHanldeClick={() => {
                  setValues({
                    priceFrom: "",
                    priceTo: "",
                    colors: [],
                    rams: [],
                    internals: [],
                  });
                  setResset(false);
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
        <div>
          {" "}
          <h2 className=" font-semibold text-third capitalize">sort by</h2>
          <select
            onChange={(e) => {
              setValues((prev) => ({ ...prev, sort: `${e.target.value}` }));
            }}
          >
            <option defaultChecked>--Bộ lọc--</option>
            <option value={"-features"}>Featured</option>
            <option value={"title"}>Theo bảng chữ cái, A-Z</option>
            <option value="-title">Theo bảng chữ cái, Z-A</option>
            <option value="price">Giá từ thấp đến cao</option>
            <option value="-price">Giá từ cao đến thấp</option>
            <option value="created">Ngày cũ</option>
            <option value="-created">Mới bán</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <div className="grid-layout">
          <div className="row">
            {products.length > 0 &&
              products?.map((product) => {
                return (
                  <div className="col l-3 s-4 c-6 mb-5" key={product?._id}>
                    <ProductT1 isShowDesModal imgSmall uiGridLayout data={product} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Pagination pageSize={totalPage} current={page} onChange={setPage} />
    </div>
  );
};

Product.propTypes = {};

export default Product;
