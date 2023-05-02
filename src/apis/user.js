import axiosConfig from "../configs/axios";

export const login = async (payload) =>
  axiosConfig({
    url: "user/login",
    method: "POST",
    data: payload,
  });
export const register = async (payload) =>
  axiosConfig({
    url: "user/register",
    method: "POST",
    data: payload,
  });
