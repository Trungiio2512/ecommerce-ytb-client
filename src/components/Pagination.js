import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";

const Pagination = ({
  current,
  onChange,
  pageSize,
  defaultPageSize = 10,
  hideOnSinglePage = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPage = Math.ceil(pageSize / defaultPageSize);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState([]);
  useEffect(() => {
    const page = [];
    const pageStart = current > 3 ? current - 3 : 1;
    const pageEnd = totalPage - current > 3 ? current + 3 : totalPage;
    for (let i = pageStart; i <= pageEnd; i++) {
      page.push(i);
    }
    setPages(page);
  }, [current, pageSize]);

  const handleNextPage = (page) => {
    if (page >= totalPage) {
      return;
    }
    onChange(page + 1);
  };
  const handleBackPage = (page) => {
    // console.log(page);
    if (page <= 1) {
      return;
    }
    onChange(page - 1);
  };
  useEffect(() => {
    const params = [];
    searchParams.append("page", current);
    for (let i of searchParams.entries()) {
      params.push(i);
    }
    let finalSearchParams = {};
    // [['p1', '1], ['p2', '2], ['m', '0], ['m', '1']] => {p1: '1', p2: '2', m:[0,1]}
    params?.map((param) => {
      if (Object.keys(finalSearchParams).some((key) => key === param[0] && key !== "page")) {
        finalSearchParams[param[0]] = [...finalSearchParams[param[0]], param[1]];
      } else {
        finalSearchParams = { ...finalSearchParams, [param[0]]: [param[1]] };
      }
    });

    if (totalPage >= 1) {
      // setSearchParams({ page: current });
      navigate(
        {
          pathname: location.pathname,
          search: createSearchParams({
            ...finalSearchParams,
            // page: current,
          }).toString(),
        },
        { state: location.state, replace: true },
      );
    }
  }, [current, totalPage]);
  return (
    <div className="flex mt-5 bg-white rounded-lg font-[Poppins]">
      {current > 3 && (
        <Button
          onHanldeClick={() => handleBackPage(+current)}
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
          onHanldeClick={() => handleNextPage(current)}
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

export default memo(Pagination);
