import axiosConfig from "../configs/axios";

export const get = () =>
  axiosConfig({
    method: "GET",
    url: "brand",
  });

export const create = (data) =>
  axiosConfig({
    method: "POST",
    url: "brand/create",
    data,
  });
