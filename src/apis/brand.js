import axiosConfig from "../configs/axios";

export const get = () =>
  axiosConfig({
    method: "GET",
    url: "brand",
  });
