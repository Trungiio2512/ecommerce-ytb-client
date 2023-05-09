import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import * as apiProduct from "../../apis/product";
import path from "../../until/path";
import icons from "../../until/icon";
import { Pagination, ProductT1 } from "../../components";
import { useSelector } from "react-redux";
const { AiFillCaretDown } = icons;
const Product = (props) => {
  const location = useLocation();
  const { rams, colors, internals } = useSelector((state) => state.app);

  const id = location.state?.id;
  const title = location.state?.title;

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPage, settotalPage] = useState(0);
  const [values, setValues] = useState({
    priceFrom: "",
    priceTo: "",
  });

  const handleNextPage = () => {
    if (page >= totalPage) {
      return;
    }
    setPage(page + 1);
  };
  const handleBackPage = () => {
    if (page <= 1) {
      return;
    }
    setPage(page - 1);
  };

  const handleToPage = (page) => {
    setPage(page);
    // console.log(page);
  };

  useEffect(() => {
    let category;
    if (id) {
      category = id;
    }
    const fetchApi = async () => {
      const rs = await apiProduct.getAll({ category, page, limit: 8 });
      // console.log(rs);
      if (rs?.sucess) {
        setProducts(rs?.data);
        settotalPage(rs?.count);
      }
    };
    fetchApi();
  }, [id, page]);
  return (
    <div
      className="space-y-5
    "
    >
      <div className="py-[15px]">
        {title && (
          <>
            <h3 className="text-xl font-semibold text-black uppercase mb-2 ">{title}</h3>
            <div className="flex divide-x-2 divide-gray-500">
              <Link
                to={`/${path.HOME}`}
                className="text-sm text-gray-500 
              hover:text-main capitalize pr-2"
              >
                Home
              </Link>
              <span className="text-sm text-gray-500 px-2 ">
                {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="bg-white p-2 border flex items-center justify-between border-gray-300 space-y-2">
        <div>
          <h2 className="text-base font-semibold text-third capitalize">filter by</h2>
          <div className="flex items-center gap-2 bg-">
            <details className="relative ">
              <summary className="px-5 py-4 border border-gray-400 text-base appearance-none">
                <div className="flex items-center gap-2">
                  <span>Price</span>
                  <AiFillCaretDown />
                </div>
              </summary>
              <div className="bg-white absolute top-[100% + 5px] left-0 w-[35rem] max-h-[55rem] overflow-y-auto z-10">
                content
              </div>
            </details>
            <details className="relative">
              <summary className="px-5 py-4 border border-gray-400 text-base appearance-none">
                <div className="flex items-center gap-2">
                  <span>Color</span>
                  <AiFillCaretDown />
                </div>
              </summary>
              <div className="bg-white absolute top-[100% + 5px] left-0 w-[35rem] max-h-[55rem] overflow-y-auto z-10">
                content
              </div>
            </details>
            <details className="relative">
              <summary className="px-5 py-4 border border-gray-400 text-base appearance-none">
                <div className="flex items-center gap-2">
                  <span>Ram</span>
                  <AiFillCaretDown />
                </div>
              </summary>
              <div className="bg-white absolute top-[100% + 5px] left-0 w-[35rem] max-h-[55rem] overflow-y-auto z-10">
                content
              </div>
            </details>
            <details className="relative">
              <summary className="px-5 py-4 border border-gray-400 text-base appearance-none">
                <div className="flex items-center gap-2">
                  <span>Iternal</span>
                  <AiFillCaretDown />
                </div>
              </summary>
              <div className="bg-white absolute top-[100% + 5px] left-0 w-[35rem] max-h-[55rem] overflow-y-auto z-10">
                content
              </div>
            </details>
          </div>
        </div>
        <div>
          {" "}
          <h2 className="text-base font-semibold text-third capitalize">sort by</h2>
        </div>
      </div>
      <div className="mt-5">
        <div className="grid-layout">
          <div className="row">
            {products.length > 0 &&
              products?.map((product) => {
                return (
                  <div className="col l-3 s-4 c-12 mb-5" key={product?._id}>
                    <ProductT1 isShowDesModal imgSmall uiGridLayout data={product} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Pagination
        pageSize={totalPage}
        current={page}
        onChange={handleToPage}
        onNextPage={() => handleNextPage()}
        onBackPage={() => handleBackPage()}
      />
    </div>
  );
};

Product.propTypes = {};

export default Product;
