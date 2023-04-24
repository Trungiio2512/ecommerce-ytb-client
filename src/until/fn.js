export function formatVND(string) {
  return string.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
export function getStars(rating, iconStar, halfIconStar) {
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--) output.push(iconStar);

  // If there is a half a star, append it
  if (i === 0.5) output.push(halfIconStar);

  // Fill the empty stars
  for (let i = 5 - rating; i >= 1; i--) output.push(iconStar);
  // console.log(output);
  return output;
}
