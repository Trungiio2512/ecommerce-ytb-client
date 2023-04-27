import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/app";

const appSlice = createSlice({
  initialState: {
    categories: [],
    banners: [],
    newProducts: [],
    isLoading: true,
  },
  name: "app",
  reducers: {},
  extraReducers: (builder) => {
    //category
    builder.addCase(actions.getAllCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getAllCategories.fulfilled, (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(actions.getAllCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    //banner
    builder.addCase(actions.getBanner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getBanner.fulfilled, (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.banners = action.payload;
    });
    builder.addCase(actions.getBanner.rejected, (state, action) => {
      state.isLoading = false;
      state.banners = action.payload;
    });
    //new product
    builder.addCase(actions.getNewProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.newProducts = action.payload;
    });
    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });
  },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
