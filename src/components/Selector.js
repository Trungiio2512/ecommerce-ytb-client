import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = ({ data, value, setValue }) => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div className={`md:hidden w-full font-medium duration-300 ${open ? "h-50" : "h-auto"}`}>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white text-sm w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select value"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul className={`bg-white mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"} `}>
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={value?.name}
            onChange={(e) => setValue(e.target.value.toLowerCase())}
            placeholder="Enter value"
            className="placeholder:text-gray-700 p-2 text-sm outline-none"
          />
        </div>
        {data?.map((ele) => (
          <li
            key={ele?._id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${
              ele?.name?.toLowerCase() === selected?.toLowerCase() ? "bg-sky-600 text-white" : ""
            }`}
            onClick={() => {
              if (ele?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(ele?.name);
                setOpen(false);
                setValue(ele);
              }
            }}
          >
            {ele?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
