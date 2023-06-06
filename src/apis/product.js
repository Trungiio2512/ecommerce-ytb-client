import axiosConfig from "../configs/axios";
import axios from "axios";

export const getAll = (params) =>
  axiosConfig({
    url: "product/all",
    method: "GET",
    params,
  });
export const getOne = (id) =>
  axiosConfig({
    url: `product/one/${id}`,
    method: "GET",
  });
export const create = (data) =>
  axiosConfig({
    url: "product/create",
    method: "POST",
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
export const deleteProduct = (pid) =>
  axiosConfig({
    method: "DELETE",
    url: `product/delete/${pid}`,
  });
