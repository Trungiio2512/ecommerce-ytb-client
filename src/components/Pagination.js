import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Pagination = ({
  current,
  onChange,
  pageSize,
  defaultPageSize = 10,
  hideOnSinglePage = false,
  onNextPage = () => {},
  onBackPage = () => {},
}) => {
  const totalPage = Math.ceil(pageSize / defaultPageSize);
  //   const pages = [...Array(totalPage + 1).keys()].slice(1);
  const [pages, setPages] = useState([]);
  //   console.log(Array(totalPage + 1));
  //   console.log(pageSize);
  useEffect(() => {
    const page = [];
    const pageStart = current > 3 ? current - 3 : 1;
    const pageEnd = totalPage - current > 3 ? current + 3 : totalPage;
    for (let i = pageStart; i <= pageEnd; i++) {
      page.push(i);
    }
    setPages(page);
  }, [current, pageSize]);
  //   console.log(pages);
  return (
    <div className="flex bg-white rounded-lg font-[Poppins]">
      {current > 3 && (
        <Button
          onHanldeClick={onBackPage}
          className="h-12 border-2 border-r-0 border-indigo-600
               px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </Button>
      )}
      {pages.map((pg, i) => (
        <Button
          key={i}
          //   onClick={() => setCur(pg.page)}
          onHanldeClick={() => onChange(pg)}
          className={`h-12 border-2 border-r-0 border-indigo-600
               w-12 ${current === pg ? "bg-indigo-600 text-white" : ""}`}
        >
          {pg}
        </Button>
      ))}
      {totalPage - current > 3 && (
        <Button
          onHanldeClick={onNextPage}
          className="h-12 border-2  border-indigo-600
               px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </Button>
      )}
    </div>
  );
};

Pagination.propTypes = {};

export default Pagination;
