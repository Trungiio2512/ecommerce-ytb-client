import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet, useSearchParams } from "react-router-dom";
import { TabActive } from "../../components";
import { useState } from "react";
import * as apiUser from "../../apis/user";
import path from "../../until/path";
import ProductOrder from "./components/ProductOrder";
import { formatVND } from "../../until/fn";
const tabs = [
  {
    title: "Chờ xác nhận",
    id: "Processing",
    to: `/${path.USER}/${path.PURCHASE}?type=Processing`,
  },
  { title: "Đang giao", id: "Delivering", to: `/${path.USER}/${path.PURCHASE}` },
  { title: "Hoàn thành", id: "Sucessed", to: `/${path.USER}/${path.PURCHASE}` },
  { title: "Đã huỷ", id: "Cancelled", to: `/${path.USER}/${path.PURCHASE}` },
];
const OrderLayout = (props) => {
  const [type, setType] = useState(tabs[0].id);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiUser.getOders(type);
      if (rs?.data.length > 0) {
        setData(rs?.data);
      } else {
        setData([]);
      }
    };
    fetchApi();
  }, [type]);

  useEffect(() => {
    searchParams.set("type", type);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, type]);
  return (
    <div className="space-y-5">
      <TabActive data={tabs} value={type} setValue={setType} />
      <div className="space-y-5">
        {data.length > 0 ? (
          data.map((order) => {
            // const products = order.products.map((product) => (
            //   <div className="flex items-center justify-between" key={product?._id}>
            //     <div className="flex items-center">
            //       <figure className="w-[80xp] h-[80px]">
            //         <img
            //           src={
            //             product?.thumb?.url ||
            //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTqcQNiYdz_AaJdYoF2r0eQe7nfb7DGaFgo8PMHpf&s"
            //           }
            //           alt={product?.title}
            //         />
            //       </figure>
            //       <div className="flex flex-col gap-2">
            //         <h3 className="text-lg max-sm:text-sm">{product}</h3>
            //       </div>
            //     </div>
            //   </div>
            // ));
            return (
              <div className="px-5 py-2 bg-blue-100 space-y-5" key={order?._id}>
                {order.products.length > 0 &&
                  order.products.map((ele) => (
                    <div className="flex items-center justify-between " key={ele?._id}>
                      <div className="flex items-start">
                        <figure className="w-[80xp] h-[80px]">
                          <img
                            src={
                              ele.product?.thumb?.url ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTqcQNiYdz_AaJdYoF2r0eQe7nfb7DGaFgo8PMHpf&s"
                            }
                            alt={ele.product?.title}
                          />
                        </figure>
                        <div className="flex flex-col gap-1 ml-4">
                          <h3 className="text-base max-sm:text-sm">{ele?.product?.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Phân loại:</span>
                            <span>{ele?.color.name}</span>
                            <span>{ele?.ram.name}</span>
                            <span>{ele?.internal.name}</span>
                          </div>
                          <span className="text-sm text-gray-700">Số lượng: {ele?.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="flex items-center gap-2 w-full justify-between">
                  {searchParams.get("type") === "Processing" && (
                    <button className="outline-none px-5 py-1 text-sm hover:border-red-300 duration-200 border border-gray-300 rounded-sm bg-white">
                      Huỷ đơn hàng
                    </button>
                  )}
                  {searchParams.get("type") === "Sucessed" && (
                    <button className="outline-none px-5 py-1 text-sm  duration-200 rounded-sm bg-main text-white">
                      Xác nhận đơn hàng
                    </button>
                  )}
                  <div className="space-x-2">
                    <span className="text-sm">Thành tiền : </span>
                    <span className="text-base text-main">{formatVND(order.totalPrice)}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex">
            <div className="m-auto flex flex-col items-center gap-2">
              <figure className="w-[100px] h-[100px]">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png"
                  alt=""
                  className="w-full h-full"
                />
              </figure>
              <span className="text-sm">Bạn chưa có sản phẩm nào</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

OrderLayout.propTypes = {};

export default OrderLayout;
