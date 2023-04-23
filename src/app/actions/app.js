import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apiCategories from "../../apis/category";
import * as apiBanner from "../../apis/banner";

export const getAllCategories = createAsyncThunk(
  "app/getAllCategories",
  async (data, { rejectWithValue }) => {
    const res = await apiCategories.getAll();
    //   console.log(res);
    if (!res?.success) {
      return rejectWithValue(res);
    }
    return res?.data;
  },
);
export const getBanner = createAsyncThunk("app/getBanner", async (data, { rejectWithValue }) => {
  const res = await apiBanner.get();
  //   console.log(res);
  if (!res?.success) {
    return rejectWithValue(res);
  }
  return res?.data;
});
