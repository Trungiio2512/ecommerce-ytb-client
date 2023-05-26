import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/user";

const userSlice = createSlice({
  initialState: {
    isLoggedIn: false,
    loading: false,
    userInfo: {}, // for user object
    token: null, // for storing the JWT
    error: null,
    msg: "",
    cart: [],
    wishlist: [],
  },
  name: "user",
  reducers: {
    setUserMsg: (state, action) => {
      // console.log(action);
      state.msg = "";
    },
    wishlist: (state, action) => {
      if (state.wishlist?.some((pd) => pd?._id === action.payload?._id)) {
        state.wishlist = state.wishlist.filter((pd) => pd?._id !== action.payload?._id);
      } else {
        state.wishlist = [...state.wishlist, action.payload];
      }
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.userInfo = {}; // for user object
      state.token = null; // for storing the JWT
      state.error = null;
      state.msg = "";
      state.cart = [];
      state.wishlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actions.login.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.isLoggedIn = action.payload?.sucess;
      state.error = !action.payload?.sucess;
      state.userInfo = action.payload?.data;
      state.token = action.payload?.token;
      state.msg = action.payload?.msg;
    });
    builder.addCase(actions.login.rejected, (state, action) => {
      console.log(action);
      // state.
    });
    builder.addCase(actions.getWishList.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actions.getWishList.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
      state.msg = action.payload?.msg;
      state.error = !action.payload?.sucess;
    });
    builder.addCase(actions.getWishList.rejected, (state, action) => {
      console.log(action);
      // state.
    });
  },
});
export const { setUserMsg, wishlist, logout } = userSlice.actions;

export default userSlice.reducer;
