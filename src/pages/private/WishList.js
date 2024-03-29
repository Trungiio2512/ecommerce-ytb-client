import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import * as apiUser from "../../apis/user";
import { formatVND } from "../../until/fn";
import { Button } from "../../components";
import icons from "../../until/icon";
import path from "../../until/path";
import { toastMsg } from "../../until/toast";
import * as sliceUser from "../../app/slices/user";

const { AiOutlineClose } = icons;

const WishList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, wishlist } = useSelector((state) => state.user);
  const handleToDetailProduct = (product) => {
    navigate(`/${path.DETAIL_PRODUCT}/${product?.category?.slug}/${product?.brand?.slug}/${product?.slug}`, {
      state: { id: product?._id },
      replace: true,
    });
  };
  const handleRemove = async (pd) => {
    if (wishlist?.some((product) => product?._id === pd?._id)) {
      const trProduct = document.querySelector(`.product-${pd?._id}`);
      trProduct.classList.add("animate-slide-bck-left");

      const rs = await apiUser.wishlist(pd?._id);
      if (rs?.sucess) {
        trProduct.addEventListener(
          "animationend",
          async () => {
            // console.log(1);
            toastMsg(rs.msg, "success");
            // trProduct.remove();
            dispatch(sliceUser.updatewishlist(pd));
            // console.log(rs);
          },
          { once: true }
        );
      } else {
        toastMsg(rs.msg, "error");
      }
    }
  };
  return (
    <div className="w-full">
      <h2 className="text-2xl text-third font-medium mb-5 ">Sản phẩm yêu thích của bạn</h2>
      {!loading && wishlist.length > 0 ? (
        <>
          <table className="hidden md:block overflow-x-auto">
            <thead className="mb-2 border-b-1 border-gray-300 py-2">
              <tr className="text-base text-gray-400 capitalize ">
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
                      <figure className="w-[160px] h-[160px] shrink-0">
                        <img src={product?.thumb?.url} alt={product?.title} />
                      </figure>{" "}
                    </td>
                    <td className="px-2 py-5">
                      <h3 className="px-2 text-base font-normal text-third font-meidum">{product?.title}</h3>
                    </td>
                    <td className="px-2 py-5">
                      <div className="flex flex-col items-start line-clamp-1 gap-2 px-2">
                        <span
                          className={` ${
                            product?.priceSale
                              ? "text-sm line-through text-gray-500"
                              : "text-base font-normal text-third font-meidum"
                          }`}>
                          {formatVND(product?.price)}
                        </span>
                        {product?.priceSale && (
                          <span className="text-third text-base font-medium">{formatVND(product?.priceSale)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-5">
                      <Button
                        className={
                          "px-5 py-1 border border-gray-300 rounded-lg hover:border-blue-300 active:border-red-400 active:bg-red-200  active:text-white transition-colors text-sm "
                        }
                        onHanldeClick={() => handleRemove(product)}>
                        <AiOutlineClose />
                      </Button>
                    </td>
                    <td className="px-2 py-5">
                      <Button
                        className={
                          "px-5 py-1 border border-gray-300 rounded-lg hover:border-blue-300 hover:text-blue-300 capitalize text-sm transition-colors "
                        }
                        onHanldeClick={() => handleToDetailProduct(product)}>
                        View detail
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="grid grid-cols-1 gap-5 md:hidden ">
            {wishlist.map((product) => {
              return (
                <div
                  className={`flex flex-col sm:flex-row items-center  gap-2 border border-gray-300 rounded-md p-5 product-${product?._id}`}
                  key={product?._id}>
                  <div className="max-w-[228px] max-h-[228px] w-full shrink-0 ">
                    <figure className="w-full h-full">
                      <img src={product?.thumb?.url} alt={product?.title} />
                    </figure>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-full flex-1">
                    <h2 className="text-third text-xl font-semibold max-xs:text-base">{product?.title}</h2>
                    <div className="flex items-baseline justify-center gap-2 max-xs:flex-col line-clamp-1 px-2">
                      <span
                        className={` ${
                          product?.priceSale
                            ? "text-sm max-xs:text-xs line-through text-gray-500"
                            : "text-lg max-xs:text-sm font-normal text-third font-meidum"
                        }`}>
                        {formatVND(product?.price)}
                      </span>
                      {product?.priceSale && (
                        <span className="text-third text-lg max-xs:text-sm font-medium ">
                          {formatVND(product?.priceSale)}
                        </span>
                      )}
                    </div>
                    <Button
                      className={
                        "px-5 py-2 border border-gray-400 rounded-lg hover:border-blue-300 active:border-red-400 active:bg-red-200 transition-colors text-lg flex items-center justify-center w-full max-md:text-sm"
                      }>
                      Deleted
                    </Button>
                    <Button
                      className={
                        "px-5 py-2 border border-gray-400 rounded-lg hover:border-blue-300 hover:text-blue-300 capitalize text-lg max-md:text-sm transition-colors w-full"
                      }
                      onHanldeClick={() => handleToDetailProduct(product)}>
                      View detail
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h5 className="text-xl text-gray-500">Bạn chưa có sản phẩm nào</h5>
      )}
    </div>
  );
};

WishList.propTypes = {};

export default WishList;
