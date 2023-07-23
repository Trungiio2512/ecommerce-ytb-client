import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import * as apiBlog from "../../apis/blog";
import icons from "../../until/icon";
const { FaFacebookF, FaInstagramSquare, AiOutlineTwitter } = icons;

const shares = [
  { title: "facebook", icon: <FaFacebookF /> },
  { title: "instagram", icon: <FaInstagramSquare /> },
  { title: "twitter", icon: <AiOutlineTwitter /> },
];

const BlogDetail = (props) => {
  const params = useParams();
  const { bid } = params;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      const rs = await apiBlog.getOne(bid);
      if (rs.sucess) {
        setBlog(rs.data);
        console.log(rs);
        setLoading(false);
      }
    };
    fetchApi();
  }, [bid]);
  return (
    !loading && (
      <div className="space-y-5">
        <h2 className="text-lg text-third font-semibold">{blog?.title}</h2>
        <div className="flex items-center gap-2 text-base text-gray-400">
          <span className="uppercase">{`by ${blog?.author}`}</span>
          <span>{`${new Date(blog?.createdAt).toLocaleDateString("vi-VN")}`}</span>
        </div>
        <figure className="w-full h-full">
          <img src={blog?.image?.url} alt={blog?.title} />
        </figure>
        <p className="text-sm text-gray-500">{blog?.description}</p>
        <div className="flex items-center gap-5">
          {shares.map((ele) => {
            return (
              <button
                key={ele?.title}
                className="px-4 py-1 border border-gray-300 text-sm hover:border-red-300 flex items-center gap-2"
              >
                {ele?.icon}
                <span>{ele?.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    )
  );
};

BlogDetail.propTypes = {};

export default BlogDetail;
