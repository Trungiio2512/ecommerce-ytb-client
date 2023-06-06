import axiosConfig from "../configs/axios";

export const getAll = () =>
  axiosConfig({
    url: "product_category/",
    method: "GET",
  });
export const create = (data) =>
  axiosConfig({
    method: "POST",
    url: "product_category/create",
    data,
  });

export const deletePc = (pcid) =>
  axiosConfig({
    method: "DELETE",
    url: `product_category/delete/${pcid}`,
  });
