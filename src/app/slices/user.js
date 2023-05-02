import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/app";

const userSlice = createSlice({
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
  },
  name: "user",
  reducers: {
    setUser: (state, action) => {
      // console.log(action);
      state.isLoggedIn = true;
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
  },
});
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
