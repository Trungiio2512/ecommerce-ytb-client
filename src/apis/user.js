import axiosConfig from "../configs/axios";

export const login = async (payload) =>
  axiosConfig({
    url: "user/login",
    method: "POST",
    data: payload,
    withCredentials: true,
  });
export const logout = async (payload) =>
  axiosConfig({
    url: "user/logout",
    method: "POST",
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
export const resfreshToken = async (payload, data) =>
  axiosConfig({
    url: "user/refresh_token",
    method: "POST",
    withCredentials: true,
  });

export const getInfo = async (payload, data) =>
  axiosConfig({
    method: "GET",
    url: "user/info",
  });
export const upInfo = async (payload) =>
  axiosConfig({
    method: "Put",
    url: "user/up_info",
    data: payload,
  });
export const getWishList = async () =>
  axiosConfig({
    url: "user/get_wishlist",
    method: "Get",
  });
export const wishlist = async (id) =>
  axiosConfig({
    url: `user/wishlist/${id}`,
    method: "POST",
  });

export const getCart = async () =>
  axiosConfig({
    method: "GET",
    url: `user/get_cart`,
  });
export const addOrCreateCart = async (data) =>
  axiosConfig({
    method: "POST",
    url: `user/add_create_cart`,
    data,
  });

export const updateCart = async (id, data) =>
  axiosConfig({
    method: "PATCH",
    url: `user/update_cart/${id}`,
    data,
  });
export const deleteCart = async (id) =>
  axiosConfig({
    method: "DELETE",
    url: `user/del_cart/${id}`,
  });

export const createOder = async (data) =>
  axiosConfig({
    method: "POST",
    url: "/order/create",
    data,
  });
export const getOders = async (type) =>
  axiosConfig({
    method: "GET",
    url: `order/all/${type}`,
    // data,
  });
