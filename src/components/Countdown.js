import React from "react";
import PropTypes from "prop-types";

const Countdown = ({ unit, number, loading = false }) => {
  return loading ? (
    <div className="w-full animate-pulse">
      <div className="h-4 bg-gray-300 "></div>
      <div className="h-4 bg-gray-300 "></div>
    </div>
  ) : (
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
