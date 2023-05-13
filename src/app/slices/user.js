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
  },
  name: "user",
  reducers: {
    setUserMsg: (state, action) => {
      // console.log(action);
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actions.login.fulfilled, (state, action) => {
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
  },
});
export const { setUserMsg } = userSlice.actions;

export default userSlice.reducer;
