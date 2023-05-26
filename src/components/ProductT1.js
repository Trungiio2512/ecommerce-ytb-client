import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductDetailContent from "./ProductDetailContent";
import { formatVND, getStars } from "../until/fn";
import icons from "../until/icon";
import newpng from "../assets/new.png";
import Button from "./Button";
import path from "../until/path";
import Modal from "./Modal";
import { getOne } from "../apis/product";
import * as apiUsers from "../apis/user";
import * as slicesUser from "../app/slices/user";
import Swal from "sweetalert2";
import { toastMsg } from "../until/toast";

const { BsStarHalf, BsStarFill, AiOutlineMenu, AiOutlineEye, AiOutlineHeart } = icons;
const ProductT1 = ({ data, isShowDesModal = false, imgSmall = false, uiGridLayout = false }) => {
  // const getStars = (rating) => {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, token } = useSelector((state) => state.user);
  const [isShowModal, setShowModal] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [productDetail, setProductDetail] = useState({});

  const handleToProductDetail = () => {
    navigate(`/${path.DETAIL_PRODUCT}/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`, {
      state: { categoty_id: data?.category?._id, brand_id: data?.brand?._id, id: data?._id },
    });
  };

  const getDetailProduct = async (id) => {
    setShowPortal(true);
    const rs = await getOne(id);
    if (rs?.sucess) {
      setProductDetail(rs?.data);
    }
  };

  const handleRemoveProductWishList = async (product) => {
    const rs = await apiUsers.wishlist(product?._id);
    if (rs?.sucess) {
      // toast()
      toastMsg(rs?.msg, "success");
      // Swal.fire("Done...!", rs?.msg, "success");
    } else {
      toastMsg(rs?.msg, "error");
      // Swal.fire("Opp...!", rs?.msg, "error");
    }
    dispatch(slicesUser.wishlist(product));
  };
  return (
    <div
      className={`border border-gray-300 rounded-sm py-4 px-2 relative h-full ${
        uiGridLayout ? " py-4 px-2 " : "p-4 mx-3"
      }`}
      onMouseOver={(e) => setShowModal(true)}
      onMouseLeave={(e) => setShowModal(false)}
    >
      {isShowDesModal && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white  z-[5]  p-4   ease-out transition-all duration-500 ${
            isShowModal ? "top-0 opacity-100 visible block" : "opacity-0 invisible hidden"
          } overflow-y-auto`}
        >
          <div className="flex items-center justify-between pb-4 border-b-1 border-gray-500">
            <h4 className={`${imgSmall ? "text-sm" : "text-lg"} text-third`}>{data?.title}</h4>
            <span className={`${imgSmall ? "text-sm" : "text-lg"}`}> {formatVND(data?.price)}</span>
          </div>
          {/* <p className="text-gray-800 py-4">{data?.description}</p> */}
          <ul className="list-none text-sm text-gray-500 space-y-2 mt-5 w-full h-full ">
            {data?.specifications?.map((ele, index) => {
              return (
                <li className="" key={index}>
                  {ele}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="relative">
        {data?.news && (
          <div className="absolute top-[-10px] right-[-20px] z-[1]">
            <figure className="w-[80px] h-[20px]">
              <img src={data?.news && newpng} alt={"news"} />
            </figure>
          </div>
        )}

        <div
          className={`absolute left-0 w-full flex justify-center gap-6 items-center transition-all duration-500 z-10 ${
            isShowModal
              ? "bottom-[-10px] visible opacity-[1]"
              : "bottom-[-40px] invisible opacity-0"
          }`}
        >
          <Button circle onHanldeClick={() => handleToProductDetail()}>
            {<AiOutlineMenu />}
          </Button>
          <Button circle onHanldeClick={() => getDetailProduct(data?._id)}>
            {<AiOutlineEye />}{" "}
          </Button>
          <Button
            circle
            className={`${
              token
                ? wishlist.some((pd) => pd?._id === data?._id)
                  ? "bg-pink-500 text-white"
                  : "bg-white text-third"
                : "bg-white text-third"
            }`}
            onHanldeClick={() => handleRemoveProductWishList(data)}
          >
            {<AiOutlineHeart />}
          </Button>
        </div>

        <Link
          to={`/${path.DETAIL_PRODUCT}/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}
          replace
          state={{
            categoty_id: data?.category?._id,
            brand_id: data?.brand?._id,
            id: data?._id,
          }}
        >
          <figure className={`${!imgSmall ? "h-[485px]" : "h-[248px]"} w-full`}>
            <img
              src={
                data?.thumb ||
                "https://www.tenforums.com/geek/gars/images/2/types/thumb_15995098370_amera_app.png"
              }
              alt={data?.title}
            />
          </figure>
        </Link>
      </div>
      <div className="mt-4">
        <Link
          to={`/${path.DETAIL_PRODUCT}/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}
          state={{
            categoty_id: data?.category?._id,
            brand_id: data?.brand?._id,
            id: data?._id,
          }}
          replace
        >
          <h3 className="text-[#2b3743] line-clamp-1 cursor-pointer hover:text-main">
            {data?.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-xs text-yellow-500 my-2">
          {getStars(data?.totalRatings)}
          {/* {data?.totalRatings} */}
        </div>
        <span className="text-gray-500 text-sm line-through mr-2">{formatVND(data?.price)}</span>
        <span className="text-black text-base">{formatVND(data?.priceSale)}</span>
      </div>
      {showPortal && (
        <Modal
          onRequestClose={() => setShowPortal(false)}
          isOpen={showPortal}
          shouldCloseOverlayClick
        >
          {Object.keys(productDetail).length > 0 && (
            <ProductDetailContent product={productDetail} />
          )}
        </Modal>
      )}
    </div>
  );
};

ProductT1.propTypes = {
  data: PropTypes.object.isRequired,
  isShowDesModal: PropTypes.bool,
};

export default ProductT1;
