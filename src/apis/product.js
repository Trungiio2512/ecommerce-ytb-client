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

export const deleteProduct = (pid) =>
  axiosConfig({
    method: "DELETE",
    url: `product/delete/${pid}`,
  });
export const ratings = (pid) =>
  axiosConfig({
    method: "GET",
    url: `product/ratings/${pid}`,
  });
export const comment = (pid, data) =>
  axiosConfig({
    method: "POST",
    url: `product/comment/${pid}`,

    data,
  });
