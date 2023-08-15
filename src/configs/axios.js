import axios from "axios";
import * as apiUser from "../apis/user";
import { useDispatch } from "react-redux";
import * as sliceUser from "../app/slices/user";
import { toast } from "react-toastify";
import { toastMsg } from "../until/toast";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error.data);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
      toastMsg(error.message, "error");
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await apiUser.resfreshToken();
      localStorage.setItem("access_token", response.token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.token;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
