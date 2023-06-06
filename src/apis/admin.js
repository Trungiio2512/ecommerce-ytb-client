import axiosConfig from "../configs/axios";

export const getAllUser = async (config) =>
  axiosConfig({
    method: "GET",
    url: "user/all",
  });
export const deleteUser = async (id) =>
  axiosConfig({
    method: "DELETE",
    url: `user/del_user/${id}`,
  });
export const upUser = async (id, data) =>
  axiosConfig({
    method: "PATCH",
    url: `user/up_user/${id}`,
    data,
  });
