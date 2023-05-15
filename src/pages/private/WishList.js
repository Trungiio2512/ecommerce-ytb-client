import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as apiUser from "../../apis/user";
import { formatVND } from "../../until/fn";
import { Button } from "../../components";
import icons from "../../until/icon";
import { useNavigate } from "react-router-dom";
import path from "../../until/path";
const { AiOutlineClose } = icons;
const WishList = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiUser.getWishList();

      if (rs?.sucess) {
        setProducts(rs?.data?.list);
        setLoading(false);
      }
      console.log(rs);
    };
    fetchApi();
  }, []);

  const handleToDetailProduct = (product) => {
    navigate(
      `/${path.DETAIL_PRODUCT}/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`,
      { state: { id: product?._id }, replace: true },
    );
  };
  return (
    !loading &&
    products.length > 0 && (
      <div className="w-full">
        <h2 className="text-2xl text-third font-medium mb-5">Your Wish List</h2>
        <table className="hidden lg:block">
          <thead>
            <tr className="text-lg text-gray-400 capitalize">
              <th scope="col">image</th>
              <th scope="col">name</th>
              <th scope="col">price</th>
              <th scope="col">remove</th>
              <th scope="col">detail</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr>
                  {" "}
                  <td>
                    {" "}
                    <figure className="w-[228px] h-[228px]">
                      <img src={product?.thumb} alt={product?.title} />
                    </figure>{" "}
                  </td>
                  <td>
                    <h3 className="px-2 text-lg font-normal text-third font-meidum">
                      {product?.title}
                    </h3>
                  </td>
                  <td>
                    <div className="flex items-baseline line-clamp-1 gap-2 px-2">
                      <span
                        className={` ${
                          product?.priceSale
                            ? "text-sm line-through text-gray-500"
                            : "text-lg font-normal text-third font-meidum"
                        }`}
                      >
                        {formatVND(product?.price)}
                      </span>
                      {product?.priceSale && (
                        <span className="text-third text-lg font-medium">
                          {formatVND(product?.priceSale)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="">
                    <Button
                      className={
                        "px-5 py-1 border border-gray-300 rounded-lg hover:border-blue-300 active:border-red-400 active:bg-red-200  active:text-white transition-colors text-sm "
                      }
                    >
                      <AiOutlineClose />
                    </Button>
                  </td>
                  <td>
                    <Button
                      className={
                        "px-5 py-1 border border-gray-300 rounded-lg hover:border-blue-300 hover:text-blue-300 capitalize text-sm transition-colors "
                      }
                      onHanldeClick={() => handleToDetailProduct(product)}
                    >
                      View detail
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="grid grid-cols-1 lg:hidden ">
          {products.map((product) => {
            return (
              <div className="flex items-center gap-2 ">
                <div className="w-[228px] h-[228px] ">
                  <figure className="w-full h-full">
                    <img src={product?.thumb} alt={product?.title} />
                  </figure>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <h2 className="text-third text-xl font-semibold">{product?.title}</h2>
                  <div className="flex items-baseline line-clamp-1 gap-2 px-2">
                    <span
                      className={` ${
                        product?.priceSale
                          ? "text-sm line-through text-gray-500"
                          : "text-lg font-normal text-third font-meidum"
                      }`}
                    >
                      {formatVND(product?.price)}
                    </span>
                    {product?.priceSale && (
                      <span className="text-third text-lg font-medium">
                        {formatVND(product?.priceSale)}
                      </span>
                    )}
                  </div>
                  <Button
                    className={
                      "px-5 py-2 border border-gray-300 rounded-lg hover:border-blue-300 active:border-red-400 active:bg-red-200 transition-colors text-lg flex items-center justify-center "
                    }
                  >
                    <AiOutlineClose />
                  </Button>
                  <Button
                    className={
                      "px-5 py-1 border border-gray-300 rounded-lg hover:border-blue-300 hover:text-blue-300 capitalize text-lg transition-colors "
                    }
                    onHanldeClick={() => handleToDetailProduct(product)}
                  >
                    View detail
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

WishList.propTypes = {};

export default WishList;
