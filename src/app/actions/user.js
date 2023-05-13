import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../apis/user";

export const login = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
  const rs = await api.login(data);
  // console.log(rs);
  return rs;
});
