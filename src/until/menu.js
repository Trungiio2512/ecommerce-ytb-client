import path from "./path";
import icons from "./icon";
const { AiOutlineUser, BsClipboardHeart, FaClipboardList, AiOutlineOrderedList, ImHome } = icons;
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
  {
    id: 6,
    title: "about us",
    path: `/${path.ABOUT_US}`,
  },
];
export const menuUser = [
  { id: 0, title: "User Profile", path: `${path.USER}/${path.PROFILES}`, icon: <AiOutlineUser /> },
  {
    id: 1,
    title: "My shopping cart",
    path: `${path.USER}/${path.CART}`,
    icon: <FaClipboardList />,
  },
  { id: 2, title: "Wish list", path: `${path.USER}/${path.WISH_LIST}`, icon: <BsClipboardHeart /> },
  {
    id: 3,
    title: "Purchase order",
    path: `${path.USER}/${path.WISH_LIST}`,
    icon: <AiOutlineOrderedList />,
  },
];

export const menuAdmin = [
  {
    id: 5,
    title: "Home",
    path: `/${path.HOME}`,
    icon: <ImHome />,
  },
  {
    id: 0,
    title: "ManaBanner",
    path: `/${path.ADMIN}/${path.MANAGER_BANNER}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 1,
    title: "ManaBrand",
    path: `/${path.ADMIN}/${path.MANAGER_BRAND}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 2,
    title: "ManaCategory",
    path: `/${path.ADMIN}/${path.MANAGER_CATEGORY}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 3,
    title: "ManaUser",
    path: `/${path.ADMIN}/${path.MANAGER_USER}`,
    icon: <AiOutlineUser />,
  },
  {
    id: 4,
    title: "ManaProduct",
    path: `/${path.ADMIN}/${path.MANAGER_PRODUCT}`,
    icon: <AiOutlineUser />,
  },
];
