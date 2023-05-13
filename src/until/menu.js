import path from "./path";
import icons from "./icon";
const { AiOutlineUser, BsClipboardHeart, FaClipboardList } = icons;
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
];
