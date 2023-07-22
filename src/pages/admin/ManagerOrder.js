import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as apiAdmin from "../../apis/admin";
import { useDebounce } from "../../until/hook";
import { toastMsg } from "../../until/toast";
import { formatVND } from "../../until/fn";
import { Pagination, Selector } from "../../components";
const statusOrder = [
  { _id: 1, name: "Processing" },
  { _id: 2, name: "Cancelled" },
  { _id: 3, name: "Delivering" },
  { _id: 4, name: "Sucessed" },
];
const ManagerOrder = (props) => {
  const [title, setTitle] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [status, setstatus] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, settotal] = useState(0);
  const [reload, setReload] = useState(false);
  const debounce = useDebounce(status?.name, 1000);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiAdmin.getOrders({ status: debounce, page });
      if (rs?.sucess) {
        setData(rs.data);
        settotal(rs.count);
      } else {
        toastMsg("Lỗi từ sever", "error");
      }
    };
    fetchApi();
  }, [debounce, page, reload]);

  const handleUpdateStatus = async (oid, status) => {
    let response;
    if (status === "Processing") {
      response = await apiAdmin.updateOrder(oid, { status: "Delivering" });
    }
    if (status === "Delivering") {
      response = await apiAdmin.updateOrder(oid, { status: "Sucessed" });
      console.log(response);
    }
    if (response?.sucess) {
      toastMsg("Thay đổi thành công", "success");
    } else {
      toastMsg("Thay đổi thất bại", "error");
    }
    setReload(!reload);
  };
  return (
    <div className="p-5 max-sm:p-2 ">
      <h2 className="text-lg capitalize mb-5">Danh sách đơn hàng</h2>
      <Selector data={statusOrder} value={status} setValue={setstatus} />
      {data?.length > 0 ? (
        <div className="grid-layout">
          <div className="row">
            {data.map((order) => {
              return (
                <div className="col l-4 s-6 c-12 mb-5" key={order?._id}>
                  <div className="flex flex-col gap-2 bg-blue-100 rounded-lg p-2 relative">
                    {order.products.length > 0 &&
                      order.products.map((ele) => (
                        <div
                          className="flex flex-row md:flex-col max-xs:flex-col gap-2 items-start"
                          key={ele?._id}
                        >
                          <span className="absolute -top-2 -right-2 text-sm text-third px-3 py-1 bg-green-300 rounded-lg max-xs: text-xs ">
                            {order?.status === "Processing"
                              ? "Xác nhận đơn hàng"
                              : order?.status === "Delivering"
                              ? "Đang vận chuyển"
                              : order?.status === "Sucessed"
                              ? "Giao thành công"
                              : order?.status === "Cancelled" && "Đơn hàng bị huỷ"}
                          </span>
                          <figure className="w-[80xp] h-[80px] shrink-0">
                            <img
                              src={
                                ele.product?.thumb?.url ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTqcQNiYdz_AaJdYoF2r0eQe7nfb7DGaFgo8PMHpf&s"
                              }
                              alt={ele.product?.title}
                            />
                          </figure>
                          <div className="flex flex-col gap-1 ">
                            <h3 className="text-lg font-medium max-sm:text-sm">
                              {ele?.product?.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>Phân loại:</span>
                              <span>{ele?.color.name}</span>
                              <span>{ele?.ram.name}</span>
                              <span>{ele?.internal.name}</span>
                            </div>
                            <span className="text-sm text-gray-700">Số lượng: {ele?.quantity}</span>
                          </div>
                        </div>
                      ))}

                    <div className="flex flex-col gap-2 text-sm">
                      <span className="text-gray-700">
                        Người đặt: {order?.orderBy?.firstName} {order?.orderBy?.lastName}
                      </span>
                      <span className="text-gray-700">Số điện thoại: {order?.orderBy?.mobile}</span>
                    </div>
                    <div className="space-x-2">
                      <span className="text-sm">Thành tiền : </span>
                      <span className="text-base text-main">{formatVND(order.totalPrice)}</span>
                    </div>
                    {order.status === "Processing" && (
                      <button
                        className="outline-none px-5 py-1 text-sm  duration-200 rounded-sm lg:w-[200px] bg-main text-white"
                        onClick={() => handleUpdateStatus(order?._id, order.status)}
                      >
                        Xác nhận đơn hàng
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <span>Bạn chưa có đơn hàng nào</span>
      )}
      <Pagination current={page} pageSize={total} onChange={setPage} />
    </div>
  );
};

ManagerOrder.propTypes = {};

export default ManagerOrder;
