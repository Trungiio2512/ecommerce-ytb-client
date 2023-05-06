import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { formatVND, getStars } from "../until/fn";
import icons from "../until/icon";
import newpng from "../assets/new.png";
import Button from "./Button";
import path from "../until/path";

const { BsStarHalf, BsStarFill, AiOutlineMenu, AiOutlineEye, AiOutlineHeart } = icons;
const ProductT1 = ({ data, isShowDesModal = false, imgSmall = false }) => {
  // const getStars = (rating) => {};
  const navigate = useNavigate();
  const [isShowModal, setShowModal] = useState(false);

  const handleToProductDetail = () => {
    //  to={`/${path.DETAIL_PRODUCT}/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}
    //       state={{
    //         categoty_id: data?.category?._id,
    //         brand_id: data?.brand?._id,
    //         id: data?._id,
    //       }}
    navigate(`/${path.DETAIL_PRODUCT}/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`, {
      state: { categoty_id: data?.category?._id, brand_id: data?.brand?._id, id: data?._id },
    });
  };

  return (
    <div
      className="border border-gray-300 rounded-sm mx-[10px] p-4 relative h-auto"
      onMouseOver={(e) => setShowModal(true)}
      onMouseLeave={(e) => setShowModal(false)}
    >
      {isShowDesModal && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white  z-[5]  p-4   ease-out transition-all duration-500 ${
            isShowModal ? "top-0 opacity-100 visible block" : "opacity-0 invisible hidden"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b-1 border-gray-500">
            <h4 className="text-lg text-third">{data?.title}</h4>
            <span> {formatVND(data?.price)}</span>
          </div>
          {/* <p className="text-gray-800 py-4">{data?.description}</p> */}
          <ul className="list-none text-sm text-gray-500 space-y-2 mt-5">
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
          <Button circle>{<AiOutlineEye />}</Button>
          <Button circle>{<AiOutlineHeart />}</Button>
        </div>

        <Link
          to={`/${path.DETAIL_PRODUCT}/${data?.category?.slug}/${data?.brand?.slug}/${data?.slug}`}
          state={{
            categoty_id: data?.category?._id,
            brand_id: data?.brand?._id,
            id: data?._id,
          }}
        >
          <figure className={`${!imgSmall ? "h-[485px]" : "h-[243px]"} w-full`}>
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
    </div>
  );
};

ProductT1.propTypes = {
  data: PropTypes.object.isRequired,
  isShowDesModal: PropTypes.bool,
};

export default ProductT1;
