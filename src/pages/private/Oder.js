import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormInput, Modal } from "../../components";
import { useSelector } from "react-redux";
import * as apiUser from "../../apis/user";
import * as apiCoupon from "../../apis/coupon";
import { toastMsg } from "../../until/toast";
import { formatDate, formatVND } from "../../until/fn";
import icons from "../../until/icon";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import path from "../../until/path";

const { HiShoppingCart } = icons;
const defaultShip = 40000;
const Oder = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.state?.active;
  const { userInfo } = useSelector((state) => state.user);
  const [address, setAddress] = useState(userInfo?.address ? userInfo.address : "");
  const [coupon, setCoupon] = useState(null);
  const [totalPrice, settotalPrice] = useState("");
  const [cid, setcid] = useState("");

  const [coupons, setCoupons] = useState([]);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shipping, setSetshipping] = useState(defaultShip || 40000);
  const [discount, setDiscount] = useState(0);
  const [openCoupon, setOpenCoupon] = useState(false);
  const [openListPD, setOpenListPD] = useState(false);
  //handle logic for shipping discount
  useEffect(() => {
    const discountCheck = (dis, maxprice = 0, price) => {
      let result;
      if (dis <= 100) {
        result = (dis * price) / 100;
      } else {
        result = dis;
      }
      if (maxprice === 0) {
        return result;
      } else if (maxprice > 0 && result > maxprice) return maxprice;
    };
    if (coupon) {
      let dis;
      if (coupon.type === "freeship") {
        dis = discountCheck(coupon?.discount, coupon?.maxPriceDiscount, shipping);
        setSetshipping((prev) => prev - dis);
      } else if (coupon.type === "freeprice") {
        dis = discountCheck(coupon?.discount, coupon?.maxPriceDiscount, totalPrice);
        setDiscount(dis);
      }
    }
  }, [coupon]);

  // lodgic update totalprice
  useEffect(() => {
    if (carts.length > 0) {
      const price =
        carts.reduce((sum, acc) => {
          return acc.product.priceSale
            ? sum + acc?.quantity * acc.product.priceSale
            : sum + acc?.quantity * acc.product.price;
        }, 0) +
        shipping -
        discount;

      settotalPrice(price);
    }
  }, [carts, coupon, discount, shipping]);

  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiUser.getCart();
      if (rs.sucess) {
        setcid(rs?.data?._id);
        setCarts(rs?.data?.list);
      } else {
        toastMsg(rs.msg, "error");
      }
      setLoading(false);
    };
    fetchApi();
  }, []);

  const handleCoupon = async () => {
    setOpenCoupon(true);
    const rs = await apiCoupon.getAll();
    if (rs.sucess) {
      setCoupons(rs.data);
    } else {
      toastMsg(rs.msg, "error");
    }
  };

  const handleSetCoupon = (coupon) => {
    if (coupon.type === "freeprice" && totalPrice < coupon.minPrice) {
      toastMsg("Bạn không đủ diều kiện", "warning");
    } else {
      setCoupon(coupon);
      setOpenCoupon(false);
      setSetshipping(defaultShip);
      settotalPrice(
        carts.reduce((sum, acc) => {
          return acc.product.priceSale
            ? sum + acc?.quantity * acc.product.priceSale
            : sum + acc?.quantity * acc.product.price;
        }, 0),
      );
      setDiscount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    if (!address && !address.length > 0) {
      toastMsg("Đia chỉ không được để trống", "warning");
      return;
    }
    if (!carts.length > 0 || !cid || !totalPrice) {
      toastMsg("Vui lòng chọn thông tin", "warning");
      return;
    } else {
      const rs = await apiUser.createOder({ couponId: coupon?._id, cid, totalPrice, address });
      if (rs?.sucess) {
        toastMsg("Đặt hàng thành công", "success");
      } else {
        toastMsg("Đặt hàng thất bại ", "error");
      }
      navigate(`/${path.USER}/${path.CART}`);
    }
  };
  if (!active) {
    // console.log(active)
    return <Navigate to={`/${path.HOME}`} replace />;
  }

  return (
    <div className="min-h-screen w-full bg-white ">
      <h2 className="text-xl text-third font-normal py-2 px-5">
        <Link to={`/${path.HOME}`}>Digital World 2</Link>
      </h2>
      <div className="flex m-auto md:flex-row-reverse flex-col items-start w-full h-full overflow-y-auto lg:p-10 md:p-8 p-5 gap-5">
        <div className="md:flex-1 w-full overflow-hidden max-md:border-b-1 max-md:border-gray-300">
          <button
            className="md:hidden flex  items-center gap-2 text-blue-400"
            onClick={() => setOpenListPD(!openListPD)}
          >
            <HiShoppingCart size={20} />
            <span className="text-sm">{`${!openListPD ? "Hide " : "Show"} order sumary`}</span>
          </button>
          <div className={`space-y-5 duration-300 mt-5 ${!openListPD ? "h-auto" : "h-0"}`}>
            {carts.length > 0 &&
              carts.map((cart) => {
                return (
                  <div className="flex items-center " key={cart?._id}>
                    <div className="flex flex-1 items-center gap-2">
                      <figure className="relative w-[64px] h-[64px] border border-gray-300 rounded-md">
                        <img src={cart?.product?.thumb?.url} alt={cart.product?.title} />
                        <span className="text-xs text-white bg-gray-500 rounded-full py-0.5 px-2 absolute top-0 -right-2">
                          {cart?.quantity}
                        </span>
                      </figure>
                      <div className="">
                        <h4 className="text-sm text-gray-500 text-center">{cart?.product.title}</h4>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400">{cart.ram?.name} /</span>
                          <span className="text-xs text-gray-400">{cart.color?.name} /</span>{" "}
                          <span className="text-xs text-gray-400">{cart.internal?.name}</span>
                        </div>
                      </div>
                    </div>
                    {cart?.product?.priceSale ? (
                      <span className="text-base text-third">
                        {formatVND(+cart?.product?.priceSale * +cart.quantity)}
                      </span>
                    ) : (
                      <span className="text-base text-third">
                        {formatVND(+cart?.product?.price * +cart.quantity)}
                      </span>
                    )}
                  </div>
                );
              })}
            <div className="flex items-center justify-between">
              <h4 className="text-base text-third">Đơn vị vận chuyển</h4>
              {shipping && (
                <span className="text-base font-medium text-third">{formatVND(shipping)}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-base text-third">Tông tiền</h4>
              {totalPrice && (
                <span className="text-lg font-medium text-third">{formatVND(totalPrice)}</span>
              )}
            </div>
          </div>
        </div>
        <div className="md:flex-1 space-y-5 w-full">
          <div className="space-y-2">
            <h3 className="text-lg text-third">Contact</h3>
            <FormInput
              classNameLabel={"text-sm min-w-[125px]"}
              className="text-sm outline-none border border-gray-300 md:px-5 md:py-2 px-3 py-1 w-full"
              label={"Email"}
              name={"email"}
              value={userInfo?.email}
              readOnly={true}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg text-third">Địa chỉ giao hàng</h3>
            <FormInput
              classNameLabel={"text-sm min-w-[125px]"}
              className="text-sm border border-gray-300 md:px-5 md:py-2 px-3 py-1 outline-none w-full"
              label={"Địa chỉ (bắt buộc)"}
              name={"address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2 flex lg:items-center lg:flex-row flex-col">
            <div className="flex-1">
              <h3 className="text-lg mb-2 text-third">Mã giảm giá</h3>
              <button
                className="outline-none md:w-[120px] md:h-[36px] border border-gray-300 hover:border-blue-300 text-sm px-3 text-third max-sm:w-full"
                onClick={() => handleCoupon()}
              >
                Chọn mã
              </button>
            </div>
            {coupon && Object.keys(coupon).length > 0 && (
              <div
                className={`flex items-center bg-gray-200 border border-gray-200 px-3 py-2 gap-5 cursor-pointer`}
              >
                <figure className={`w-[64] h-[64px] bg-blue-300`}>
                  <img src={coupon?.image?.url} alt={coupon?.name} />
                </figure>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm text-third">{coupon?.name}</h3>
                  {coupon?.expired && (
                    <span className="text-sm text-gray-500">
                      HSD: {formatDate(coupon?.expired)}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg text-third">Phương thức thanh toán</h3>
            <button className="outline-none text-sm md:min-w-[120px] px-3 md:h-[36px] border border-gray-300 hover:border-blue-300 text-third max-sm:w-full">
              Chọn phương thức
            </button>
          </div>
          <button
            className="bg-main md:float-right text-white text-base md:w-[200px] h-[40px] rounded-lg active:bg-red-500 duration-300 max-md:w-full"
            onClick={(e) => handleSubmit(e)}
          >
            Đặt hàng
          </button>
        </div>
      </div>
      {openCoupon && (
        <Modal
          isOpen={openCoupon}
          onRequestClose={() => setOpenCoupon(false)}
          shouldCloseOverlayClick
        >
          <div className="w-full h-screen-75 space-y-5">
            <h3 className="text-base text-third capitalize">Mã miễn phí</h3>
            <span className="text-sm text-third">Có thể chọn 1</span>
            {coupons.length > 0 &&
              coupons.map((coupon) => {
                return (
                  <div
                    className={`${
                      new Date().getTime() <= new Date(coupon.expired).getTime()
                        ? "bg-gray-300"
                        : "bg-red-300"
                    } flex items-center bg-gray-200 border border-gray-200 px-3 py-2 gap-5 cursor-pointer`}
                    key={coupon?._id}
                  >
                    <figure className={`w-[118px] h-[116px] bg-blue-300`}>
                      <img
                        src={coupon?.image?.url}
                        alt={coupon?.name}
                        onClick={(e) => handleSetCoupon(coupon)}
                      />
                    </figure>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base text-third">{coupon?.name}</h3>
                      {coupon?.expired && (
                        <span className="text-sm text-gray-500">
                          HSD: {formatDate(coupon?.expired)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal>
      )}
    </div>
  );
};

Oder.propTypes = {};

export default Oder;
