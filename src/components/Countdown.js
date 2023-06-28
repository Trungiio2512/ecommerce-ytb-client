import React from "react";
import PropTypes from "prop-types";

const Countdown = ({ unit, number }) => {
  return (
    <div className="flex flex-1 flex-col px-2 py-1">
      <span className="text-third text-lge font-semibold text-center">{number}</span>
      <span className="capitalize text-xs  text-gray-500 text-center">{unit}</span>
    </div>
  );
};

Countdown.propTypes = {
  unit: PropTypes.string,
  number: PropTypes.number,
};

export default Countdown;
