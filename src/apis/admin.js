import axiosConfig from "../configs/axios";

export const getAllUser = async (config) =>
  axiosConfig({
    method: "GET",
    url: "user/all",
  });
