import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as apiBlog from "../../apis/blog";
import { Link } from "react-router-dom";
import path from "../../until/path";

const Blog = (props) => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const rs = await apiBlog.get();

      console.log(rs);
      if (rs.sucess) {
        setblogs(rs.data);
      }
    };
    fetchApi();
  }, []);
  return (
    <div className="w-full p-5">
      <div className="md:w-3/12 max-md:hidden"></div>
      <div className="md:w-9/12 w-full">
        {blogs.length > 0 &&
          blogs.map((blog) => {
            return (
              <div
                key={blog?._id}
                className="flex max-xs:flex-col flex-row items-start p-3 border border-gray-300 rounded-sm gap-2 mb-5"
              >
                <Link to={`/${path.BLOGS}/${blog?._id}`} className="xs:w-6/12 max-xs:w-full">
                  <figure className="w-full h-full">
                    <img src={blog?.image?.url} alt={blog?.title} />
                  </figure>
                </Link>
                <div className="xs:w-6/12 pl-4 max-xs:w-full flex flex-col gap-4">
                  <Link to={`/${path.BLOGS}/${blog?._id}`} className="text-base font-semibold text-third">
                    {blog?.title}
                  </Link>
                  <span className="text-sm text-gray-400">
                    {blog?.author} {new Date(blog?.createdAt).toDateString()}
                  </span>
                  <p className="text-sm text-gray-600 line-clamp-6">{blog?.subdes}</p>
                  <Link
                    to={`/${path.BLOGS}/${blog?._id}`}
                    className="border border-gray-300 hover:border-red-300 text-sm text-center rounded-md px-5 py-1 max-w-[200px] w-full"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

Blog.propTypes = {};

export default Blog;
