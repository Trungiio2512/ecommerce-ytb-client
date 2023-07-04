import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { deleteCart, getCart, updateCart, logout } from "../../apis/user";
import { formatVND } from "../../until/fn";
import icons from "../../until/icon";
import path from "../../until/path";
import { Button } from "../../components";
const { AiOutlineClose, AiOutlineArrowRight } = icons;
const Cart = (props) => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [quantity, setQuantity] = useSt/ate({})
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await getCart();
      if (rs?.sucess) {
        setCarts(rs?.data?.list);
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  const handleDecrementQuantity = async (id) => {
    const index = carts.findIndex((item) => item?._id === id);
    if (index > -1) {
      let _carts = carts;
      if (_carts[index].quantity <= 0) return;
      _carts[index].quantity = +_carts[index].quantity - 1;
      setCarts([..._carts]);
      updateCart(id, { quantity: _carts[index].quantity }).then(() => {
        setCarts([..._carts]);
      });
    }
  };
  const handleChangeQuantity = (quantity, id) => {
    const index = carts.findIndex((item) => item?._id === id);
    if (index > -1) {
      let _carts = carts;
      _carts[index].quantity = +quantity;
      setCarts([..._carts]);
    }
  };
  const handleIncrementQuantity = (id) => {
    const index = carts.findIndex((item) => item?._id === id);
    let _carts = carts;
    if (_carts[index].quantity <= 0) return;
    _carts[index].quantity = +_carts[index].quantity + 1;
    updateCart(id, { quantity: _carts[index].quantity }).then(() => {
      setCarts([..._carts]);
    });
  };
  const handleRemoveCartItem = async (id) => {
    if (carts?.some((item) => item?._id === id)) {
      const rs = await deleteCart(id);
      if (rs?.sucess) {
        Swal.fire("Done", rs?.msg, "success").then(() => {
          // const trItem = document.querySelector(`.product-${id}`);

          // trItem.classList.add("animate-slide-bck-left");

          const trItems = document.querySelectorAll(`.product-${id}`);
          for (let i of trItems) {
            i.classList.add("animate-slide-bck-left");
            i.addEventListener(
              "animationend",
              async () => {
                setCarts((carts) => {
                  return carts.filter((item) => item?._id !== id);
                });
              },
              { once: true },
            );
          }
          // trItem.addEventListener(
          //   "animationend",
          //   async () => {
          //     setCarts((carts) => {
          //       return carts.filter((item) => item?._id !== id);
          //     });
          //   },
          //   { once: true },
          // );
        });
      } else {
        Swal.fire("Op....!", rs?.msg, "error");
      }
    }
  };
  return (
    <div className="w-full ">
      <h2 className="text-2xl text-third font-medium pb-4">Your Cart</h2>
      {carts.length > 0 ? (
        <>
          <table className="hidden md:block overflow-x-auto">
            <thead className="mb-2 border-b-1 w-full border-gray-300 py-2">
              <tr className="text-base text-gray-400 capitalize ">
                <th scope="col">image</th>
                {/* <th scope="col">name</th> */}
                <th scope="col" className="px-6 py-4">
                  information
                </th>
                <th scope="col" className="px-6 py-4">
                  price
                </th>
                <th scope="col" className="px-6 py-4">
                  quantity
                </th>
                <th scope="col" className="px-6 py-4">
                  total
                </th>
                <th scope="col" className="px-6 py-4">
                  remove
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {carts.map((item) => {
                return (
                  <tr
                    className={`product-${item?._id} border-b-1 border-gray-300 `}
                    key={item?._id}
                  >
                    <td className="px-6 py-4">
                      {" "}
                      <figure className="w-[150px] h-[150px]">
                        <img src={item?.product?.thumb?.url} alt={item?.product?.title} />
                      </figure>{" "}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start">
                        <Link
                          to={`/${path.DETAIL_PRODUCT}/${item?.product?.category?.slug}/${item?.product?.brand?.slug}/${item?.product?.slug}`}
                          state={{ id: item?.product?._id }}
                          replace
                        >
                          {" "}
                          <span className="text-lg text-third line-clamp-2">
                            {item?.product?.title}
                          </span>
                        </Link>
                        <strong className="text-sm text-gray-700">{`Ram: ${item?.ram?.name}`}</strong>
                        <strong className="text-sm text-gray-700">{`Intenal: ${item?.internal?.name}`}</strong>
                        <strong className="text-sm text-gray-700">{`Color: ${item?.color?.name}`}</strong>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      <div className="flex flex-col line-clamp-1 gap-2 ">
                        <span
                          className={` ${
                            item?.product?.priceSale
                              ? "text-sm line-through text-gray-500"
                              : "text-lg font-normal text-third font-meidum"
                          }`}
                        >
                          {formatVND(item?.product?.price)}
                        </span>
                        {item?.product?.priceSale && (
                          <span className="text-third text-lg font-medium">
                            {formatVND(item?.product?.priceSale)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-block">
                        <button
                          className={
                            "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 left-0 h-full px-2 border border-gray-400 rounded-l-md "
                          }
                          onClick={(e) => handleDecrementQuantity(item?._id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="outline-none text-center border border-gray-400  focus:bg-red-200 focus:text-third transition-all duration-300 text-lg pl-[0.75] pr-1 py-2 rounded-lg w-full md:max-w-[120px]"
                          value={item?.quantity}
                          onChange={(e) => handleChangeQuantity(e.target.value, item?._id)}
                        />
                        <button
                          className={
                            "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 right-0 h-full px-2 border border-gray-400 rounded-r-md"
                          }
                          onClick={() => handleIncrementQuantity(item?._id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span>
                        {item?.product?.priceSale
                          ? formatVND(+item?.product?.priceSale * +item?.quantity)
                          : formatVND(+item?.product?.price * +item?.quantity)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="px-5 py-2 border border-gray-300 active:border-red-300 rounded-sm"
                        onClick={() => handleRemoveCartItem(item?._id)}
                      >
                        <AiOutlineClose />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="grid grid-cols-1 gap-5 md:hidden ">
            {carts.map((item) => {
              return (
                <div
                  className={`flex flex-col items-center sm:flex-row sm:items-start gap-2 py-4 border-b-1 border-gray-400 product-${item?._id}`}
                  key={item?.product?._id}
                >
                  <Link
                    className="w-[180px]"
                    to={`/${path.DETAIL_PRODUCT}/${item?.product?.category?.slug}/${item?.product?.brand?.slug}/${item?.product?.slug}`}
                    state={{ id: item?.product?._id }}
                    replace
                  >
                    <figure className="w-full h-full">
                      <img src={item?.product?.thumb?.url} alt={item?.product?.title} />
                    </figure>
                  </Link>
                  <div className="flex flex-col gap-2 flex-1">
                    <Link
                      to={`/${path.DETAIL_PRODUCT}/${item?.product?.category?.slug}/${item?.product?.brand?.slug}/${item?.product?.slug}`}
                      state={{ id: item?.product?._id }}
                      replace
                    >
                      {" "}
                      <h2 className="text-third text-xl font-semibold">{item?.product?.title}</h2>
                    </Link>
                    <div className="flex gap-2 items-start text-base text-gray-700 max-xs:text-sm">
                      <span>{`Ram: ${item?.ram?.name}`}</span>
                      <span>{`Intenal: ${item?.internal?.name}`}</span>
                      <span>{`Color: ${item?.color?.name}`}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span
                        className={` ${
                          item?.product?.priceSale
                            ? "text-sm line-through text-gray-500"
                            : "text-lg font-normal text-third font-meidum"
                        }`}
                      >
                        {formatVND(item?.product?.price)}
                      </span>
                      {item?.product?.priceSale && (
                        <span className="text-third text-lg font-medium">
                          {formatVND(item?.product?.priceSale)}
                        </span>
                      )}
                    </div>
                    <div className="relative w-full">
                      <Button
                        className={
                          "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 left-0 h-full px-2 border border-gray-400 rounded-l-md "
                        }
                        onHanldeClick={(e) => handleDecrementQuantity(item?._id)}
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        className="outline-none text-center border border-gray-400  focus:bg-red-200 focus:text-third transition-all duration-300 text-lg pl-[0.75] pr-1 py-2 rounded-lg w-full lg:max-w-[120px]  max-xs:text-sm base-xs:py-1"
                        value={item?.quantity}
                        readOnly
                        // onChange={(e) => handleChangeQuantity(e.target.value, item?._id)}
                      />
                      <Button
                        className={
                          "text-lg bg-white hover:bg-gray-800 hover:text-white transition-all duration-300 absolute top-0 right-0 h-full px-2 border border-gray-400 rounded-r-md"
                        }
                        onHanldeClick={() => handleIncrementQuantity(item?._id)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      className={
                        "px-5 py-2 border border-gray-300 rounded-lg hover:border-blue-300 active:border-red-400 active:bg-red-200 transition-colors text-lg flex items-center justify-center max-xs:text-base max-xs:py-1"
                      }
                      onHanldeClick={() => handleRemoveCartItem(item?._id)}
                    >
                      Deleted
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-end gap-3 p-5 fixed sm:relative left-0 right-0 bottom-0 bg-white z-10 border-t-1 border-gray-800 shadow-inner max-xs:py-2">
            <div className="flex items-center max-xs:justify-between w-full justify-end gap-5">
              <span className="text-base text-gray-600 max-xs:text-sm">Total payment:</span>
              <strong className="text-lg">
                {formatVND(
                  carts.reduce((acc, cur) => {
                    return acc + (cur?.product?.priceSale || cur?.product?.price) * cur?.quantity;
                  }, 0),
                )}
              </strong>
            </div>
            <span className="text-sm text-gray-500 italic hidden md:block">
              Shipping, taxes, and discounts calculated at checkout
            </span>
            <Button
              className={
                "text-white flex items-center justify-start pl-4 gap-2 pr-5 py-3 text-lg uppercase bg-red-500 max-xs:text-xs"
              }
            >
              Check out <AiOutlineArrowRight />
            </Button>
          </div>
        </>
      ) : (
        <p>Your cart has not product</p>
      )}
    </div>
  );
};

Cart.propTypes = {};

export default memo(Cart);
