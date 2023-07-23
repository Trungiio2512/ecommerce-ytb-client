import { Route, Routes } from "react-router-dom";
import {
  AS,
  Blog,
  BlogDetail,
  Contact,
  FAQ,
  ForgotPass,
  ForgotPassword,
  Home,
  Login,
  Product,
  ProductDetail,
  Public,
  Register,
  Services,
  VerifyEmail,
} from "./pages/public";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import path from "./until/path";
import * as actions from "./app/actions/app";
import * as actionsUser from "./app/actions/user";
import { Cart, Oder, Profile, ProtectedRouter, PurchaseOrder, UserLayout, WishList } from "./pages/private";
import { Layout } from "./pages/Layout";
import {
  Admin,
  AdminLayout,
  ManagerBanner,
  ManagerBrand,
  ManagerProduct,
  ManagerUser,
  ManagerCategory,
  CreateProduct,
  ManagerOrder,
} from "./pages/admin";
function App() {
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.get());

    if (isLoggedIn) {
      // setTimeout(() => {
      dispatch(actionsUser.getWishListCart());
      // }, 1000);
    }
  }, [dispatch, isLoggedIn]);
  return (
    <div className="font-main h-full min-h-screen overflow-hidden">
      <Routes>
        <Route path={path.PUBLIC} element={<Layout />}>
          <Route element={<Public />}>
            <Route path={path.HOME} element={<Home />}></Route>
            <Route path={path.SEACH} element={<Product />}></Route>
            {/* <Route path={path.SEACH_TITLE} element={<Product />}></Route> */}
            <Route path={path.PRODUCTS_CATEGORY} element={<Product />}></Route>
            <Route path={path.PRODUCTS_CATEGORY_BRAND} element={<Product />}></Route>
            <Route path={path.DETAIL_PRODUCT_CATEGORY_BRAND_TITLE} element={<ProductDetail />}></Route>
            <Route path={path.FAQS} element={<FAQ />}></Route>
            {/* <Route path={path.OUR_SERVICES} element={<Services />}></Route> */}
            <Route path={path.BLOGS} element={<Blog />}></Route>
            <Route path={path.BLOGS_DETAIL} element={<BlogDetail />}></Route>
            <Route path={path.ABOUT_US} element={<AS />}></Route>
            <Route path={path.CONTACT} element={<Contact />}></Route>
          </Route>
          <Route
            element={
              <ProtectedRouter
                isAllowed={userInfo?.role?.includes("user") || userInfo?.role?.includes("admin")}
                redirectPath={path.PUBLIC}
              />
            }
          >
            <Route path={path.USER} element={<UserLayout />}>
              <Route path={path.CART} element={<Cart />} />
              <Route path={path.WISH_LIST} element={<WishList />} />
              <Route path={path.PROFILES} element={<Profile />} />
              <Route path={path.PURCHASE} element={<PurchaseOrder />} />
            </Route>
          </Route>
        </Route>
        <Route path={path.FORGOT_PASS} element={<ForgotPassword />} />
        <Route path={path.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route
          element={
            <ProtectedRouter
              isAllowed={userInfo?.role?.includes("user") || userInfo?.role?.includes("admin")}
              redirectPath={path.PUBLIC}
            />
          }
        >
          <Route path={path.ODER} element={<Oder />} />
        </Route>
        <Route element={<ProtectedRouter isAllowed={userInfo?.role?.includes("admin")} redirectPath={path.PUBLIC} />}>
          <Route path={path.ADMIN} element={<AdminLayout />}>
            {/* <Route index element={<Admin />} /> */}
            <Route path={path.MANAGER_USER} element={<ManagerUser />} />
            <Route path={path.MANAGER_PRODUCT} element={<ManagerProduct />} />
            {/* <Route path={path.MANAGER_BANNER} element={<ManagerBanner />} /> */}
            <Route path={path.MANAGER_CATEGORY} element={<ManagerCategory />} />
            <Route path={path.MANAGER_BRAND} element={<ManagerBrand />} />
            <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
            <Route path={path.MANAGER_ORDER} element={<ManagerOrder />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
