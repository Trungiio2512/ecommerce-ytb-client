import React, { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Link,
  NavLink,
  createSearchParams,
  useLocation,
  useMatches,
  useNavigate,
  useParams,
} from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { menuHome } from "../until/menu";
import { useDebounce } from "../until/hook";
import * as apiProduct from "../apis/product";
import Button from "./Button";
import icons from "../until/icon";
import ProductT2 from "./ProductT2";
import path from "../until/path";
const { AiOutlineMenu, AiOutlineClose, AiOutlineLoading3Quarters } = icons;

const Navigation = ({ open, handleOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(first)
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const inputRef = useRef();
  const debounced = useDebounce(value, 1200);
  useEffect(() => {
    if (!debounced.trim()) {
      setProducts([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const rs = await apiProduct.getAll({ title: debounced, fields: "title thumb slug" });
      if (rs?.sucess) {
        setProducts(rs?.data);
        setLoading(false);
      }
    };
    fetchApi();
  }, [debounced]);
  // console.log(products);
  // console.log(showResult);
  useEffect(() => {
    setValue("");
    setProducts([]);
  }, [location.pathname]);
  return (
    <div className="main-width py-2 h-[48px] mx-auto mb-5 border-y border-gray-300  md:items-center md:justify-between hidden md:flex">
      <nav className="bg-white items-center gap-8 w-full h-full hidden lg:flex">
        {menuHome.map((menu) => {
          return (
            <NavLink
              key={menu.id}
              to={menu.path}
              className="uppercase h-full flex text-sm  text-second hover:text-main"
            >
              <span className="m-auto">{menu.title}</span>
            </NavLink>
          );
        })}
      </nav>
      <button className="hidden md:block lg:hidden text-2xl" onClick={() => handleOpen(!open)}>
        <span>
          <AiOutlineMenu />
        </span>
      </button>
      <div>
        <Tippy
          placement="bottom-end"
          delay={[200, 300]}
          // animateFill
          interactive
          visible={showResult && products.length > 0}
          render={(attrs) => (
            <div
              className="w-[330px] bg-white border border-gray-300 rounded-md h-screen-50 overflow-hidden overflow-y-auto"
              tabIndex="-1"
              {...attrs}
            >
              <div className="space-y-1 px-2 py-5 ">
                {products.map((product) => {
                  return <ProductT2 key={product?._id} product={product} />;
                })}
              </div>
            </div>
          )}
        >
          <div className="relative text-sm text-third">
            <input
              ref={inputRef}
              className="w-[250px] outline-none py-2 pl-3 pr-5 bg-gray-200"
              placeholder="Search something"
              onChange={(e) => {
                if (e.target.value.startsWith(" ")) {
                  return;
                }
                setValue(e.target.value.trim());
              }}
              onKeyDown={(e) => {
                if (value.trim().length <= 0) {
                  return;
                }
                if (e.keyCode === 13 && e.key === "Enter") {
                  navigate(
                    {
                      pathname: `${path.SEACH}`,
                      search: `${createSearchParams({ title: value })}`,
                    },
                    { replace: true },
                  );
                }
              }}
              value={value}
              onFocus={() => setShowResult(true)}
              // onMouseLeave={() => setShowResult(false)}
            />
            {!!value && !loading && (
              <Button
                className={
                  "absolute top-[50%] right-2 -translate-y-[50%] w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center"
                }
                onHanldeClick={() => {
                  setValue("");
                  setProducts([]);
                  inputRef.current.focus();
                }}
              >
                <AiOutlineClose />
              </Button>
            )}
            {loading && (
              <Button
                className={
                  "absolute top-[25%] right-2  w-5 h-5 z bg-none flex items-center justify-center animate-rotate-center"
                }
              >
                <AiOutlineLoading3Quarters />
              </Button>
            )}
          </div>
        </Tippy>
      </div>
    </div>
  );
};

Navigation.propTypes = {};

export default memo(Navigation);
