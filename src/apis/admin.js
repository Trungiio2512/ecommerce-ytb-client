import axios from "axios";
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
export const uploadImage = (data) =>
  axios(
    {
      method: "POST",
      url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      data,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
