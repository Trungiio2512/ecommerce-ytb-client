import { toast } from "react-toastify";
export const toastMsg = (msg, type) => {
  return toast[type](msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
