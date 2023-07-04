import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/app";

const appSlice = createSlice({
  initialState: {
    categories: [],
    banners: [],
    newProducts: [],
    colors: [],
    rams: [],
    internals: [],
    isLoading: true,
    brands: [],
  },
  name: "app",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.get.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.get.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload?.newProducts;
      state.categories = action.payload?.categories;
      state.banners = action.payload?.banners;
      state.rams = action.payload?.rams;
      state.colors = action.payload?.colors;
      state.internals = action.payload?.internals;
      state.brands = action.payload?.brands;
    });
    builder.addCase(actions.get.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default appSlice.reducer;
