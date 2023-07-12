import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const TabActive = ({ data, value, setValue, to = false }) => {
  let Comp = "li";
  if (to) {
    Comp = NavLink;
    Comp.path = to;
  }
  const className = `capitalize font-medium cursor-pointer inline text-base cursor-pointer py-2 px-3`;
  return (
    <div className="border-b-2 border-red-500">
      <ul className="divide-x sm:flex items-center gap-2 hidden">
        {data.map((tab) => {
          return (
            <Comp
              key={tab.id}
              className={
                to
                  ? ({ isActive }) => {
                      return `${isActive ? "text-main" : "text-gray-400"} ${className}}`;
                    }
                  : `${value === tab.id ? "text-black" : "text-gray-400"} ${className}`
              }
              onClick={() => setValue(tab.id)}
            >
              {" "}
              {tab.title}
            </Comp>
          );
        })}
      </ul>
      <div className="sm:hidden block ">
        <select
          className=" text-xl  uppercase outline-none font-medium "
          onChange={(e) => setValue(+e.target.value)}
        >
          {data.map((tab) => {
            return (
              <option key={tab.id} className="text-base font-normal">
                {tab.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

TabActive.propTypes = {};

export default TabActive;
