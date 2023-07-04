import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/user";
import { toastMsg } from "../../until/toast";

const userSlice = createSlice({
  initialState: {
    isLoggedIn:
      localStorage.getItem("user") !== "undefined" && localStorage.getItem("user") ? true : false,
    loading: false,
    userInfo:
      localStorage.getItem("user") !== "undefined" && localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {}, // for user object
    error: null,
    msg: "",
    cart: 0,
    wishlist: [],
  },
  name: "user",
  reducers: {
    setUserMsg: (state, action) => {
      // console.log(action);
      state.msg = "";
    },
    updatewishlist: (state, action) => {
      if (state.wishlist.some((pd) => pd?._id === action.payload?._id)) {
        state.wishlist = state.wishlist.filter((pd) => pd?._id !== action.payload?._id);
      } else {
        state.wishlist = [...state.wishlist, action.payload];
      }
    },
    refreshToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.userInfo = {}; // for user object
      state.error = null;
      state.msg = "";
      state.cart = [];
      state.wishlist = [];
      localStorage.setItem("user", JSON.stringify({}));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actions.login.fulfilled, (state, action) => {
      const { token, ...user } = action.payload;
      state.loading = false;
      state.isLoggedIn = action.payload?.sucess;
      state.error = !action.payload?.sucess;
      state.userInfo = action.payload?.data;
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user.data));
      state.msg = action.payload?.msg;
    });
    builder.addCase(actions.login.rejected, (state, action) => {
      toastMsg("Has problem with sever", "error");
      // state.
    });
    builder.addCase(actions.getWishListCart.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actions.getWishListCart.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload.wishlist.data?.list || [];
      state.cart = action.payload.cart.data?.list || [];
    });
    builder.addCase(actions.getWishListCart.rejected, (state, action) => {
      toastMsg("Has problem with sever", "error");
      // state.
    });
  },
});
export const { setUserMsg, updatewishlist, logout, refreshToken } = userSlice.actions;

export default userSlice.reducer;
