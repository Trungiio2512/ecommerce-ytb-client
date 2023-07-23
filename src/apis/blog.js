// import axios from "axios";
import axiosConfig from "../configs/axios";

export const get = () =>
  axiosConfig({
    method: "GET",
    url: "blog",
  });

export const getOne = (bid) => {
  return axiosConfig({
    method: "GET",
    url: `blog/one/${bid}`,
  });
};
