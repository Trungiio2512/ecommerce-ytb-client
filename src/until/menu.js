import path from "./path";
import icons from "./icon";
const {
  AiOutlineUser,
  BsClipboardHeart,
  FaClipboardList,
  AiOutlineOrderedList,
  ImHome,
  GrUserAdmin,
  RiAdminLine,
} = icons;
export const menuHome = [
  {
    id: 1,
    title: "home",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    title: "search",
    path: `/${path.SEACH}`,
  },
  {
    id: 3,
    title: "about us",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 4,
    title: "blogs",
    path: `/${path.BLOGS}`,
  },
  {
    id: 5,
    title: "faqs",
    path: `/${path.FAQS}`,
  },
];
export const menuUser = [
  {
    id: 0,
    title: "Thông tin cá nhân",
    path: `/${path.USER}/${path.PROFILES}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 1,
    title: "Danh sách sản phẩm",
    path: `/${path.USER}/${path.CART}`,
    icon: <FaClipboardList />,
  },
  {
    id: 2,
    title: "Danh sách yêu thích",
    path: `/${path.USER}/${path.WISH_LIST}`,
    icon: <BsClipboardHeart />,
  },
  {
    id: 3,
    title: "Đơn hàng đã đặt",
    path: `/${path.USER}/${path.PURCHASE}`,
    icon: <AiOutlineOrderedList />,
  },
];

export const menuAdmin = [
  {
    id: 5,
    title: "Quản trị viên",
    path: `/${path.ADMIN}`,
    icon: <RiAdminLine />,
  },
  // {
  //   id: 0,
  //   title: "ManaBanner",
  //   path: `/${path.ADMIN}/${path.MANAGER_BANNER}`,
  //   icon: <AiOutlineUser />,
  // },
  {
    id: 1,
    title: "Quản lý nhãn hàng",
    path: `/${path.ADMIN}/${path.MANAGER_BRAND}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 2,
    title: "Quản lý danh sách",
    path: `/${path.ADMIN}/${path.MANAGER_CATEGORY}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 6,
    title: "Quản lý đơn hàng",
    path: `/${path.ADMIN}/${path.MANAGER_ORDER}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 3,
    title: "Quản lý người dùng",
    path: `/${path.ADMIN}/${path.MANAGER_USER}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 4,
    title: "Quản lý sản phẩm",
    path: `/${path.ADMIN}/${path.MANAGER_PRODUCT}`,
    icon: <AiOutlineUser />,
  },
];
