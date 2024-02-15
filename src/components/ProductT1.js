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
const ProductT1 = ({ data, isShowDesModal = false, imgSmall = false, uiGridLayout = false, loading = false }) => {
  // const getStars = (rating) => {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, isLoggedIn } = useSelector((state) => state.user);
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
    if (isLoggedIn) {
      const rs = await apiUsers.wishlist(product?._id);

      if (rs?.sucess) {
        // toast()
        toastMsg(rs?.msg, "success");
        // Swal.fire("Done...!", rs?.msg, "success");
      } else {
        toastMsg(rs?.msg, "error");
        // Swal.fire("Opp...!", rs?.msg, "error");
      }
      dispatch(slicesUser.updatewishlist(product));
    } else {
      toastMsg("You must has login to update");
    }
  };
  return (
    <div
      className={`border border-gray-300 rounded-sm py-4 px-2 relative h-full ${
        uiGridLayout ? " py-4 px-2 " : "p-4 mx-3"
      }`}
      onMouseOver={(e) => setShowModal(true)}
      onMouseLeave={(e) => setShowModal(false)}>
      <div className="relative">
        {loading && (
          <div className="mt-4 animate-pulse flex flex-col  gap-2">
            <div className="flex items-center justify-center w-[188px] h-[188px]">
              <svg
                className="w-10 h-10 text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="h-4 bg-gray-300 "></div>
            <div className="h-4 bg-gray-300 "></div>
            <div className="h-4 bg-gray-300 "></div>
            <div className="h-4 bg-gray-300 "></div>
          </div>
        )}
        {!loading && data?.news && (
          <div className="absolute top-[-10px] right-[-20px] z-[1]">
            <figure className="w-[80px] h-[20px]">
              <img src={data?.news && newpng} alt={"news"} />
            </figure>
          </div>
        )}

        {!loading && (
          <div
            className={`absolute left-0 w-full flex justify-center gap-6 items-center transition-all duration-500 z-10 ${
              isShowModal ? "bottom-[-10px] visible opacity-[1]" : "bottom-[-40px] invisible opacity-0"
            }`}>
            <Button className={`bg-white text-third`} circle onHanldeClick={() => handleToProductDetail()}>
              {<AiOutlineMenu />}
            </Button>
            <Button className={`bg-white text-third`} circle onHanldeClick={() => getDetailProduct(data?._id)}>
              {<AiOutlineEye />}
            </Button>
            <Button
              circle
              className={`${
                isLoggedIn && wishlist.length > 0
                  ? wishlist.some((pd) => pd?._id === data?._id)
                    ? "bg-pink-500 text-white"
                    : "bg-white text-third"
                  : "bg-white text-third"
              }`}
              onHanldeClick={() => handleRemoveProductWishList(data)}>
              {<AiOutlineHeart />}
            </Button>
          </div>
        )}

        {!loading && (
          <Link
            to={`/${path.DETAIL_PRODUCT}/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}
            replace
            state={{
              categoty_id: data?.category?._id,
              brand_id: data?.brand?._id,
              id: data?._id,
            }}>
            <figure className={`w-full h-full`}>
              <img
                src={
                  data?.thumb?.url ||
                  "https://www.tenforums.com/geek/gars/images/2/types/thumb_15995098370_amera_app.png"
                }
                alt={data?.title}
              />
            </figure>
          </Link>
        )}
      </div>
      {!loading && (
        <div className="mt-4">
          <Link
            to={`/${path.DETAIL_PRODUCT}/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}
            state={{
              categoty_id: data?.category?._id,
              brand_id: data?.brand?._id,
              id: data?._id,
            }}
            replace>
            <h3 className="text-[#2b3743] line-clamp-1 cursor-pointer hover:text-main">{data?.title}</h3>
          </Link>
          <div className="flex items-center gap-1 text-xs text-yellow-500 my-2">
            {getStars(data?.totalRatings)}
            {/* {data?.totalRatings} */}
          </div>
          <span className="text-gray-500 text-sm line-through mr-2 inline-block">{formatVND(data?.price)}</span>
          <span className="text-black text-base inline-block">{formatVND(data?.priceSale)}</span>
        </div>
      )}
      {!loading && showPortal && (
        <Modal onRequestClose={() => setShowPortal(false)} isOpen={showPortal} shouldCloseOverlayClick id={"modal"}>
          {Object.keys(productDetail).length > 0 && <ProductDetailContent modal product={productDetail} />}
        </Modal>
      )}
    </div>
  );
};

ProductT1.propTypes = {
  data: PropTypes.object,
  isShowDesModal: PropTypes.bool,
};

export default ProductT1;
