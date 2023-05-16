import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../apis/user";

export const login = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
  const rs = await api.login(data);
  // console.log(rs);
  return rs;
});
export const getWishList = createAsyncThunk(
  "user/getWishList",
  async (data, { rejectWithValue }) => {
    const rs = await api.getWishList();
    return rs?.data?.list;
  },
);
