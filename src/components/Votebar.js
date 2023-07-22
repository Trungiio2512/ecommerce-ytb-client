import React, { useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import icons from "../until/icon";
const { BsStarFill } = icons;
const Votebar = ({ number, ratingCount = 0, ratingTotal }) => {
  const percentRef = useRef();
  useEffect(() => {
    percentRef.current.style.cssText = `right: ${100 - Math.round(ratingCount / ratingTotal) * 100} %`;
  }, [ratingCount, ratingTotal]);
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 w-full">
      <div className="flex items-center gap-2 px-2">
        <span className="w-2">{number}</span>
        <BsStarFill size={14} className="text-yellow-400" />
      </div>
      <div className="flex-1 h-[6px] rounded-md relative w-full bg-gray-200">
        <div ref={percentRef} className="absolute inset-0 bg-main"></div>
      </div>
      <div className="px-2">{`${ratingCount} nhận xét`}</div>
    </div>
  );
};

Votebar.propTypes = {};

export default Votebar;
