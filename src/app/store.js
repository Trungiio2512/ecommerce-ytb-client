import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import app from "./slices/app";
import user from "./slices/user";

const persistConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistConfig, user);

export const store = configureStore({
  reducer: {
    app,
    user: persistedReducer,
  },
  // devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);
// export const store = configureStore({
//   reducer: {
//     app,
//     user,
//   },
// });
