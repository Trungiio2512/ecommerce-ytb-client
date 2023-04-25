import React from "react";
import PropTypes from "prop-types";

const Button = ({ circle = false, square = false, children }) => {
  return (
    <button
      className={`${
        circle
          ? "rounded-[50%] p-3 border border-gray-300 text-sm text-gray-800 bg-white hover:text-white hover:bg-gray-800"
          : ""
      }`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  circle: PropTypes.bool,
  square: PropTypes.bool,
};

export default Button;
