import axiosConfig from "../configs/axios";

export const getAll = (params) =>
  axiosConfig({
    url: "product/all",
    method: "GET",
    params,
  });
