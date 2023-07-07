import axiosConfig from "../configs/axios";

export const getAll = async () =>
  await axiosConfig({
    method: "GET",
    url: "/coupon",
  });
