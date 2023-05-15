import axiosConfig from "../configs/axios";

export const login = async (payload) =>
  axiosConfig({
    url: "user/login",
    method: "POST",
    data: payload,
    withCredentials: true,
  });
export const register = async (payload) =>
  axiosConfig({
    url: "user/register",
    method: "POST",
    data: payload,
    withCredentials: true,
  });
export const forgotPass = async (payload) =>
  axiosConfig({
    url: "user/forgot_pass",
    method: "POST",
    data: payload,
  });
export const resetPass = async (payload, data) =>
  axiosConfig({
    url: "user/reset_pass",
    method: "POST",
    params: payload,
    data,
  });
export const getWishList = async () =>
  axiosConfig({
    url: "user/get_wishlist",
    method: "Get",
  });
