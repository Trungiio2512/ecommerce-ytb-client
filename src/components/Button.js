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
      className={`${circle ? "rounded-[50%] p-3 border border-gray-400 text-sm" : ""} ${className}`}
      onClick={onHanldeClick}
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
