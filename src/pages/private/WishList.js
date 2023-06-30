import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import * as apiUser from "../../apis/user";
import { formatVND } from "../../until/fn";
import { Button } from "../../components";
import icons from "../../until/icon";
import path from "../../until/path";
import { useSelector } from "react-redux";
const { AiOutlineClose } = icons;
const WishList = (props) => {
  const navigate = useNavigate();
  // const [wishlist, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [refresh, setRefresh] = useState(false);
  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const rs = await apiUser.getWishList();

  //     if (rs?.sucess) {
  //       setProducts(rs?.data?.list);
  //       setLoading(false);
  //     }
  //   };
  //   fetchApi();
  // }, []);
  const { loading, wishlist } = useSelector((state) => state.user);
  console.log(wishlist);
  const handleToDetailProduct = (product) => {
    navigate(
      `/${path.DETAIL_PRODUCT}/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`,
      { state: { id: product?._id }, replace: true },
    );
  };

  const handleRemove = async (id) => {
    if (wishlist?.some((product) => product?._id === id)) {
      const trProducts = document.querySelectorAll(`.product-${id}`);
      for (let i of trProducts) {
        i.classList.add("animate-slide-bck-left");

        const rs = await apiUser.wishlist(id);
        if (rs?.sucess) {
          Swal.fire("OK", rs?.msg, "success").then(() => {
            i.addEventListener(
              "animationend",
              async () => {
                // console.log(1);
                i.remove();
                // console.log(rs);
              },
              { once: true },
            );
          });
        } else {
          Swal.fire("Opp...!", rs?.msg, "error");
        }
      }
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-2xl text-third font-medium mb-5">Your Wish List</h2>
      {!loading && wishlist.length > 0 ? (
        <>
          <table className="hidden md:block overflow-x-auto">
            <thead className="mb-2 border-b-1 border-gray-300 py-2">
              <tr className="text-lg text-gray-400 capitalize ">
                <th scope="col">image</th>
                <th scope="col">name</th>
                <th scope="col">price</th>
                <th scope="col">remove</th>
                <th scope="col">detail</th>
              </tr>
            </thead>
            <tbody className="space-y-5">
              {wishlist.map((product) => {
                return (
                  <tr className={`product-${product?._id} `} key={product?._id}>
                    <td className="px-2 py-5">
                      {" "}
                      <figure className="w-[228px] h-[228px] shrink-0">
                        <img src={product?.thumb} alt={product?.title} />
                      </figure>{" "}
                    </td>
                    <td className="px-2 py-5">
                      <h3 className="px-2 text-lg font-normal text-third font-meidum">
                        {product?.title}
                      </h3>
                    </td>
                    <td className="px-2 py-5">
                      <div className="flex flex-col items-start line-clamp-1 gap-2 px-2">
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
                    <td className="px-2 py-5">
                      <Button
                        className={
                          "px-5 py-1 border border-gray-300 rounded-lg hover:border-blue-300 active:border-red-400 active:bg-red-200  active:text-white transition-colors text-sm "
                        }
                        onHanldeClick={() => handleRemove(product?._id)}
                      >
                        <AiOutlineClose />
                      </Button>
                    </td>
                    <td className="px-2 py-5">
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
          <div className="grid grid-cols-1 md:hidden ">
            {wishlist.map((product) => {
              return (
                <div className="flex flex-col sm:flex-row items-center  gap-2 " key={product?._id}>
                  <div className="w-[228px] h-[228px] shrink-0 ">
                    <figure className="w-full h-full">
                      <img src={product?.thumb} alt={product?.title} />
                    </figure>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-full flex-1">
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
                        "px-5 py-2 border border-gray-400 rounded-lg hover:border-blue-300 active:border-red-400 active:bg-red-200 transition-colors text-lg flex items-center justify-center w-full"
                      }
                    >
                      Deleted
                    </Button>
                    <Button
                      className={
                        "px-5 py-2 border border-gray-400 rounded-lg hover:border-blue-300 hover:text-blue-300 capitalize text-lg transition-colors w-full"
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
        </>
      ) : (
        <h5 className="text-xl text-gray-500">You have not</h5>
      )}
    </div>
  );
};

WishList.propTypes = {};

export default WishList;
