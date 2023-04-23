import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/app";

const appSlice = createSlice({
  initialState: {
    categories: [],
    banners: [],
    isLoading: true,
  },
  name: "app",
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
