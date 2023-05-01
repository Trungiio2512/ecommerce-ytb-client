import { Route, Routes } from "react-router-dom";
import {
  AS,
  Blog,
  FAQ,
  Home,
  Login,
  Product,
  ProductDetail,
  Public,
  Services,
} from "./pages/public";
import path from "./until/path";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./app/actions/app";
function App() {
  // const { isLoading, categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllCategories());
    dispatch(actions.getBanner());
    dispatch(actions.getNewProducts());
  }, []);

  // console.log(isLoading);
  return (
    <div className="font-main h-screen">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.PRODUCTS} element={<Product />}></Route>
          <Route
            path={path.DETAIL_PRODUCT_CATEGORY_BRAND_TITLE}
            element={<ProductDetail />}
          ></Route>
          <Route path={path.FAQS} element={<FAQ />}></Route>
          <Route path={path.OUR_SERVICES} element={<Services />}></Route>
          <Route path={path.BLOGS} element={<Blog />}></Route>
          <Route path={path.ABOUT_US} element={<AS />}></Route>
        </Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
