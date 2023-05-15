import axios from "axios";
const cancelAxios = axios.CancelToken;
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("persist:user"))?.token.slice(
      1,
      JSON.parse(localStorage.getItem("persist:user"))?.token.length - 1,
    );
    // Do something before request is sent
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error.data);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    return error.response.data;
  },
);

export default instance;
