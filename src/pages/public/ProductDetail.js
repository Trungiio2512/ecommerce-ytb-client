import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";
import { useSelector } from "react-redux";

import path from "../../until/path";
import * as apiProduct from "../../apis/product";
import { formatVND, getStars } from "../../until/fn";
import ProductT1 from "../../components/ProductT1";
import ProductDetailContent from "../../components/ProductDetailContent";
import { FormInput, Modal, TabActive, Votebar } from "../../components";
import icons from "../../until/icon";
import { toastMsg } from "../../until/toast";
const { BsStarFill } = icons;
const tabTitles = [
  { id: 0, title: "Mô tả" },
  { id: 1, title: "Sự bảo đảm" },
  { id: 2, title: "Vận chuyển" },
  { id: 3, title: "Thanh toán" },
  { id: 4, title: "Nhận xét" },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
const ProductDetail = (props) => {
  const location = useLocation();
  const { brand, category, title } = useParams();
  const id = location.state?.id;

  const { isLoggedIn, userInfo } = useSelector((state) => state.user);
  const [ortherProducts, setOrtherProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [tabActive, setTabActive] = useState(tabTitles[0].id);
  const [ratings, setRatings] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [text, setText] = useState("");
  const [star, setstar] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [reload, setReload] = useState(false);
  // console.log(userInfo);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiProduct.getOne(id);
      if (rs?.sucess) {
        setProduct(rs?.data);
      }
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const fetchOrtherProduct = async () => {
      const rs = await apiProduct.getAll({ category: product?.category, limit: 10 });
      // console.log(rs);
      if (rs?.sucess) {
        setOrtherProducts(rs?.data);
      }
    };
    fetchOrtherProduct();
  }, [product]);

  useEffect(() => {
    if (tabActive === 4) {
      const fetchRatings = async () => {
        const rs = await apiProduct.ratings(id);
        if (rs.sucess) {
          setRatings(rs.data?.ratings);
          console.log(rs.data);
        }
      };
      fetchRatings();
    }
  }, [id, tabActive, reload]);

  const handleRatings = async () => {
    const rs = await apiProduct.comment(id, { star, comment: text });
    if (rs.sucess) {
      toastMsg(rs.msg, "success");
      setText("");
      setstar(1);
      setIsShowModal(false);
      setReload(!reload);
    } else {
      toastMsg(rs.msg, "error");
    }
  };

  return (
    <div className="">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-black uppercase mb-2">{brand}</h3>
        <div className="flex divide-x-2 divide-gray-500">
          <Link
            to={`/${path.HOME}`}
            className="text-sm text-gray-500 
          hover:text-main capitalize pr-2"
          >
            Home
          </Link>
          <Link
            to={`/`}
            className="text-sm text-gray-500 
          hover:text-main px-2 "
          >
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </Link>
          <Link
            to={`/`}
            className="text-sm text-gray-500 
          hover:text-main px-2"
          >
            {brand}
          </Link>
          <span className="text-sm text-gray-500 px-2">{title}</span>
        </div>
      </div>
      {Object.keys(product).length > 0 && (
        <div className="space-y-5">
          <ProductDetailContent product={product} />
          <div>
            <TabActive data={tabTitles} value={tabActive} setValue={setTabActive} />
            <div
              className={`${
                tabActive === 0 ? "block" : "hidden"
              } active p-5 text-sm border border-gray-300 text-gray-600 line-clamp-3`}
            >
              {product?.description}
            </div>{" "}
            <div
              className={`${tabActive === 1 ? "block" : "hidden"} p-5 text-sm border border-gray-300 text-gray-600 `}
            >
              {product?.warranty}
            </div>
            <div
              className={`${tabActive === 2 ? "block" : "hidden"} p-5 text-sm border border-gray-300 text-gray-600 `}
            >
              {product?.delivery}
            </div>
            <div
              className={`${tabActive === 3 ? "block" : "hidden"} p-5 text-sm border border-gray-300 text-gray-600 `}
            >
              {product?.payment}
            </div>
            <div
              className={`${tabActive === 4 ? "block" : "hidden"} p-5 text-sm border border-gray-300 text-gray-600 `}
            >
              <div className="flex max-sm:flex-col sm:flex-row  sm:items-baseline">
                <div className="flex-1 flex flex-col gap-2 items-center">
                  <span className="text-lg max-xs:text-base text-third font-medium">{`${product?.totalRatings}/5`}</span>
                  <div className="flex items-center gap-2">{getStars(product?.totalRatings)}</div>
                  <span className="text-sm">{`${ratings.length} đánh giá và nhận xét`}</span>
                </div>
                <div className="flex-1 flex flex-col-reverse items-start gap-2 p-2 ">
                  {" "}
                  {Array.from(Array(5).keys()).map((el) => {
                    return <Votebar key={el} number={el + 1} />;
                  })}
                </div>
              </div>
              {isLoggedIn && (
                <div className="w-full flex flex-col items-center gap-2">
                  {!ratings.some((rs) => rs?.postedBy?._id === userInfo?._id) && (
                    <>
                      <span className="text-base">Bạn đánh giá sao sản phẩm này</span>
                      <button
                        className="rounded-lg bg-main text-white text-sm w-full max-w-[300px] px-5 py-2"
                        onClick={() => setIsShowModal(true)}
                      >
                        Đánh giá ngay
                      </button>
                    </>
                  )}
                  {ratings.length <= 0 && (
                    <span className="text-base font-medium text-third">
                      Hiện chưa có nhận xét nào. Hãy là người nhận xét đầu tiên
                    </span>
                  )}
                </div>
              )}
              {ratings.length > 0 && (
                <div className="w-full mt-5">
                  {ratings.map((rating) => {
                    return (
                      <div className="p-2 border border-gray-300 rounded shadow-xl" key={rating?.postedBy?._id}>
                        <div className="flex items-center gap-2">
                          <figure className="w-8 h-8 border border-gray-300 rounded-full">
                            <img
                              src={
                                rating?.postedBy?.avatar ||
                                "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
                              }
                              alt=""
                            />
                          </figure>
                          <span className="text-sm text-blue-500">
                            {rating?.postedBy.firstName + rating?.postedBy.lastName}
                          </span>
                          <div className="flex text-xs">{getStars(rating?.star)}</div>
                        </div>
                        <div className="p-2">
                          <p className="text-sm text-third">{rating?.comment}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isShowModal && (
        <Modal isOpen={isShowModal} onRequestClose={() => setIsShowModal(false)}>
          <div className="space-y-4">
            <h3 className="text-base">Nhận xét</h3>
            <FormInput
              errorMessage={errorMsg}
              className="w-full text-sm text-third outline-none border border-gray-300 focus:border-blue-300 px-4 py-2 rounded-md"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex w-full justify-between">
              {Array.from(Array(5).keys()).map((el) => {
                return (
                  <div className={`p-3 border border-gray-300`} key={el} onClick={() => setstar(el + 1)}>
                    <BsStarFill size={20} className={`${el + 1 <= star ? "text-yellow-400" : "text-gray-300"} `} />
                  </div>
                );
              })}
            </div>
            <button
              className="max-w-[100px] w-full bg-main rounded-lg px-5 py-1 text-sm float-right text-white"
              onClick={() => handleRatings()}
            >
              Gửi
            </button>
          </div>
        </Modal>
      )}
      {ortherProducts.length > 0 && (
        <div className="mt-[30px]">
          <h3 className="font-medium text-xl text-third uppercase py-1 border-b-1 border-red-400 mb-[50px] max-md:text-lg">
            Các sản phẩm tương tự:
          </h3>
          <Slider {...settings}>
            {ortherProducts.map((el) => {
              return <ProductT1 imgSmall isShowDesModal key={el?._id} data={el} />;
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

ProductDetail.propTypes = {};

export default ProductDetail;
