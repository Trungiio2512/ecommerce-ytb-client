import axiosConfig from "../configs/axios";

export const get = async () =>
  axiosConfig({
    url: "banner",
    method: "GET",
  });
