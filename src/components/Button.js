import React from "react";
import PropTypes from "prop-types";

const Button = ({
  circle = false,
  square = false,
  onHanldeClick = () => {},
  children,
  className,
}) => {
  return (
    <button
      className={`${
        circle
          ? "rounded-[50%] p-3 border border-gray-400 text-sm text-gray-800 bg-white hover:text-white hover:bg-gray-800"
          : ""
      } ${className}`}
      onClick={(e) => {
        onHanldeClick();
      }}
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
