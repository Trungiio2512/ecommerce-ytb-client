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
