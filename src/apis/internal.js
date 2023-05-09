import axiosConfig from "../configs/axios";

export const get = async () =>
  axiosConfig({
    method: "GET",
    url: "internal",
  });
