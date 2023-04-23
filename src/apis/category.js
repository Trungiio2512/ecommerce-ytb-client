import axiosConfig from "../configs/axios";

export const getAll = () =>
  axiosConfig({
    url: "product_category/",
    method: "GET",
  });
