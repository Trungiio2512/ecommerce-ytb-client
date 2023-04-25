import icons from "./icon";
const { BsStarFill, BsStarHalf } = icons;
export function formatVND(string) {
  return string.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
export function getStars(rating) {
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--) output.push(<BsStarFill key={i} className="text-yellow-500" />);

  // If there is a half a star, append it
  if (i === 0.5) output.push(<BsStarHalf className="text-gray-400" key={i} />);

  // Fill the empty stars
  for (let i = 5 - rating; i >= 1; i--) output.push(<BsStarFill className="text-gray-400" />);
  // console.log(output);
  return output;
}
