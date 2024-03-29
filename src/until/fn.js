import icons from "./icon";
import axios from "axios";
import * as apiAdmin from "../apis/admin";

const { BsStarFill, BsStarHalf } = icons;
export function formatVND(string) {
  return string.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
export function getStars(rating) {
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--) output.push(<BsStarFill key={Math.random() * i} className="text-yellow-500" />);

  // If there is a half a star, append it
  if (i === 0.5) output.push(<BsStarHalf className="text-gray-400" key={Math.random() * i} />);

  // Fill the empty stars
  for (let i = 5 - rating; i >= 1; i--) output.push(<BsStarFill className="text-gray-400" key={Math.random() * i} />);
  // console.log(output);
  return output;
}

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_KEY);

  const rs = await apiAdmin.uploadImage(formData);
  return {
    filename: rs.data.public_id,
    url: rs.data.url,
  };
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export const formatDate = (date) => {
  const newdate = new Date(date);
  return [padTo2Digits(newdate.getDate()), padTo2Digits(newdate.getMonth() + 1), newdate.getFullYear()].join(".");
};
